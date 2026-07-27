import type { MetadataRoute } from 'next'

const BASE = 'https://ce-17.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const sections = ['', '#about', '#projects', '#professional', '#experiences', '#awards', '#contact']
  return sections.map((s) => ({
    url: `${BASE}/${s}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: s === '' ? 1 : 0.7,
  }))
}
