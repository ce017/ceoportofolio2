export interface ProfRole {
  title: string
  description: string
  links?: { label: string; href: string }[]
}

export const developerRoles: ProfRole[] = [
  {
    title: 'Roblox Studio Builder',
    description: "Main developer skill — worked on lots of projects where I built whole maps for RP groups, army groups, random games, hangout games, real life games, etc. I'm good at building realistic buildings and stuff in general. I use my own assets if I get paid, to get the best professional experience to whoever hires me.",
  },
  {
    title: 'Graphic Artist',
    description: 'Worked on different projects where I made stuff like gamepass logos, division logos, restaurant menus, propaganda, and all types of graphic design like that.',
  },
  {
    title: 'Roblox Studio Scripter',
    description: "Worked lots with the Kronos system, but I made my own scripts for gamepasses and for assets in the projects I worked with. Lately I've gone a lot deeper into full game systems — on USAF V4 I work inside a Knit framework, fixing stuff like loading and streaming bugs that only show up on the live game, and I built a whole warzone Raiders system where civilians join through an NPC, get a loadout, respawn at their own base and use the car spawner. On a naval tycoon I built the plot and zone system, the building economy with storage caps, and a troop-and-ship conquest pipeline with pathfinding combat. Right now I'm scripting my own story game, Bodyguard. — missions, NPC crowds, menus and saves. I've also started on animation: rider animations for my bike system and a 5-hit full-body sword combo that plays on both R6 and R15.",
  },
  {
    title: 'Web Developer',
    description: "Newer skill I picked up and now use a lot. This portfolio is built with Next.js, TypeScript and GSAP, and I've made real business sites too — an Italian freight forwarding company (5 languages, Three.js globe on the hero, news and downloads pages) and a futsal club site styled after a sticker album, plus a beach club site running on Supabase and an events site for the nights they host, with a 3D logo hero and Apple-style clear glass buttons. I do the whole thing myself: design, build, GitHub and the Vercel deploys.",
    links: [
      { label: 'Sistema Spedizioni', href: 'https://sistemaspedizioni.vercel.app' },
      { label: 'Scafati Futsal Club', href: 'https://scafatifutsal.vercel.app' },
      { label: 'Papi on the Beach', href: 'https://sito-papi.vercel.app' },
      { label: 'Tropify Events', href: 'https://tropify.vercel.app' },
    ],
  },
  {
    title: 'App Developer',
    description: "Newest thing I'm working on: Clout, an iOS app built with Expo / React Native and Supabase. It's a social sim where you start as a nobody and try to get famous — feed, stories, DMs, events and daily missions, with the characters you talk to run by AI. Still in testing, not on the App Store yet.",
  },
  {
    title: 'Discord Bot Developer',
    description: 'Made a Discord bot in Python that simulates X posts, profiles and threads, rendering the cards remotely on Vercel so they come out looking like the real site instead of a plain embed.',
    links: [
      { label: 'Try the bot', href: 'https://discord.com/oauth2/authorize?client_id=1518662476701499445' },
    ],
  },
  {
    title: 'Tools & AI',
    description: "I also make tools and put them on GitHub. StudioSwitch is a Windows app that lets you choose which open Roblox Studio windows an AI assistant can use. I wrote two PowerShell watchers that catch infostealers taking your Roblox cookie or Discord token and name the program doing it. And I'm building AIs Break Room — an arcade where AI assistants play text games over MCP, with friends and live spectating.",
    links: [
      { label: 'StudioSwitch', href: 'https://github.com/ce017/StudioSwitch' },
      { label: 'Roblox anti cookie stealer', href: 'https://github.com/ce017/roblox-anti-cookie-stealer' },
      { label: 'Discord anti token stealer', href: 'https://github.com/ce017/discord-anti-token-stealer' },
      { label: 'AIs Break Room', href: 'https://aisbreakroom.vercel.app' },
    ],
  },
]

export const communityRoles: string[] = [
  'Head of Staff — Greater City RP (ER:LC RP) — 18k Discord members',
  'Community Manager — Black City RP (ER:LC RP) — 8k Discord members',
  'Admin — The Hourse (Roblox game) — 12k Discord members',
  'Former Owner — ER:LC RP community (closed after a year) — 2.5k Discord members',
  'Former Owner — Italian Army game — 700 Discord members',
  "Moderator — Zan's USAR — 56k Discord members",
]
