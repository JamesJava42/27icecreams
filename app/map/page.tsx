import type { Metadata } from "next"
import { getAllShops } from "@/lib/shops"
import Link from "next/link"
import MapViewClient from "@/components/MapViewClient"

export const metadata: Metadata = {
  title: "Interactive Map",
  description: "Explore all 27 stops on the California Ice Cream Trail on an interactive map. Filter by region and plan your route.",
}

export default function MapPage() {
  const shops = getAllShops()

  const byRegion = {
    NorCal: shops.filter((s) => s.region === "NorCal"),
    SoCal: shops.filter((s) => s.region === "SoCal"),
    Central: shops.filter((s) => s.region === "Central"),
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          Navigate the Trail
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">
          California Ice Cream Map
        </h1>
        <p className="text-[#5C3317]">
          All {shops.length} stops across the state. Click any marker for details.
        </p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-5 text-sm">
        {[
          { region: "NorCal", color: "#22c55e", label: "Northern CA" },
          { region: "SoCal", color: "#f97316", label: "Southern CA" },
          { region: "Central", color: "#f59e0b", label: "Central Valley" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border-2 border-white shadow" style={{ background: color }} />
            <span className="text-[#5C3317]">{label}</span>
          </div>
        ))}
      </div>

      <MapViewClient shops={shops} />

      {/* Shop list below map */}
      <div className="mt-12 space-y-8">
        {(Object.entries(byRegion) as [string, typeof shops][]).map(([region, regionShops]) => (
          <div key={region}>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-4">
              {region === "NorCal" ? "Northern California" : region === "SoCal" ? "Southern California" : "Central Valley"}
              <span className="ml-2 text-base font-normal text-[#8B5E3C]">
                ({regionShops.length} stops)
              </span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {regionShops.map((shop) => (
                <Link
                  key={shop.slug}
                  href={`/shops/${shop.slug}`}
                  className="flex items-start gap-3 bg-white border border-[#E0CEBC] hover:border-[#E85D75] rounded-xl p-4 transition-colors group"
                >
                  <div className="text-2xl shrink-0">📍</div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors truncate">
                      {shop.shop}
                    </p>
                    <p className="text-xs text-[#8B5E3C] truncate">{shop.name}</p>
                    <p className="text-xs text-[#8B5E3C]">{shop.city}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
