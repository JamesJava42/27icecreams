import type { Metadata } from "next"
import { getAllShops } from "@/lib/shops"
import MapPageClient from "@/components/MapPageClient"

export const metadata: Metadata = {
  title: "Interactive Map",
  description:
    "Explore all 27 Golden Scoop shops on an interactive California map. Filter by region and plan your route.",
}

export default function MapPage() {
  const shops = getAllShops()

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          Plan Your Visit
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">
          California Ice Cream Map
        </h1>
        <p className="text-[#5C3317]">
          All {shops.length} Golden Scoop shops across the state. Filter by region, then click any marker for details.
        </p>
      </div>

      <MapPageClient shops={shops} />
    </div>
  )
}
