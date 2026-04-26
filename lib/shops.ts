import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { IceCreamItem } from "./types"

const shopsDir = path.join(process.cwd(), "content/shops")

export function getAllShopSlugs(): string[] {
  return fs.readdirSync(shopsDir).map((f) => f.replace(/\.mdx$/, ""))
}

export function getShopBySlug(slug: string): IceCreamItem | null {
  const filePath = path.join(shopsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { ...(data as Omit<IceCreamItem, "content">), slug, content }
}

export function getAllShops(): IceCreamItem[] {
  return getAllShopSlugs()
    .map((slug) => getShopBySlug(slug))
    .filter(Boolean) as IceCreamItem[]
}

export function getFeaturedShops(): IceCreamItem[] {
  return getAllShops().filter((s) => s.featured)
}

export function getShopsByRegion(region: string): IceCreamItem[] {
  return getAllShops().filter((s) => s.region === region)
}

export function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}

export function getAllCities(): string[] {
  return [...new Set(getAllShops().map((s) => s.city))].sort()
}

export function getShopsByCity(city: string): IceCreamItem[] {
  return getAllShops().filter((s) => s.city === city)
}

export function slugToCity(slug: string): string {
  return getAllCities().find((c) => cityToSlug(c) === slug) ?? slug
}
