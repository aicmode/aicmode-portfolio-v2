import type { MetadataRoute } from 'next'

const SITE_URL = 'https://aicmode-portfolio.vercel.app'

/**
 * Single-page site, so one entry. `lastModified` is intentionally omitted rather
 * than stamped with build time: a rebuild does not mean the content changed, and
 * a date that moves on every deploy is noise for a crawler.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
