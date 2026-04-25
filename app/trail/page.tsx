import type { Metadata } from "next"
import { getAllShops } from "@/lib/shops"
import TrailTracker from "@/components/TrailTracker"
import EmailCapture from "@/components/EmailCapture"

export const metadata: Metadata = {
  title: "Trail Tracker",
  description: "Track your progress on the California Ice Cream Trail. Mark shops you've visited, earn badges, and share your progress.",
}

export default function TrailPage() {
  const shops = getAllShops()

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          Your Journey
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">
          Trail Tracker
        </h1>
        <p className="text-[#5C3317] leading-relaxed">
          Check off each stop as you visit. Your progress is saved in your browser — no account needed.
          Earn a badge when you hit 5, 15, and all {shops.length} stops.
        </p>
      </div>

      <TrailTracker shops={shops} />

      <div className="mt-12">
        <EmailCapture
          title="Save Your Progress to Email"
          description="Get updates when new stops are added to the Trail, plus seasonal flavor alerts and road trip guides."
        />
      </div>
    </div>
  )
}
