import { MetadataRoute } from 'next'

const BASE = 'https://volimefei.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,           lastModified: new Date(), priority: 1 },
    { url: `${BASE}/cs`,   lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/en`,   lastModified: new Date(), priority: 0.9 },
  ]
}
