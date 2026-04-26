"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useRef } from "react"
import { Search } from "lucide-react"

const regions = ["NorCal", "SoCal", "Central"]
const categories = ["Classic", "Cult", "Modern", "Historic"]
const vibes = ["fruity", "chocolate", "nutty", "unique", "dairy-free", "floral", "savory-sweet"]

const sortOptions = [
  { value: "featured", label: "Featured First" },
  { value: "az", label: "A – Z" },
  { value: "oldest", label: "Oldest First" },
  { value: "iconic", label: "Most Iconic" },
]

export default function ShopFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const region = searchParams.get("region") || ""
  const category = searchParams.get("category") || ""
  const vibe = searchParams.get("vibe") || ""
  const sort = searchParams.get("sort") || "featured"
  const q = searchParams.get("q") || ""

  const inputRef = useRef<HTMLInputElement>(null)

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

  const updateSort = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === "featured") {
        params.delete("sort")
      } else {
        params.set("sort", value)
      }
      router.push(`/shops?${params.toString()}`, { scroll: false })
    },
    [router, searchParams]
  )

  const submitSearch = useCallback(() => {
    const value = inputRef.current?.value || ""
    const params = new URLSearchParams(searchParams.toString())
    if (value.trim()) {
      params.set("q", value.trim())
    } else {
      params.delete("q")
    }
    router.push(`/shops?${params.toString()}`, { scroll: false })
  }, [router, searchParams])

  const clearAll = () => {
    if (inputRef.current) inputRef.current.value = ""
    router.push("/shops", { scroll: false })
  }

  const hasFilters = region || category || vibe || q || sort !== "featured"

  return (
    <div className="space-y-5">
      {/* Search */}
      <div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B5E3C]" />
          <input
            key={q}
            ref={inputRef}
            type="text"
            placeholder="Search shops, flavors, cities…"
            defaultValue={q}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitSearch()
            }}
            onBlur={submitSearch}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E0CEBC] text-sm text-[#2C1A0E] placeholder-[#B09A8A] focus:outline-none focus:border-[#E85D75] bg-white"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-2">Sort By</p>
        <select
          value={sort}
          onChange={(e) => updateSort(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-[#E0CEBC] text-sm text-[#2C1A0E] bg-white focus:outline-none focus:border-[#E85D75]"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Region */}
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

      {/* Category */}
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

      {/* Vibe */}
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
