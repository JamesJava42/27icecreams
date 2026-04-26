"use client"

import { useState } from "react"
import { CheckCircle, Circle, Share2, Trophy } from "lucide-react"
import type { IceCreamItem } from "@/lib/types"

const STORAGE_KEY = "ca-ice-cream-trail-visited"

function readVisited(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch {
    return new Set()
  }
}

function getBadge(count: number, total: number) {
  if (count === total) return { emoji: "🌟", title: "Trail Master", color: "text-yellow-600" }
  if (count >= 15) return { emoji: "🍨", title: "Churner", color: "text-purple-600" }
  if (count >= 5) return { emoji: "🍦", title: "Scooper", color: "text-[#E85D75]" }
  return { emoji: "🥄", title: "Getting Started", color: "text-[#8B5E3C]" }
}

interface Props {
  shops: IceCreamItem[]
}

export default function TrailTracker({ shops }: Props) {
  const [visited, setVisited] = useState<Set<string>>(readVisited)
  const [shareMsg, setShareMsg] = useState("")

  function toggle(slug: string) {
    setVisited((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {}
      return next
    })
  }

  async function share() {
    const count = visited.size
    const total = shops.length
    const badge = getBadge(count, total)
    const text = `I've been to ${count} of ${total} iconic California ice cream shops! ${badge.emoji} ${badge.title} — californiaicecreamtrail.com/trail`
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

  const count = visited.size
  const total = shops.length
  const pct = Math.round((count / total) * 100)
  const badge = getBadge(count, total)

  const REGION_LABELS: Record<string, string> = {
    NorCal: "Northern California",
    SoCal: "Southern California",
    Central: "Central Valley",
  }

  const byRegion = {
    NorCal: shops.filter((s) => s.region === "NorCal"),
    SoCal: shops.filter((s) => s.region === "SoCal"),
    Central: shops.filter((s) => s.region === "Central"),
  }

  return (
    <div className="space-y-8">
      {/* Progress card */}
      <div className="bg-[#2C1A0E] text-white rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[#B09A8A] text-sm mb-1">Your progress</p>
            <h2 className="font-serif text-3xl font-bold">
              {count} <span className="text-[#E85D75]">/</span> {total}
            </h2>
            <p className={`text-sm font-semibold mt-1 ${badge.color}`}>
              {badge.emoji} {badge.title}
            </p>
          </div>
          <Trophy className="w-10 h-10 text-[#E85D75] opacity-60" />
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-[#3D2A1A] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E85D75] to-[#F4845F] rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-[#7A6050] mt-2">{pct}% of all California shops visited</p>

        <button
          onClick={share}
          className="mt-5 flex items-center gap-2 bg-[#E85D75] hover:bg-[#d14d65] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Share my progress
        </button>
        {shareMsg && <p className="text-xs text-[#B09A8A] mt-2">{shareMsg}</p>}
      </div>

      {/* Shop checklists by region */}
      {(Object.entries(byRegion) as [string, IceCreamItem[]][]).map(([region, regionShops]) => (
        <div key={region}>
          <h3 className="font-serif text-xl font-bold text-[#2C1A0E] mb-4 flex items-center gap-2">
            {REGION_LABELS[region]}
            <span className="text-sm font-normal text-[#8B5E3C]">
              {regionShops.filter((s) => visited.has(s.slug)).length}/{regionShops.length} visited
            </span>
          </h3>
          <div className="space-y-2">
            {regionShops.map((shop) => {
              const isVisited = visited.has(shop.slug)
              return (
                <div
                  key={shop.slug}
                  className={`flex items-center gap-3 p-4 rounded-xl border transition-colors cursor-pointer ${
                    isVisited
                      ? "bg-[#FFF0F3] border-[#F9A8B7]"
                      : "bg-white border-[#E0CEBC] hover:border-[#E85D75]"
                  }`}
                  onClick={() => toggle(shop.slug)}
                >
                  {isVisited ? (
                    <CheckCircle className="w-5 h-5 text-[#E85D75] shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-[#D0B8A8] shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-[#2C1A0E] truncate">{shop.shop}</p>
                    <p className="text-xs text-[#8B5E3C]">
                      {shop.name} · {shop.city}
                    </p>
                  </div>
                  <span className="text-xs text-[#8B5E3C] shrink-0">{shop.priceRange}</span>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export function useVisited() {
  const [visited] = useState<Set<string>>(readVisited)
  return visited
}
