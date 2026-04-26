import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { getAllShops } from "@/lib/shops"
import ShopCard from "@/components/ShopCard"
import ShopFiltersWrapper from "@/components/ShopFiltersWrapper"
import { CRAVING_OPTIONS } from "@/lib/cravings"
import type { IceCreamItem, Category, Vibe } from "@/lib/types"

export const metadata: Metadata = {
  title: "Explore All Shops — The Golden Scoop",
  description:
    "Browse all 27 Golden Scoop shops across California. Search by flavor, filter by region and vibe, and sort to find your perfect scoop.",
}

interface Props {
  searchParams: Promise<{
    region?: string
    category?: string
    vibe?: string
    q?: string
    sort?: string
  }>
}

function sortShops(shops: IceCreamItem[], sortBy: string): IceCreamItem[] {
  const copy = [...shops]
  if (sortBy === "az") {
    return copy.sort((a, b) => a.shop.localeCompare(b.shop))
  }
  if (sortBy === "oldest") {
    return copy.sort((a, b) => (a.yearFounded || 9999) - (b.yearFounded || 9999))
  }
  if (sortBy === "iconic") {
    const order = ["Historic", "Classic", "Cult", "Modern"]
    return copy.sort((a, b) => {
      const aScore = Math.min(...a.category.map((c) => order.indexOf(c)).filter((i) => i >= 0), 99)
      const bScore = Math.min(...b.category.map((c) => order.indexOf(c)).filter((i) => i >= 0), 99)
      return aScore - bScore
    })
  }
  // featured (default): featured first
  return copy.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
}

export default async function ShopsPage({ searchParams }: Props) {
  const params = await searchParams
  const { region, category, vibe, q, sort = "featured" } = params

  const all = getAllShops()

  const filtered = all.filter((shop) => {
    if (region && shop.region !== region) return false
    if (category && !shop.category.includes(category as Category)) return false
    if (vibe && !shop.vibes.includes(vibe as Vibe)) return false
    if (q) {
      const ql = q.toLowerCase()
      const hit =
        shop.shop.toLowerCase().includes(ql) ||
        shop.name.toLowerCase().includes(ql) ||
        shop.city.toLowerCase().includes(ql) ||
        shop.description.toLowerCase().includes(ql) ||
        shop.vibes.some((v) => v.toLowerCase().includes(ql))
      if (!hit) return false
    }
    return true
  })

  const sorted = sortShops(filtered, sort)
  const hasFilters = region || category || vibe || q

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          Craving-Based Discovery
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">
          Find Your Scoop
        </h1>
        <p className="text-[#5C3317]">
          {all.length} iconic California shops. Filter by craving, region, or vibe to find your match.
        </p>
      </div>

      {/* Quick craving chips */}
      <div className="mb-8 pb-6 border-b border-[#E0CEBC]">
        <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-3">Quick Craving</p>
        <div className="flex flex-wrap gap-2">
          {CRAVING_OPTIONS.map(({ label, emoji, vibe: chipVibe }) => (
            <Link
              key={chipVibe}
              href={`/shops?vibe=${chipVibe}`}
              className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-all ${
                vibe === chipVibe
                  ? "bg-[#E85D75] text-white border-[#E85D75]"
                  : "bg-white text-[#5C3317] border-[#E0CEBC] hover:border-[#E85D75] hover:text-[#E85D75]"
              }`}
            >
              <span>{emoji}</span>
              {label}
            </Link>
          ))}
          {vibe && (
            <Link
              href="/shops"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border border-[#E0CEBC] bg-[#F2E8DC] text-[#8B5E3C] hover:border-[#E85D75] transition-all"
            >
              ✕ Clear
            </Link>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <h2 className="font-semibold text-[#2C1A0E] mb-4">Filter &amp; Sort</h2>
            <Suspense fallback={null}>
              <ShopFiltersWrapper />
            </Suspense>
          </div>
        </aside>

        {/* Grid */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-[#8B5E3C]">
              {sorted.length} of {all.length} shops
              {hasFilters ? " (filtered)" : ""}
            </p>
          </div>

          {sorted.length === 0 ? (
            <div className="text-center py-20 text-[#8B5E3C]">
              <p className="text-5xl mb-4">🍦</p>
              <p className="font-serif text-xl font-bold text-[#2C1A0E] mb-2">No shops match</p>
              <p className="text-sm">Try clearing some filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {sorted.map((shop: IceCreamItem) => (
                <ShopCard key={shop.slug} shop={shop} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
