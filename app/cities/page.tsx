import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { getAllShops, getAllCities, cityToSlug } from "@/lib/shops"
import type { IceCreamItem } from "@/lib/types"

export const metadata: Metadata = {
  title: "Ice Cream by City — California Ice Cream Trail",
  description:
    "Find the best ice cream shops in San Francisco, Los Angeles, Santa Cruz, and more California cities.",
}

export default function CitiesPage() {
  const all = getAllShops()
  const cities = getAllCities()

  const shopsByCity = all.reduce<Record<string, IceCreamItem[]>>((acc, s) => {
    acc[s.city] = [...(acc[s.city] || []), s]
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          Browse by City
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">Ice Cream by City</h1>
        <p className="text-[#5C3317]">
          {cities.length} California cities, each with at least one iconic stop on the Trail.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {cities.map((city) => {
          const shops = shopsByCity[city] || []
          const region = shops[0]?.region
          const regionLabel =
            region === "NorCal"
              ? "Northern CA"
              : region === "SoCal"
              ? "Southern CA"
              : "Central Valley"

          return (
            <Link
              key={city}
              href={`/cities/${cityToSlug(city)}`}
              className="group flex items-center gap-4 bg-white border border-[#E0CEBC] hover:border-[#E85D75] rounded-2xl p-5 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFF0F3] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#E85D75]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-lg font-bold text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors">
                  {city}
                </h2>
                <p className="text-sm text-[#8B5E3C]">
                  {shops.length} {shops.length === 1 ? "shop" : "shops"} · {regionLabel}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-[#D0B8A8] group-hover:text-[#E85D75] shrink-0 transition-colors" />
            </Link>
          )
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/shops"
          className="inline-flex items-center gap-2 bg-[#2C1A0E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5C3317] transition-colors text-sm"
        >
          Browse all shops
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
