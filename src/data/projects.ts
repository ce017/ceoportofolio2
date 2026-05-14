export interface ProjectSubsection {
  title?: string
  note?: string
  images: string[]
}

export interface Project {
  id: string
  title: string
  link?: string
  subsections: ProjectSubsection[]
}

export const projects: Project[] = [
  {
    id: 'hickam-afb',
    title: 'Hickam Air Force Base',
    link: 'https://www.roblox.com/games/15701457046/V3-Hickam-Air-Force-Base',
    subsections: [
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
]
