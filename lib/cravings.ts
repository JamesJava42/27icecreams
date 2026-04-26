import type { IceCreamItem } from "./types"

export const CRAVING_OPTIONS = [
  { label: "Chocolate", emoji: "🍫", vibe: "chocolate" },
  { label: "Fruity & Bright", emoji: "🍓", vibe: "fruity" },
  { label: "Nutty & Rich", emoji: "🥜", vibe: "nutty" },
  { label: "Something Unique", emoji: "✨", vibe: "unique" },
  { label: "Dairy-Free", emoji: "🌱", vibe: "dairy-free" },
  { label: "Floral", emoji: "🌸", vibe: "floral" },
  { label: "Savory-Sweet", emoji: "🧂", vibe: "savory-sweet" },
] as const

export type CravingVibe = (typeof CRAVING_OPTIONS)[number]["vibe"]

export function getUseCaseTags(shop: IceCreamItem): string[] {
  const tags: string[] = []

  if (
    shop.category.includes("Historic") ||
    (shop.yearFounded !== undefined && shop.yearFounded < 1960)
  ) {
    tags.push("Local Legend")
  }

  if (shop.featured) tags.push("Worth the Trip")

  if (shop.vibes.includes("dairy-free")) tags.push("Dairy-Free")

  if (shop.priceRange === "$$$") tags.push("Date Night")

  if (shop.priceRange === "$") tags.push("Quick Stop")

  if (shop.category.includes("Modern") && shop.vibes.includes("unique")) {
    tags.push("Adventurous Pick")
  }

  if (shop.affiliateLinks.doordash || shop.affiliateLinks.ubereats) {
    tags.push("Delivery Available")
  }

  if (shop.affiliateLinks.goldbelly) {
    tags.push("Ships Nationwide")
  }

  return [...new Set(tags)].slice(0, 3)
}
