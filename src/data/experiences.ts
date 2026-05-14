export interface Experience {
  id: string
  title: string
  dateRange: string
  description: string
  roles: { group: string; items: string[] }[]
  links?: { label: string; href: string }[]
}

export const experiences: Experience[] = [
  {
    id: 'usaf',
    title: "bbbvvvvvvi's USAF",
    dateRange: '2023 — present',
    description: 'Served across every major command level — currently 2nd in command of the entire group as Chairman of the Joint Chiefs of Staff.',
    roles: [
      {
        group: 'Department of War',
        items: [
          'Commander In Chief (current)',
          'Chairman of the Joint Chiefs of Staff (2nd in command)',
          'Vice Chairman of the Joint Chiefs of Staff',
        ],
      },
      {
        group: 'Joint Chiefs of Staff',
        items: [
          'Chief of Staff of the Air Force',
          'Vice Chief of Staff of the Air Force',
        ],
      },
      {
        group: 'Air Staff',
        items: ['Chief Master Sergeant of the Air Force'],
      },
      {
        group: 'Air Combat Command',
        items: ['Commander', 'Deputy Commander', 'Command Chief Master Sergeant'],
      },
      {
        group: 'Development Team',
        items: ['Head Developer', 'Project Manager', 'Senior Developer'],
      },
    ],
    links: [
      { label: 'Roblox Group', href: 'https://www.roblox.com/communities/33334312/United-Stat-s-ir-Forc' },
      { label: 'Discord', href: 'https://discord.gg/air-force' },
    ],
  },
  {
    id: 'usar',
    title: "Zanance's USAR",
    dateRange: '2022 — 2023',
    description: 'High-ranking staff member across multiple divisions of one of the largest US Army communities on Roblox (56k Discord members).',
    roles: [
      {
        group: 'JFKSWCS (ASOC)',
        items: [
          'Deputy Head Instructor ×3',
          'Head Instructor ×3',
          'Company First Sergeant',
          'Instructor of the Week ×2',
        ],
      },
      {
        group: '82nd Airborne (FORSCOM)',
        items: ['Senior Black Hat', 'Platoon Sergeant', 'Platoon Leader'],
      },
      {
        group: '101st Airborne (FORSCOM)',
        items: ['Senior Pilot', 'Platoon Staff', 'Senior Black Hat'],
      },
      {
        group: '1st Infantry Division',
        items: ['Head Instructor', 'Platoon Sergeant'],
      },
    ],
    links: [
      { label: 'Roblox Group', href: 'https://www.roblox.com/communities/3108077/United-States-Army#!/about' },
      { label: 'Discord', href: 'https://discord.gg/usar' },
    ],
  },
  {
    id: 'us-armed-forces',
    title: "Liam Born's US Armed Forces",
    dateRange: '2022 — 2023',
    description: 'Senior command role spanning both the Navy and Army branches of the group, alongside builder and developer responsibilities.',
    roles: [
      {
        group: 'Command',
        items: [
          'Provost Marshal General (Navy & Army)',
          'Builder and Developer',
        ],
      },
    ],
    links: [
      { label: 'Roblox Group', href: 'https://www.roblox.com/communities/35415775/The-United-States-ilitary-2000s#!/about' },
      { label: 'Discord', href: 'https://discord.gg/RWJPbP3p5r' },
    ],
  },
  {
    id: 'german-army',
    title: "FuFu's German Army",
    dateRange: '2021 — 2022',
    description: 'Rose to 2nd in command of the entire group through the Special Forces Command branch.',
    roles: [
      {
        group: 'Special Forces Command',
        items: [
          'Inspector of the Army (2nd in command)',
          'Upper-Army Staff',
          'Commanding General',
          'Deputy Commanding General',
        ],
      },
    ],
  },
  {
    id: 'community-management',
    title: 'Community Management',
    dateRange: '2020 — present',
    description: 'High-ranking staff across 10+ large Roblox communities (1.5k–56k active members) spanning RP games, armies, studios, and hangouts.',
    roles: [
      {
        group: 'Notable roles',
        items: [
          'Head of Staff — Greater City RP (ER:LC) — 18k Discord members',
          'Community Manager — Black City RP (ER:LC) — 8k Discord members',
          'Admin — The Hourse (Roblox game) — 12k Discord members',
          'Head of In-Game Moderation — Various Hood Games (1.5k active players)',
          'Former Owner — ER:LC RP community (closed after 1 year) — 2.5k members',
          'Former Owner — Italian Army game — 700 members',
        ],
      },
    ],
  },
]
