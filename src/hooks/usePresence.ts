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

/* Discord activity types we surface. 2 is Spotify (handled separately) and 4 is
   the custom status, which is text rather than an activity. */
const ACTIVITY_VERB: Record<number, string> = {
  0: 'Playing',
  1: 'Streaming',
  3: 'Watching',
  5: 'Competing in',
}

interface LanyardActivity {
  type: number
  name: string
  details?: string
  state?: string
  application_id?: string
  timestamps?: { start?: number }
  assets?: { large_image?: string }
}

/** Turn Discord's asset ref into a real URL; returns undefined if we can't. */
function assetUrl(a: LanyardActivity): string | undefined {
  const img = a.assets?.large_image
  if (!img) return undefined
  // Proxied external art is stored as "mp:external/<hash>/https/<host>/<path>".
  if (img.startsWith('mp:')) return `https://media.discordapp.net/${img.slice(3)}`
  if (!a.application_id) return undefined
  return `https://cdn.discordapp.com/app-assets/${a.application_id}/${img}.png`
}

function gamesToActivities(list: LanyardActivity[]): Activity[] {
  const out: Activity[] = []
  const seen = new Set<string>()
  for (const a of list) {
    const verb = ACTIVITY_VERB[a.type]
    if (!verb || !a.name) continue
    if (seen.has(a.name)) continue
    seen.add(a.name)
    out.push({
      key: `game:${a.name}`,
      kind: 'game',
      title: `${verb} ${a.name}`,
      detail: a.details,
      sub: a.state,
      since: a.timestamps?.start,
      imageUrl: assetUrl(a),
    })
  }
  return out
}

function useLanyard(): { spotify: Activity | null; games: Activity[] } {
  const [spotify, setSpotify] = useState<Activity | null>(null)
  const [games, setGames] = useState<Activity[]>([])

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
          setGames(gamesToActivities(msg.d?.activities ?? []))
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

  return { spotify, games }
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

/**
 * Discord names the app it detects; the agent reports the same app with richer
 * data (the open Studio place). Where both describe the SAME app, the agent wins
 * — but only for that exact name, so playing plain "Roblox" still shows.
 */
const AGENT_COVERS: Record<string, string> = {
  roblox: 'roblox studio',
  claude: 'claude',
}

export function usePresence(): Activity[] {
  const { spotify, games } = useLanyard()
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

  // Names already described by an agent card, so Discord's plainer copy is dropped.
  const covered = new Set(
    agent.map((a) => AGENT_COVERS[a.kind]).filter(Boolean) as string[]
  )
  const dedupedGames = games.filter(
    (g) => !covered.has(g.title.replace(/^\w+(\s+in)?\s+/, '').toLowerCase())
  )

  const order: Record<string, number> = {
    spotify: 0, roblox: 1, claude: 2, game: 3, github: 4,
  }
  const all = [
    ...(spotify ? [spotify] : []),
    ...agent,
    ...dedupedGames,
    ...(github ? [github] : []),
  ]

  // Keys are unique per activity ('game:Minecraft'), so several games can stack
  // while a duplicate of the same one cannot.
  const seen = new Set<string>()
  return all
    .filter((a) => (seen.has(a.key) ? false : (seen.add(a.key), true)))
    .sort((a, b) => (order[a.kind] ?? 9) - (order[b.kind] ?? 9))
}
