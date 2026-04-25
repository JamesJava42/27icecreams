import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import type { IceCreamItem } from "@/lib/types"

interface Props {
  shop: IceCreamItem
  visited?: boolean
}

const regionColors: Record<string, string> = {
  NorCal: "bg-emerald-100 text-emerald-800",
  SoCal: "bg-orange-100 text-orange-800",
  Central: "bg-amber-100 text-amber-800",
}

export default function ShopCard({ shop, visited }: Props) {
  return (
    <Link
      href={`/shops/${shop.slug}`}
      className={`group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-[#E0CEBC] relative ${
        visited ? "ring-2 ring-[#E85D75]" : ""
      }`}
    >
      {/* Image placeholder with gradient */}
      <div className="h-48 bg-gradient-to-br from-[#F2E8DC] to-[#E0CEBC] relative overflow-hidden flex items-center justify-center">
        <div className="text-6xl opacity-30">🍦</div>
        {shop.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#E85D75] text-white text-xs font-bold px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-current" />
            Featured
          </div>
        )}
        {visited && (
          <div className="absolute top-3 right-3 bg-[#E85D75] text-white text-xs font-bold px-2 py-1 rounded-full">
            ✓ Visited
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-xs font-semibold text-[#8B5E3C] uppercase tracking-wide mb-1">
              {shop.shop}
            </p>
            <h3 className="font-serif text-lg font-bold text-[#2C1A0E] leading-tight group-hover:text-[#E85D75] transition-colors">
              {shop.name}
            </h3>
          </div>
          <span className="text-sm font-bold text-[#8B5E3C] shrink-0">{shop.priceRange}</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-[#8B5E3C] mb-3">
          <MapPin className="w-3 h-3 shrink-0" />
          <span>{shop.city}, CA</span>
          <span className="mx-1">·</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${regionColors[shop.region]}`}>
            {shop.region}
          </span>
        </div>

        <p className="text-sm text-[#5C3317] line-clamp-2 leading-relaxed">
          {shop.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-1">
          {shop.category.map((cat) => (
            <span
              key={cat}
              className="text-xs bg-[#F2E8DC] text-[#5C3317] px-2 py-0.5 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
