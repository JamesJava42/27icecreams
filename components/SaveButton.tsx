"use client"

import { useSyncExternalStore } from "react"
import { Heart } from "lucide-react"
import { subscribeToSaved, getSavedSlugs, toggleSavedSlug } from "@/lib/saved"

interface Props {
  slug: string
}

export default function SaveButton({ slug }: Props) {
  const saved = useSyncExternalStore(
    subscribeToSaved,
    () => getSavedSlugs().includes(slug),
    () => false
  )

  return (
    <button
      onClick={() => toggleSavedSlug(slug)}
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
