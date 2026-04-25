export type Region = "NorCal" | "SoCal" | "Central"
export type Category = "Classic" | "Cult" | "Modern" | "Historic"
export type Vibe = "fruity" | "chocolate" | "nutty" | "unique" | "dairy-free" | "floral" | "savory-sweet"
export type PriceRange = "$" | "$$" | "$$$"

export interface AffiliateLinks {
  doordash?: string
  ubereats?: string
  goldbelly?: string
  shopWebsite: string
}

export interface Shop {
  id: number
  slug: string
  name: string
  city: string
  state: string
  lat: number
  lng: number
  region: Region
  yearFounded?: number
  priceRange: PriceRange
  address: string
  hours?: string
  image: string
  affiliateLinks: AffiliateLinks
  featured: boolean
  description: string
}

export interface IceCreamItem {
  id: number
  slug: string
  name: string
  shop: string
  shopSlug: string
  city: string
  lat: number
  lng: number
  region: Region
  category: Category[]
  vibes: Vibe[]
  description: string
  whyIconic: string
  yearFounded?: number
  priceRange: PriceRange
  image: string
  affiliateLinks: AffiliateLinks
  featured: boolean
  seasonality?: string[]
  address: string
  hours?: string
  content?: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  image: string
  category: string
  content?: string
}
