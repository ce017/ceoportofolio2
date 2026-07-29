'use client'

import { useEffect, useRef, useState } from 'react'
import {
  DISCORD_USER_ID,
  GITHUB_USER,
  GITHUB_MAX_AGE_MS,
  AGENT_STALE_MS,
  PRESENCE_ENDPOINT,
  SUPABASE_ANON_KEY,
  type Activity,
} from '@/data/presence'

/* ------------------------------------------------------------------ Lanyard */

interface LanyardSpotify {
  song: string
  artist: string
  album_art_url: string | null
  timestamps?: { start?: number; end?: number }
  track_id?: string
}

function spotifyToActivity(s: LanyardSpotify | null): Activity | null {
  if (!s) return null
  // Lanyard sends artists joined by "; " when a track has several.
  const artist = s.artist.split(';')[0].trim()
  return {
    key: 'spotify',
    kind: 'spotify',
    title: 'Listening to Spotify',
    detail: `${s.song} — ${artist}`,
    since: s.timestamps?.start,
    until: s.timestamps?.end,
    imageUrl: s.album_art_url ?? undefined,
    href: s.track_id ? `https://open.spotify.com/track/${s.track_id}` : undefined,
  }
}

function useLanyard(): Activity | null {
  const [spotify, setSpotify] = useState<Activity | null>(null)

  useEffect(() => {
    if (!DISCORD_USER_ID) return

    let ws: WebSocket | null = null
    let heartbeat: ReturnType<typeof setInterval> | null = null
    let retry: ReturnType<typeof setTimeout> | null = null
    let closed = false
    let attempt = 0

    const connect = () => {
      if (closed) return
      ws = new WebSocket('wss://api.lanyard.rest/socket')

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data as string)

        // op 1 = Hello: start heartbeating, then subscribe.
        if (msg.op === 1) {
          attempt = 0
          heartbeat = setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ op: 3 }))
          }, msg.d.heartbeat_interval)
          ws?.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_USER_ID } }))
          return
        }

        // op 0 = INIT_STATE / PRESENCE_UPDATE
        if (msg.op === 0) {
          setSpotify(spotifyToActivity(msg.d?.spotify ?? null))
        }
      }

      const scheduleReconnect = () => {
        if (heartbeat) { clearInterval(heartbeat); heartbeat = null }
        if (closed) return
        // Back off so a Lanyard outage doesn't hammer it from every open tab.
        attempt += 1
        const delay = Math.min(30000, 1000 * 2 ** Math.min(attempt, 5))
        retry = setTimeout(connect, delay)
      }

      ws.onclose = scheduleReconnect
      ws.onerror = () => ws?.close()
    }

    connect()

    return () => {
      closed = true
      if (heartbeat) clearInterval(heartbeat)
      if (retry) clearTimeout(retry)
      ws?.close()
    }
  }, [])

  return spotify
}

/* -------------------------------------------------------------- local agent */

function useAgent(): Activity[] {
  const [items, setItems] = useState<Activity[]>([])

  useEffect(() => {
    let active = true

    const pull = async () => {
      try {
        const res = await fetch(PRESENCE_ENDPOINT, {
          headers: { apikey: SUPABASE_ANON_KEY },
          cache: 'no-store',
        })
        if (!res.ok) return
        const rows = await res.json()
        const row = rows?.[0]
        if (!active || !row) return

        // Drop everything if the PC stopped reporting, rather than showing a
        // Studio session that ended hours ago.
        const age = Date.now() - new Date(row.updated_at).getTime()
        if (age > AGENT_STALE_MS) {
          setItems([])
          return
        }
        setItems(Array.isArray(row.payload) ? row.payload : [])
      } catch {
        /* offline / blocked — just keep whatever we had */
      }
    }

    pull()
    const id = setInterval(pull, 20000)
    return () => { active = false; clearInterval(id) }
  }, [])

  return items
}

/* ------------------------------------------------------------------- GitHub */

interface GhEvent {
  type: string
  created_at: string
  repo: { name: string }
  payload?: { ref?: string }
}

function useGithub(): Activity | null {
  const [item, setItem] = useState<Activity | null>(null)

  useEffect(() => {
    let active = true

    const pull = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/events/public`,
          { headers: { Accept: 'application/vnd.github+json' } }
        )
        if (!res.ok) return
        const events: GhEvent[] = await res.json()
        const push = events.find((e) => e.type === 'PushEvent')
        if (!active || !push) return

        const at = new Date(push.created_at).getTime()
        if (Date.now() - at > GITHUB_MAX_AGE_MS) { setItem(null); return }

        const repo = push.repo.name.split('/').pop() ?? push.repo.name
        // The public events feed omits `commits`/`size` for this account, so the
        // branch is the only extra detail actually available here.
        const branch = push.payload?.ref?.replace('refs/heads/', '')
        setItem({
          key: 'github',
          kind: 'github',
          title: 'Pushed to GitHub',
          detail: repo,
          sub: branch ? `on ${branch}` : undefined,
          since: at,
          ago: true,
          href: `https://github.com/${push.repo.name}`,
        })
      } catch {
        /* rate limited or offline — leave as-is */
      }
    }

    pull()
    const id = setInterval(pull, 5 * 60 * 1000)
    return () => { active = false; clearInterval(id) }
  }, [])

  return item
}

/* -------------------------------------------------------------------- merge */

export function usePresence(): Activity[] {
  const spotify = useLanyard()
  const agent = useAgent()
  const github = useGithub()

  // Re-render on a timer so the "1h 4m" elapsed labels keep counting up.
  const [, setTick] = useState(0)
  const mounted = useRef(false)
  useEffect(() => {
    mounted.current = true
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => { mounted.current = false; clearInterval(id) }
  }, [])

  const order: Record<string, number> = { spotify: 0, roblox: 1, claude: 2, github: 3 }
  const all = [...(spotify ? [spotify] : []), ...agent, ...(github ? [github] : [])]

  // The agent could in principle also report Spotify; Lanyard's copy wins.
  const seen = new Set<string>()
  return all
    .filter((a) => (seen.has(a.kind) ? false : (seen.add(a.kind), true)))
    .sort((a, b) => (order[a.kind] ?? 9) - (order[b.kind] ?? 9))
}
