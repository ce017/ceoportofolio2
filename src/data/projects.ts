export interface ProjectSubsection {
  title?: string
  note?: string
  images: string[]
}

export interface Project {
  id: string
  title: string
  /** Heading the project is listed under; consecutive projects share one. Defaults to "Roblox". */
  group?: string
  link?: string
  /** Overrides the default "Visit on Roblox" button label. */
  linkLabel?: string
  /** Small chip beside the title, e.g. "Buyable". */
  tag?: string
  /** Shown under the header, for projects that are systems rather than places. */
  description?: string
  features?: string[]
  subsections: ProjectSubsection[]
}

/** Where to go to buy anything tagged "Buyable". */
export const PURCHASE_CONTACT = {
  handle: '@.ceo',
  discordUser: 'https://discord.com/users/694228874535633057',
  discordServer: 'https://discord.gg/mPSSBmm9pV',
}

export const projects: Project[] = [
  {
    id: 'ceo-bike-system',
    title: "Ceo's Bike System",
    tag: 'Buyable',
    link: 'https://www.roblox.com/games/75334251057311/ceos-bikes',
    linkLabel: 'Test place',
    description: 'Modified a pre-made bike system to fit my style.',
    features: [
      'Automatic / manual gears',
      'Realistic wheeling',
      'First person',
      'Third person',
      'First/third person particles on movement',
      'Pre-made bike models with the system already imported',
    ],
    subsections: [
      {
        images: [
          'https://i.imgur.com/GD80Gwp.png',
          'https://i.imgur.com/5xxl1H0.png',
          'https://i.imgur.com/bYzz1GW.png',
          'https://i.imgur.com/MJUMD47.png',
          'https://i.imgur.com/QpJbpkU.png',
        ],
      },
    ],
  },
  {
    id: 'ceo-locker-system',
    title: "Ceo's Locker System",
    tag: 'Buyable',
    link: 'https://www.roblox.com/games/71486799941145/Ceos-locker-system',
    linkLabel: 'Test place',
    description: 'Fully made by me.',
    features: [
      'Customizable colors',
      'Customizable images for each item',
      'Gears, accessories and clothing are all supported',
      'Made to be customized easily',
    ],
    subsections: [
      {
        images: [
          'https://i.imgur.com/TF4efts.png',
          'https://i.imgur.com/tOxbno1.png',
          'https://i.imgur.com/fG5QYtD.png',
        ],
      },
    ],
  },
  {
    id: 'bodyguard',
    title: 'Bodyguard.',
    tag: 'In development',
    description: "My own story game, scripted by me from scratch. You get hired by mail as a private security agent, protect bigger and bigger clients and work your way up to a presidential detail. Not public yet.",
    features: [
      'Play Solo, or Duo with a friend — empty slots get an NPC partner',
      'Five missions so far: a gala, a 2 AM break-in at the client’s house, a campaign rally, a hospital and a White House press briefing',
      'Every mission is its own place — the detail teleports in from the main menu',
      'Crowds of NPC guests that walk around, sit down and hold real conversations with chat bubbles',
      'Graded debrief (A–F) after every mission, saved to your profile',
      'Main menu with cinematic cameras, character customization and graphics settings',
    ],
    subsections: [
      {
        title: 'Cinematics & effects',
        note: 'Clips recorded while testing in Studio.',
        images: [
          '/projects/bodyguard/clips/hit.mp4',
          '/projects/bodyguard/clips/rally_night.mp4',
          '/projects/bodyguard/clips/arrival.mp4',
          '/projects/bodyguard/clips/flyin.mp4',
          '/projects/bodyguard/clips/whitehouse.mp4',
          '/projects/bodyguard/clips/briefing.mp4',
          '/projects/bodyguard/clips/rally_crowd.mp4',
          '/projects/bodyguard/clips/hospital.mp4',
          '/projects/bodyguard/clips/debrief.jpg',
        ],
      },
      {
        title: 'Screenshots',
        images: [
          '/projects/bodyguard/01.jpg',
          '/projects/bodyguard/02.jpg',
          '/projects/bodyguard/03.jpg',
          '/projects/bodyguard/04.jpg',
          '/projects/bodyguard/05.jpg',
          '/projects/bodyguard/06.jpg',
          '/projects/bodyguard/07.jpg',
          '/projects/bodyguard/08.jpg',
          '/projects/bodyguard/09.jpg',
          '/projects/bodyguard/10.jpg',
          '/projects/bodyguard/11.jpg',
          '/projects/bodyguard/12.jpg',
        ],
      },
    ],
  },
  {
    id: 'sword-combo',
    title: 'Sword Combo',
    tag: 'Animation',
    description: 'A 5-hit full-body sword combo I made for a commission pitch — cartoony but not goofy, and the same combo plays on both R6 and R15 rigs.',
    features: [
      'Five hits that chain straight into each other',
      'One set of key poses, retargeted to R6 and R15',
      'Swing trail fires on animation markers, so the effect stays in sync with every hit',
    ],
    subsections: [
      {
        images: ['/projects/sword-combo/01.mp4', '/projects/sword-combo/02.mp4'],
      },
    ],
  },
  {
    id: 'rick-morty-gadgets',
    title: 'Rick and Morty Gadgets',
    description: 'Gadgets from Rick and Morty, each one a tool with its own animation and effect, all working on R6.',
    features: [
      'Get Schwifty machine — plays the song, with 5 dance animations that rotate',
      'Freeze ray, with a frost and defrost animation',
      'Pickle Rick syringe — you turn into a pickle and roll around, slowly',
      'Butter Robot',
      'Bully gun',
      'Invisibility belt',
      'Shrink ray',
      'Gravity boots that let you walk on walls',
    ],
    subsections: [
      {
        note: 'One clip per gadget, recorded in Studio. Open a clip to turn the sound on.',
        images: [
          '/projects/rick-morty-gadgets/get-schwifty.mp4',
          '/projects/rick-morty-gadgets/freeze-ray.mp4',
          '/projects/rick-morty-gadgets/pickle-rick.mp4',
          '/projects/rick-morty-gadgets/butter-robot.mp4',
          '/projects/rick-morty-gadgets/bully-gun.mp4',
          '/projects/rick-morty-gadgets/invisibility-belt.mp4',
          '/projects/rick-morty-gadgets/shrink-ray.mp4',
          '/projects/rick-morty-gadgets/gravity-boots.mp4',
        ],
      },
    ],
  },
  {
    id: 'the-company',
    title: 'The Company',
    link: 'https://www.roblox.com/games/76842920359834/The-Company',
    subsections: [
      {
        images: [
          'https://i.imgur.com/L3F2xfq.png',
          'https://i.imgur.com/2auwrlG.png',
          'https://i.imgur.com/dozHikU.png',
          'https://i.imgur.com/c530eqe.png',
          'https://i.imgur.com/IXMnKnj.png',
          'https://i.imgur.com/rXJamkH.png',
        ],
      },
    ],
  },
  {
    id: 'hickam-afb',
    title: 'Hickam Air Force Base',
    link: 'https://www.roblox.com/games/15701457046/V3-Hickam-Air-Force-Base',
    subsections: [
      {
        title: 'Version 4.0',
        images: [
          'https://i.imgur.com/yrVUnTm.png',
          'https://i.imgur.com/ZaHCpj2.png',
          'https://i.imgur.com/kfDRzRe.png',
          'https://i.imgur.com/AO4EfW9.png',
          'https://i.imgur.com/LT42OTD.png',
          'https://i.imgur.com/1MynIKq.png',
          'https://i.imgur.com/Dsd4wCg.png',
          'https://i.imgur.com/DXoFX1q.png',
          'https://i.imgur.com/1moF1Zw.png',
          'https://i.imgur.com/Vc59pRZ.png',
          'https://i.imgur.com/F9KOOq7.png',
          'https://i.imgur.com/K1Yglih.png',
          'https://i.imgur.com/2QVv477.png',
          'https://i.imgur.com/8NVnpkz.png',
          'https://i.imgur.com/mBsmCp1.png',
          'https://i.imgur.com/W6XMu9X.png',
          'https://i.imgur.com/moduDHC.png',
          'https://i.imgur.com/1pezASC.png',
          'https://i.imgur.com/L7Rxc3P.png',
          'https://i.imgur.com/FPnOvEF.png',
          'https://i.imgur.com/w9ObfR8.png',
          'https://i.imgur.com/hsmqKze.png',
          'https://i.imgur.com/r0ulGgR.png',
          'https://i.imgur.com/iQLwZEB.png',
          'https://i.imgur.com/oAMgy5h.png',
          'https://i.imgur.com/FNBfavS.png',
          'https://i.imgur.com/Ojtftij.png',
          'https://i.imgur.com/WjqcIfg.png',
          'https://i.imgur.com/WngUdkR.png',
          'https://i.imgur.com/gexwNWr.png',
          'https://i.imgur.com/bqvt8Rr.png',
          'https://i.imgur.com/A5PMDTR.png',
          'https://i.imgur.com/QTX92Id.png',
        ],
      },
      {
        title: 'Version 3.0',
        images: [
          'https://i.imgur.com/iqYSLcc.jpeg',
          'https://i.imgur.com/foaOm6h.jpeg',
          'https://i.imgur.com/ZN2ncPW.jpeg',
          'https://i.imgur.com/KjSTMB6.jpeg',
          'https://i.imgur.com/UXMKQbb.jpeg',
          'https://i.imgur.com/FNYgxza.jpeg',
          'https://i.imgur.com/vu0JeZI.jpeg',
          'https://i.imgur.com/p65CQeb.jpeg',
          'https://i.imgur.com/ie2Wyr3.jpeg',
          'https://i.imgur.com/EuWzkxM.jpeg',
          'https://i.imgur.com/jQZu9TQ.jpeg',
          'https://i.imgur.com/PTqbd7p.jpeg',
          'https://i.imgur.com/ieMxgs9.jpeg',
          'https://i.imgur.com/Orzuq3C.jpeg',
          'https://i.imgur.com/VaAA3Mg.jpeg',
        ],
      },
      {
        title: 'Framework Setup & Customization',
        note: "I did not create the framework, that is Kronos' work. I only set it up and customized it for the game, which is still a lot of work.",
        images: [
          'https://i.imgur.com/mz85oUD.jpeg',
          'https://i.imgur.com/h0emsXv.jpeg',
          'https://i.imgur.com/SlrqR0O.jpeg',
          'https://i.imgur.com/ZYzoS0t.jpeg',
          'https://i.imgur.com/nJD5vUc.jpeg',
        ],
      },
    ],
  },
  {
    id: 'usaf-academy-v4',
    title: 'United States Air Force Academy — V4',
    link: 'https://www.roblox.com/games/97802714567651',
    description: 'Head developer. We made this version after Roblox took down our main one, which had more than 100k visits over the years. I built the whole map in a highly realistic style, customized the UIs and the whole main system, and managed the community as second in command.',
    subsections: [
      {
        images: ['/projects/usaf-academy-v4/01.jpg'],
      },
    ],
  },
  {
    id: 'afa-basic-training',
    title: 'Air Force Academy: Basic Training',
    link: 'https://www.roblox.com/games/73056765804967',
    description: 'Reworked the whole automatic BMT system, which uses a set of APIs and scripts to request a rank as soon as a player passes the training.',
    subsections: [
      {
        images: ['/projects/afa-basic-training/01.jpg'],
      },
    ],
  },
  {
    id: 'arnold-hall',
    title: 'Arnold Hall',
    link: 'https://www.roblox.com/games/114029373055808',
    description: 'Head developer: coordinated the devs building the venue, imported Kronos’ system and adapted it to what the game needed.',
    subsections: [],
  },
  {
    id: 'joint-base-henderson',
    title: 'Joint Base Henderson, 2002',
    link: 'https://www.roblox.com/games/134222720073024',
    description: 'Got hired by this military roleplay group and helped on the building side of the game: interiors and entire buildings.',
    subsections: [],
  },
  {
    id: 'milnet',
    title: 'MilNet Recruiting Game',
    subsections: [
      {
        images: [
          'https://i.imgur.com/hJVhXa7.png',
          'https://i.imgur.com/NGxqVs4.png',
          'https://i.imgur.com/jl4DFEM.png',
          'https://i.imgur.com/iJ24O1h.png',
          'https://i.imgur.com/BhAcYQs.png',
        ],
      },
    ],
  },
  {
    id: 'joint-base-williams',
    title: 'Joint Base Williams',
    link: 'https://www.roblox.com/games/119173603068691/Joint-Base-Williams',
    subsections: [
      {
        images: [
          'https://i.imgur.com/VCqwNx1.png',
          'https://i.imgur.com/SAO2KRK.png',
          'https://i.imgur.com/zuSgdEx.png',
          'https://i.imgur.com/rQYHsaK.png',
          'https://i.imgur.com/OrgKLwp.png',
          'https://i.imgur.com/yEWthpb.png',
          'https://i.imgur.com/EGgJaqd.png',
          'https://i.imgur.com/OdYSOlv.png',
          'https://i.imgur.com/QRgpzb0.png',
          'https://i.imgur.com/GaRdo9L.png',
          'https://i.imgur.com/0o6jCZn.png',
          'https://i.imgur.com/vSvfsBy.png',
          'https://i.imgur.com/hY7SzId.png',
          'https://i.imgur.com/XX3O6s3.png',
          'https://i.imgur.com/RWZpUGL.png',
          'https://i.imgur.com/ryvN6Yy.png',
        ],
      },
    ],
  },
  {
    id: 'the-mansion',
    title: 'The Mansion',
    link: 'https://www.roblox.com/games/94459276778774/The-Mansion',
    subsections: [
      {
        images: [
          'https://i.imgur.com/VUR400h.png',
          'https://i.imgur.com/ZgtYzUe.png',
          'https://i.imgur.com/yagc9EO.png',
          'https://i.imgur.com/Tw9ifGX.png',
          'https://i.imgur.com/U2P4s4F.png',
          'https://i.imgur.com/LkE5hG3.png',
          'https://i.imgur.com/nMj4jm8.png',
          'https://i.imgur.com/KYeRfKq.png',
          'https://i.imgur.com/mWX4Ita.png',
          'https://i.imgur.com/Yd6KxU0.png',
          'https://i.imgur.com/LQ0lvK9.png',
          'https://i.imgur.com/60Id9Df.png',
          'https://i.imgur.com/y1oumIz.png',
          'https://i.imgur.com/PI6hfai.png',
          'https://i.imgur.com/JMVsOYI.png',
          'https://i.imgur.com/pY4bmr4.png',
          'https://i.imgur.com/SAtjESw.png',
          'https://i.imgur.com/iOara8C.png',
        ],
      },
    ],
  },

  // ── Websites ────────────────────────────────────────────────────────────────
  {
    id: 'tropify',
    group: 'Websites',
    title: 'Tropify Events',
    link: 'https://tropify.vercel.app',
    linkLabel: 'Visit site',
    description: 'Site for Tropify Events, the club nights at Papi on the Beach and PRIME in Pordenone. Built with Next.js, React Three Fiber and Tailwind.',
    features: [
      '3D logo hero floating over a cloud field',
      'Pinned gallery where the photos ride a spinning 3D ring',
      'Apple-style clear glass buttons that bend whatever is behind them',
      'Tuned separately for phones',
    ],
    subsections: [
      {
        images: [
          '/projects/tropify/01.jpg',
          '/projects/tropify/02.jpg',
          '/projects/tropify/03.jpg',
          '/projects/tropify/04.jpg',
        ],
      },
    ],
  },
  {
    id: 'sistema-spedizioni',
    group: 'Websites',
    title: 'Sistema Spedizioni',
    link: 'https://sistemaspedizioni.vercel.app',
    linkLabel: 'Visit site',
    description: 'Full rebuild of the site for an Italian freight forwarding company.',
    features: [
      'Five languages',
      'Three.js globe on the hero',
      'Services, sectors, news and downloads pages',
      'Quote request form',
    ],
    subsections: [
      {
        images: [
          '/projects/sistema-spedizioni/01.jpg',
          '/projects/sistema-spedizioni/02.jpg',
          '/projects/sistema-spedizioni/03.jpg',
          '/projects/sistema-spedizioni/04.jpg',
          '/projects/sistema-spedizioni/05.jpg',
        ],
      },
    ],
  },
  {
    id: 'scafati-futsal',
    group: 'Websites',
    title: 'Scafati Futsal Club',
    link: 'https://scafatifutsal.vercel.app',
    linkLabel: 'Visit site',
    description: 'Official site of a futsal club, styled after a sticker album — every player gets their own trading card.',
    features: [
      'Squad, staff, gallery, club and partners pages',
      'Player cards that show their goal celebration on hover',
      'Facebook and Instagram feeds on the home page',
    ],
    subsections: [
      {
        images: [
          '/projects/scafati-futsal/01.jpg',
          '/projects/scafati-futsal/02.jpg',
          '/projects/scafati-futsal/03.jpg',
          '/projects/scafati-futsal/04.jpg',
        ],
      },
    ],
  },
  {
    id: 'papi-on-the-beach',
    group: 'Websites',
    title: 'Papi on the Beach',
    link: 'https://sito-papi.vercel.app',
    linkLabel: 'Visit site',
    description: 'Site for a beach club and disco near Pordenone, running on Supabase.',
    features: [
      'Events, gallery, venue and restaurant pages',
      'Admin page where the staff add their own events',
      'Logos for every night they host, from Tropify to Maldita',
    ],
    subsections: [
      {
        images: [
          '/projects/papi-on-the-beach/01.jpg',
          '/projects/papi-on-the-beach/02.jpg',
          '/projects/papi-on-the-beach/03.jpg',
          '/projects/papi-on-the-beach/04.jpg',
        ],
      },
    ],
  },

  // ── Apps & Tools ────────────────────────────────────────────────────────────
  {
    id: 'clout',
    group: 'Apps & Tools',
    title: 'Clout',
    tag: 'In testing',
    description: "An iOS app I'm building with Expo / React Native and Supabase. It's a social sim where you start as a nobody and try to get famous. Not on the App Store yet.",
    features: [
      'Feed, stories, comments and DMs',
      'Events where every choice moves your followers and your relationships',
      'Characters that post, react and text you back, run by AI',
      'Career levels from Newcomer to Legend, daily missions and streaks',
    ],
    subsections: [
      {
        note: 'Stills from the promo video I made for it.',
        images: [
          '/projects/clout/01.jpg',
          '/projects/clout/02.jpg',
          '/projects/clout/03.jpg',
          '/projects/clout/04.jpg',
          '/projects/clout/05.jpg',
          '/projects/clout/06.jpg',
        ],
      },
    ],
  },
  {
    id: 'ais-break-room',
    group: 'Apps & Tools',
    title: 'AIs Break Room',
    tag: 'Coming soon',
    link: 'https://aisbreakroom.vercel.app',
    linkLabel: 'Visit site',
    description: 'An arcade where AI assistants play games on their break. Your AI connects with a single URL over MCP, picks a machine and plays text-first games — with friends, and you can watch live.',
    features: [
      'Hosted MCP server with its own game tools',
      'Multiplayer, friends by username, live spectating',
      'Token budgets so a break never eats your usage',
    ],
    subsections: [
      {
        images: ['/projects/ais-break-room/01.jpg'],
      },
    ],
  },
  {
    id: 'studioswitch',
    group: 'Apps & Tools',
    title: 'StudioSwitch',
    tag: 'Open source',
    link: 'https://github.com/ce017/StudioSwitch',
    linkLabel: 'View on GitHub',
    description: 'A small Windows app that lets you choose which open Roblox Studio windows your AI assistant can use. Tick the places it may see, star a default, and switch while you work.',
    features: [
      'Hides unticked Studios and refuses calls aimed at them',
      'Changes apply to running sessions straight away',
      'Works with Claude, Cursor, VS Code, Windsurf and Gemini CLI',
    ],
    subsections: [
      {
        images: [
          '/projects/studioswitch/01.jpg',
          '/projects/studioswitch/02.jpg',
          '/projects/studioswitch/03.jpg',
        ],
      },
    ],
  },
  {
    id: 'roblox-anti-cookie-stealer',
    group: 'Apps & Tools',
    title: 'Roblox Anti Cookie Stealer',
    tag: 'Open source',
    link: 'https://github.com/ce017/roblox-anti-cookie-stealer',
    linkLabel: 'View on GitHub',
    description: 'Two PowerShell watchers for Windows. One clears your Roblox session cookie whenever Roblox is closed, the other catches an infostealer staging stolen browser data and names the program responsible.',
    subsections: [
      {
        images: [
          '/projects/security-tools/01.jpg',
          '/projects/security-tools/02.jpg',
        ],
      },
    ],
  },
  {
    id: 'discord-anti-token-stealer',
    group: 'Apps & Tools',
    title: 'Discord Anti Token Stealer',
    tag: 'Open source',
    link: 'https://github.com/ce017/discord-anti-token-stealer',
    linkLabel: 'View on GitHub',
    description: 'Detects theft of your Discord session token and tells you within seconds which program read it, instead of finding out when your friends start getting crypto links.',
    subsections: [
      {
        images: [
          '/projects/security-tools/03.jpg',
          '/projects/security-tools/04.jpg',
        ],
      },
    ],
  },
  {
    id: 'x-discord-bot',
    group: 'Apps & Tools',
    title: 'X Simulator Discord Bot',
    link: 'https://discord.com/oauth2/authorize?client_id=1518662476701499445',
    linkLabel: 'Add the bot',
    description: 'A Discord bot in Python that simulates X posts, profiles and threads. The cards are rendered remotely on Vercel, so they come out looking like the real site instead of a plain embed.',
    subsections: [
      {
        images: [
          '/projects/x-discord-bot/01.jpg',
          '/projects/x-discord-bot/02.jpg',
          '/projects/x-discord-bot/03.jpg',
        ],
      },
    ],
  },
]
