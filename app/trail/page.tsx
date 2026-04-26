import type { Metadata } from "next"
import { getAllShops } from "@/lib/shops"
import TrailTracker from "@/components/TrailTracker"
import EmailCapture from "@/components/EmailCapture"

export const metadata: Metadata = {
  title: "Shop Tracker — California Ice Cream Trail",
  description: "Track every California ice cream shop you've visited. Mark shops, earn badges, and share your progress — no account needed.",
}

export default function TrailPage() {
  const shops = getAllShops()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          Your Progress
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">
          Shop Tracker
        </h1>
        <p className="text-[#5C3317] leading-relaxed">
          Check off each shop as you visit. Saved in your browser — no account needed.
          Earn badges at 5, 15, and all {shops.length} shops.
        </p>
      </div>

      <TrailTracker shops={shops} />

      <div className="mt-12">
        <EmailCapture
          title="Get Craving Alerts"
          description="New shop additions, seasonal flavor drops, and the best California ice cream finds — straight to your inbox."
        />
      </div>
    </div>
  )
}
