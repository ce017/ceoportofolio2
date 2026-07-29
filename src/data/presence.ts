// Config for the live activity widget (top-left "what I'm doing right now" stack).
//
// Sources:
//  - Lanyard   -> Spotify (works from any device, incl. phone). Needs DISCORD_USER_ID
//                 set below AND the Discord account to have joined discord.gg/lanyard
//                 once, which is how Lanyard is allowed to watch your presence.
//  - Supabase  -> Roblox Studio place name + Claude, pushed by scripts/presence-agent.py
//                 running on the PC. Read-only key, safe to ship to the browser.
//  - GitHub    -> most recent public push, straight from the public API (CORS-enabled).

/** Numeric Discord user ID (NOT the @handle). Leave '' to disable the Spotify card. */
export const DISCORD_USER_ID = '694228874535633057'

export const GITHUB_USER = 'ce017'

/**
 * Only surface a GitHub push if it happened within this window. GitHub's public
 * events feed lags a few minutes and only keeps ~90 days, so a tight window here
 * makes the card look broken on quiet days.
 */
export const GITHUB_MAX_AGE_MS = 3 * 24 * 60 * 60 * 1000

/**
 * The agent heartbeats every ~20s; if the newest row is older than this the PC is
 * considered off and the agent-backed cards are dropped rather than shown stale.
 */
export const AGENT_STALE_MS = 90 * 1000

export const SUPABASE_URL = 'https://hrdvikkafvvfwgwvrdzz.supabase.co'
export const SUPABASE_ANON_KEY = 'sb_publishable_5YFQeAXAdkXc1Q35cIOsgQ_ofmp9HHe'
export const PRESENCE_ENDPOINT =
  `${SUPABASE_URL}/rest/v1/portfolio_presence?select=payload,updated_at&id=eq.1`

export type ActivityKind = 'spotify' | 'roblox' | 'claude' | 'github' | 'idle'

export interface Activity {
  key: string
  kind: ActivityKind
  /** Top line, e.g. "Listening to Spotify" */
  title: string
  /** Main detail, e.g. "Song — Artist" or the Studio place name */
  detail?: string
  /** Optional third line */
  sub?: string
  /** Epoch ms the activity started; renders as "since HH:MM · 1h 4m" */
  since?: number
  /** Point-in-time event (a push) rather than something ongoing: renders "3h ago". */
  ago?: boolean
  /** Epoch ms it ends (Spotify) — drives the progress bar */
  until?: number
  imageUrl?: string
  href?: string
}

export const ACCENTS: Record<ActivityKind, string> = {
  spotify: '#1db954',
  roblox: '#00a2ff',
  claude: '#d97757',
  github: '#8b949e',
  idle: '#4a4a4a',
}
