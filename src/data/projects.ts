export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project One',
    description: 'Short description of this Roblox project.',
    image: '/projects/project-1.jpg',
    tags: ['Roblox', 'Building'],
    link: 'https://www.roblox.com/games/placeholder',
  },
  {
    id: 'project-2',
    title: 'Project Two',
    description: 'Short description of this Roblox project.',
    image: '/projects/project-2.jpg',
    tags: ['Roblox', 'Scripting'],
  },
  {
    id: 'project-3',
    title: 'Project Three',
    description: 'Short description of this Roblox project.',
    image: '/projects/project-3.jpg',
    tags: ['Roblox', 'Design'],
    link: 'https://www.roblox.com/games/placeholder',
  },
  {
    id: 'project-4',
    title: 'Project Four',
    description: 'Short description of this Roblox project.',
    image: '/projects/project-4.jpg',
    tags: ['Roblox'],
  },
]
