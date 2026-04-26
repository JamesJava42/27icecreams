import type { MetadataRoute } from "next"
import { getAllShopSlugs } from "@/lib/shops"
import { getAllBlogSlugs } from "@/lib/blog"

const BASE = "https://californiaicecreamtrail.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const shopUrls = getAllShopSlugs().map((slug) => ({
    url: `${BASE}/shops/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const blogUrls = getAllBlogSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/shops`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/map`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/trail`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/quiz`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...shopUrls,
    ...blogUrls,
  ]
}
