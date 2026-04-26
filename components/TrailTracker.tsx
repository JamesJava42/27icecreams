"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle, Circle, Share2, Star, ArrowRight } from "lucide-react"
import type { IceCreamFlavor } from "@/lib/flavors"

const STORAGE_KEY = "ca-gs-tried"

function readTried(): Set<number> {
  if (typeof window === "undefined") return new Set()
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

function getBadge(count: number) {
  if (count >= 69) return { emoji: "🌟", title: "Golden", color: "text-yellow-500" }
  if (count >= 35) return { emoji: "🍨", title: "Connoisseur", color: "text-purple-600" }
  if (count >= 10) return { emoji: "🍦", title: "Taster", color: "text-[#E85D75]" }
  return { emoji: "🥄", title: "Getting Started", color: "text-[#8B5E3C]" }
}

const REGION_LABELS: Record<string, string> = {
  NorCal: "Northern California",
  SoCal: "Southern California",
}

const REGION_DESCRIPTIONS: Record<string, string> = {
  NorCal: "SF Mission creameries, Oakland classics, Santa Cruz farm-sourced, Lake Tahoe altitude scoops.",
  SoCal: "LA's multicultural cones, San Diego's border-country flavors, Palm Springs gelato, and the $2.50 California institution.",
}

const VIBE_COLORS: Record<string, string> = {
  fruity: "bg-pink-100 text-pink-800",
  chocolate: "bg-amber-100 text-amber-900",
  nutty: "bg-yellow-100 text-yellow-800",
  unique: "bg-purple-100 text-purple-800",
  floral: "bg-rose-100 text-rose-700",
  "dairy-free": "bg-emerald-100 text-emerald-800",
  "savory-sweet": "bg-orange-100 text-orange-800",
}

interface Props {
  flavors: IceCreamFlavor[]
}

export default function TrailTracker({ flavors }: Props) {
  const [tried, setTried] = useState<Set<number>>(readTried)
  const [shareMsg, setShareMsg] = useState("")
  const [search, setSearch] = useState("")

  function toggle(id: number) {
    setTried((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {}
      return next
    })
  }

  async function share() {
    const count = tried.size
    const badge = getBadge(count)
    const text = `I've tried ${count} of California's 69 best ice cream flavors! ${badge.emoji} ${badge.title} — thegoldenscoop.com/trail`
    try {
      if (navigator.share) {
        await navigator.share({ text, url: "https://californiaicecreamtrail.com/trail" })
      } else {
        await navigator.clipboard.writeText(text)
        setShareMsg("Copied to clipboard!")
        setTimeout(() => setShareMsg(""), 3000)
      }
    } catch {}
  }

  const count = tried.size
  const total = flavors.length
  const pct = Math.round((count / total) * 100)
  const badge = getBadge(count)

  const filtered = search.trim()
    ? flavors.filter(
        (f) =>
          f.name.toLowerCase().includes(search.toLowerCase()) ||
          f.shop.toLowerCase().includes(search.toLowerCase()) ||
          f.city.toLowerCase().includes(search.toLowerCase()) ||
          f.vibes.some((v) => v.includes(search.toLowerCase()))
      )
    : flavors

  const byRegion: Record<string, IceCreamFlavor[]> = {
    NorCal: filtered
      .filter((f) => f.region === "NorCal")
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)),
    SoCal: filtered
      .filter((f) => f.region === "SoCal")
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)),
  }

  return (
    <div className="space-y-10">
      {/* Progress card */}
      <div className="bg-[#2C1A0E] text-white rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#B09A8A] text-sm mb-1">Your golden progress</p>
            <h2 className="font-serif text-3xl font-bold">
              {count} <span className="text-[#E85D75]">/</span> {total}
              <span className="text-lg font-normal text-[#B09A8A] ml-2">flavors tried</span>
            </h2>
            <p className={`text-sm font-semibold mt-1 ${badge.color}`}>
              {badge.emoji} {badge.title}
            </p>
          </div>
          <div className="text-5xl opacity-60">🍦</div>
        </div>

        <div className="h-3 bg-[#3D2A1A] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E85D75] to-[#F4845F] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-[#7A6050] mt-2">{pct}% of California&#39;s 69 best flavors tried</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={share}
            className="flex items-center gap-2 bg-[#E85D75] hover:bg-[#d14d65] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Share my progress
          </button>
        </div>
        {shareMsg && <p className="text-xs text-[#B09A8A] mt-2">{shareMsg}</p>}
      </div>

      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search flavors, shops, cities, vibes…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-[#E0CEBC] text-sm text-[#2C1A0E] placeholder-[#B09A8A] focus:outline-none focus:border-[#E85D75] bg-white"
        />
        {search && (
          <p className="text-xs text-[#8B5E3C] mt-2">
            {filtered.length} flavor{filtered.length !== 1 ? "s" : ""} match &ldquo;{search}&rdquo;
          </p>
        )}
      </div>

      {/* Region sections */}
      {(Object.entries(byRegion) as [string, IceCreamFlavor[]][]).map(([region, regionFlavors]) => {
        if (regionFlavors.length === 0) return null
        const regionTried = regionFlavors.filter((f) => tried.has(f.id)).length

        return (
          <section key={region}>
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#2C1A0E]">
                  {REGION_LABELS[region]}
                </h2>
                <p className="text-sm text-[#8B5E3C] mt-0.5">{REGION_DESCRIPTIONS[region]}</p>
              </div>
              <div className={`text-right shrink-0 ${regionTried === regionFlavors.length ? "text-[#E85D75]" : "text-[#8B5E3C]"}`}>
                <p className="text-lg font-bold font-serif">{regionTried}/{regionFlavors.length}</p>
                <p className="text-xs">tried</p>
              </div>
            </div>

            <div className="space-y-3">
              {regionFlavors.map((flavor) => {
                const isTried = tried.has(flavor.id)
                return (
                  <div
                    key={flavor.id}
                    className={`rounded-2xl border transition-colors ${
                      isTried
                        ? "bg-[#FFF0F3] border-[#F9A8B7]"
                        : "bg-white border-[#E0CEBC] hover:border-[#E85D75]"
                    }`}
                  >
                    <div className="flex items-start gap-3 p-4">
                      {/* Toggle */}
                      <button
                        onClick={() => toggle(flavor.id)}
                        aria-label={isTried ? "Mark as not tried" : "Mark as tried"}
                        className="mt-0.5 shrink-0"
                      >
                        {isTried ? (
                          <CheckCircle className="w-6 h-6 text-[#E85D75]" />
                        ) : (
                          <Circle className="w-6 h-6 text-[#D0B8A8] hover:text-[#E85D75] transition-colors" />
                        )}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          {flavor.featured && (
                            <span className="inline-flex items-center gap-0.5 text-xs font-bold bg-[#E85D75] text-white px-2 py-0.5 rounded-full">
                              <Star className="w-3 h-3 fill-current" />
                              Golden Pick
                            </span>
                          )}
                          {flavor.vibes.slice(0, 2).map((v) => (
                            <span
                              key={v}
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${VIBE_COLORS[v] ?? "bg-gray-100 text-gray-700"}`}
                            >
                              {v}
                            </span>
                          ))}
                          <span className="text-xs text-[#B09A8A]">{flavor.city}</span>
                        </div>

                        <p className="font-serif font-bold text-[#2C1A0E] text-base leading-tight">
                          {flavor.name}
                        </p>
                        <p className="text-xs text-[#8B5E3C] mt-0.5 mb-1.5">
                          {flavor.shop} · <span className="font-bold text-[#E85D75]">{flavor.price}</span>
                        </p>
                        <p className="text-xs text-[#5C3317] leading-relaxed line-clamp-2">
                          {flavor.description}
                        </p>
                      </div>

                      {/* Link to shop */}
                      <Link
                        href={`/shops/${flavor.shopSlug}`}
                        aria-label={`View ${flavor.shop}`}
                        className="shrink-0 mt-0.5 text-[#D0B8A8] hover:text-[#E85D75] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-[#8B5E3C]">
                {regionFlavors.length - regionTried} flavors left in {REGION_LABELS[region]}
              </p>
              <Link
                href={`/shops?region=${region}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#E85D75] hover:underline"
              >
                Browse shops
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        )
      })}
    </div>
  )
}
