import { Suspense } from "react"
import type { Metadata } from "next"
import { getAllShops } from "@/lib/shops"
import ShopCard from "@/components/ShopCard"
import ShopFilters from "@/components/ShopFilters"
import type { IceCreamItem, Category, Vibe } from "@/lib/types"

export const metadata: Metadata = {
  title: "All 27 Stops",
  description:
    "Browse all 27 stops on the California Ice Cream Trail. Filter by region, category, and flavor vibe to find your perfect scoop.",
}

interface Props {
  searchParams: Promise<{ region?: string; category?: string; vibe?: string; q?: string }>
}

export default async function ShopsPage({ searchParams }: Props) {
  const params = await searchParams
  const { region, category, vibe, q } = params

  const all = getAllShops()

  const filtered = all.filter((shop) => {
    if (region && shop.region !== region) return false
    if (category && !shop.category.includes(category as Category)) return false
    if (vibe && !shop.vibes.includes(vibe as Vibe)) return false
    if (q && !shop.name.toLowerCase().includes(q.toLowerCase()) &&
        !shop.shop.toLowerCase().includes(q.toLowerCase()) &&
        !shop.city.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  const hasFilters = region || category || vibe || q

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          The Trail
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">
          All {all.length} Stops
        </h1>
        <p className="text-[#5C3317]">
          Filter by region, category, or flavor vibe to plan your next scoop.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20">
            <h2 className="font-semibold text-[#2C1A0E] mb-4">Filter Stops</h2>
            <Suspense fallback={null}>
              <ShopFilters />
            </Suspense>
          </div>
        </aside>

        {/* Grid */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-[#8B5E3C]">
              {filtered.length} of {all.length} stops
              {hasFilters ? " (filtered)" : ""}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-[#8B5E3C]">
              <p className="text-5xl mb-4">🍦</p>
              <p className="font-serif text-xl font-bold text-[#2C1A0E] mb-2">No stops match</p>
              <p className="text-sm">Try clearing some filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((shop: IceCreamItem) => (
                <ShopCard key={shop.slug} shop={shop} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
