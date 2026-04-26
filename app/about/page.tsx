import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, IceCream } from "lucide-react"
import { getAllShops } from "@/lib/shops"
import { FLAVORS } from "@/lib/flavors"

export const metadata: Metadata = {
  title: "About — The Golden Scoop",
  description:
    "The story behind The Golden Scoop — California's 69 best ice cream flavors, curated by taste. No chains, no hype, just the real stuff.",
}

export default function AboutPage() {
  const shops = getAllShops()
  const cities = new Set(shops.map((s) => s.city)).size
  const oldest = shops.reduce(
    (min, s) => (s.yearFounded && s.yearFounded < min ? s.yearFounded : min),
    9999
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      {/* Brand mark */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-12 h-12 rounded-2xl bg-[#FFF0F3] flex items-center justify-center">
          <IceCream className="w-6 h-6 text-[#E85D75]" />
        </div>
        <div>
          <p className="font-serif text-xl font-bold text-[#2C1A0E]">The Golden Scoop</p>
          <p className="text-sm text-[#8B5E3C]">California&#39;s 69 best ice cream flavors</p>
        </div>
      </div>

      <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-6 leading-tight">
        What Is The Golden Scoop?
      </h1>

      <div className="prose max-w-none text-[#5C3317] text-base leading-relaxed space-y-5 mb-12">
        <p>
          The Golden Scoop is a free, curated guide to {FLAVORS.length} of the most iconic ice cream
          flavors across California — organized not by shop, but by the scoop itself. We cover {cities} cities,
          from a 130-year-old Oakland parlor that opened in {oldest} to liquid nitrogen
          creameries born from food-science labs. No chains, no franchise soft-serve. Just the real stuff.
        </p>
        <p>
          Most ice cream guides tell you where to go. We tell you exactly what to order when you get there.
          Every flavor on the list was chosen for a specific reason — a technique, an origin story, an
          ingredient sourced from somewhere you can actually visit. The price is real. The description
          is honest.
        </p>
        <p>
          California is the most diverse ice cream state in the country. Persian bastani in Los
          Angeles. Filipino ube in Alhambra. Organic soft serve on a Marin County dairy farm.
          A $2.50 Thrifty scoop that&#39;s been the same since 1940. The Golden Scoop covers all
          of it — because the best ice cream in California doesn&#39;t fit one category.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { value: `${FLAVORS.length}`, label: "Curated Flavors" },
          { value: `${shops.length}`, label: "Iconic Shops" },
          { value: `${cities}`, label: "Cities Covered" },
        ].map(({ value, label }) => (
          <div key={label} className="bg-[#F2E8DC] rounded-2xl p-5 text-center">
            <p className="font-serif text-3xl font-bold text-[#E85D75]">{value}</p>
            <p className="text-xs text-[#8B5E3C] mt-1 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* What we cover */}
      <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-4">Where We Go</h2>
      <div className="space-y-3 mb-12">
        {[
          {
            title: "Northern California",
            body: "San Francisco's Mission District creameries, Oakland's 130-year-old institutions, Santa Cruz's farm-sourced scoops, Sonoma's wine-country flavors, and Lake Tahoe at altitude.",
          },
          {
            title: "Southern California",
            body: "Los Angeles' multicultural cones — Persian, Filipino, Mexican — Santa Monica's artisan creameries, San Diego's border-country ice cream, Palm Springs' Sicilian gelato, and the $2.50 California classic.",
          },
        ].map(({ title, body }) => (
          <div key={title} className="bg-white border border-[#E0CEBC] rounded-2xl p-5">
            <h3 className="font-semibold text-[#2C1A0E] mb-1">{title}</h3>
            <p className="text-sm text-[#5C3317] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* How to use */}
      <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-4">How to Use It</h2>
      <div className="space-y-3 mb-12">
        {[
          {
            step: "01",
            title: "Start with The 69 List",
            body: "Browse all 69 flavors organized by region. Filter by shop, city, or flavor vibe. Check off each one as you try it — no account needed.",
          },
          {
            step: "02",
            title: "Find Your Match",
            body: "Use the craving quiz to get 3 personalized shop recommendations based on your mood, location, and dietary preference. Takes under a minute.",
          },
          {
            step: "03",
            title: "Plan Your Visit",
            body: "Open the interactive map to see all shops pinned by region. Perfect for road trips, city days, or finding what's actually nearby.",
          },
        ].map(({ step, title, body }) => (
          <div key={step} className="flex gap-4 bg-white border border-[#E0CEBC] rounded-2xl p-5">
            <span className="font-serif text-2xl font-bold text-[#E85D75] shrink-0 leading-none mt-0.5">
              {step}
            </span>
            <div>
              <h3 className="font-semibold text-[#2C1A0E] mb-1">{title}</h3>
              <p className="text-sm text-[#5C3317] leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#2C1A0E] rounded-2xl p-8 text-center">
        <h2 className="font-serif text-2xl font-bold text-white mb-2">
          Find the scoop worth crossing the state for.
        </h2>
        <p className="text-[#B09A8A] text-sm mb-6">
          {FLAVORS.length} flavors. {shops.length} shops. {cities} cities. All free to explore.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/trail"
            className="inline-flex items-center gap-2 bg-[#E85D75] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#d14d65] transition-colors"
          >
            See The 69 List
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
          >
            Find My Scoop
          </Link>
        </div>
      </div>
    </div>
  )
}
