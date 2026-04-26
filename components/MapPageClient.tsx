"use client"

import { useState } from "react"
import Link from "next/link"
import MapViewClient from "@/components/MapViewClient"
import type { IceCreamItem } from "@/lib/types"

const REGION_LABELS: Record<string, string> = {
  NorCal: "Northern CA",
  SoCal: "Southern CA",
  Central: "Central Valley",
}

const REGION_COLORS: Record<string, string> = {
  NorCal: "#22c55e",
  SoCal: "#f97316",
  Central: "#f59e0b",
}

interface Props {
  shops: IceCreamItem[]
}

export default function MapPageClient({ shops }: Props) {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const visible = activeRegion ? shops.filter((s) => s.region === activeRegion) : shops

  const byRegion = ["NorCal", "SoCal", "Central"].map((region) => ({
    region,
    shops: visible.filter((s) => s.region === region),
  }))

  return (
    <>
      {/* Filter + legend row */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <button
          onClick={() => setActiveRegion(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            activeRegion === null
              ? "bg-[#2C1A0E] text-white border-[#2C1A0E]"
              : "bg-white text-[#5C3317] border-[#E0CEBC] hover:border-[#2C1A0E]"
          }`}
        >
          All {shops.length}
        </button>
        {Object.entries(REGION_LABELS).map(([region, label]) => {
          const count = shops.filter((s) => s.region === region).length
          const active = activeRegion === region
          return (
            <button
              key={region}
              onClick={() => setActiveRegion(active ? null : region)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                active
                  ? "text-white border-transparent"
                  : "bg-white text-[#5C3317] border-[#E0CEBC] hover:border-[#8B5E3C]"
              }`}
              style={active ? { background: REGION_COLORS[region], borderColor: REGION_COLORS[region] } : {}}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: REGION_COLORS[region] }}
              />
              {label}
              <span className={`text-xs font-bold ${active ? "text-white/80" : "text-[#8B5E3C]"}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Map */}
      <MapViewClient shops={visible} />

      {/* Shop list grouped by region */}
      <div className="mt-12 space-y-8">
        {byRegion
          .filter(({ shops: s }) => s.length > 0)
          .map(({ region, shops: regionShops }) => (
            <div key={region}>
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: REGION_COLORS[region] }}
                />
                <h2 className="font-serif text-2xl font-bold text-[#2C1A0E]">
                  {region === "NorCal"
                    ? "Northern California"
                    : region === "SoCal"
                    ? "Southern California"
                    : "Central Valley"}
                </h2>
                <span className="text-sm text-[#8B5E3C]">({regionShops.length})</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {regionShops.map((shop) => (
                  <Link
                    key={shop.slug}
                    href={`/shops/${shop.slug}`}
                    className="flex items-start gap-3 bg-white border border-[#E0CEBC] hover:border-[#E85D75] rounded-xl p-4 transition-colors group"
                  >
                    <span
                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                      style={{ background: REGION_COLORS[shop.region] }}
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors truncate">
                        {shop.shop}
                      </p>
                      <p className="text-xs text-[#8B5E3C] truncate">{shop.name}</p>
                      <p className="text-xs text-[#B09A8A]">{shop.city}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
