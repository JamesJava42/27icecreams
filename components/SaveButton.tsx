"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

const STORAGE_KEY = "ca-ict-saved"

function readSaved(): string[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  } catch {
    return []
  }
}

interface Props {
  slug: string
}

export default function SaveButton({ slug }: Props) {
  const [saved, setSaved] = useState(() => readSaved().includes(slug))

  function toggle() {
    const current = readSaved()
    const next = saved ? current.filter((s) => s !== slug) : [...current, slug]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setSaved(!saved)
  }

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2 w-full justify-center py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all ${
        saved
          ? "bg-[#FFF0F3] border-[#E85D75] text-[#E85D75]"
          : "bg-white border-[#E0CEBC] text-[#5C3317] hover:border-[#E85D75] hover:text-[#E85D75]"
      }`}
      aria-label={saved ? "Remove from saved stops" : "Save this stop"}
    >
      <Heart className={`w-4 h-4 transition-all ${saved ? "fill-[#E85D75]" : ""}`} />
      {saved ? "Saved to My List" : "Save this Stop"}
    </button>
  )
}
