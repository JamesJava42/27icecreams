import type { Metadata } from "next"
import { FLAVORS } from "@/lib/flavors"
import TrailTracker from "@/components/TrailTracker"
import EmailCapture from "@/components/EmailCapture"

export const metadata: Metadata = {
  title: "The 69 List — California's Best Ice Cream Flavors",
  description:
    "69 of California's most iconic ice cream flavors, curated by taste. Check off each one as you try them — no account needed.",
}

export default function TrailPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          The Golden Scoop
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">
          The 69 List
        </h1>
        <p className="text-[#5C3317] leading-relaxed">
          California&#39;s 69 best ice cream flavors, curated by taste — not hype. Check off
          each one as you try it. Your progress is saved in your browser, no account needed.
          Earn badges at 10, 35, and all 69.
        </p>
      </div>

      <TrailTracker flavors={FLAVORS} />

      <div className="mt-12">
        <EmailCapture
          title="Get the Golden Picks"
          description="New flavors added to the list, seasonal drops, and the best California ice cream finds — straight to your inbox."
        />
      </div>
    </div>
  )
}
