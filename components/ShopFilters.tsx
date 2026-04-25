"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

const regions = ["NorCal", "SoCal", "Central"]
const categories = ["Classic", "Cult", "Modern", "Historic"]
const vibes = ["fruity", "chocolate", "nutty", "unique", "dairy-free", "floral", "savory-sweet"]

export default function ShopFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const region = searchParams.get("region") || ""
  const category = searchParams.get("category") || ""
  const vibe = searchParams.get("vibe") || ""

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (params.get(key) === value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      router.push(`/shops?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const clearAll = () => router.push("/shops", { scroll: false })

  const hasFilters = region || category || vibe

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-2">Region</p>
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => update("region", r)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                region === r
                  ? "bg-[#E85D75] text-white border-[#E85D75]"
                  : "bg-white text-[#5C3317] border-[#E0CEBC] hover:border-[#E85D75]"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-2">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => update("category", c)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                category === c
                  ? "bg-[#5C3317] text-white border-[#5C3317]"
                  : "bg-white text-[#5C3317] border-[#E0CEBC] hover:border-[#5C3317]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-2">Vibe</p>
        <div className="flex flex-wrap gap-2">
          {vibes.map((v) => (
            <button
              key={v}
              onClick={() => update("vibe", v)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border capitalize ${
                vibe === v
                  ? "bg-[#F4845F] text-white border-[#F4845F]"
                  : "bg-white text-[#5C3317] border-[#E0CEBC] hover:border-[#F4845F]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button
          onClick={clearAll}
          className="text-sm text-[#8B5E3C] underline hover:text-[#E85D75]"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
