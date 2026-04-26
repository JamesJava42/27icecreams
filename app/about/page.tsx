import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, IceCream } from "lucide-react"
import { getAllShops } from "@/lib/shops"

export const metadata: Metadata = {
  title: "About — California Ice Cream Trail",
  description:
    "The story behind the California Ice Cream Trail — 27 iconic shops, curated for serious ice cream lovers.",
}

export default function AboutPage() {
  const shops = getAllShops()
  const total = shops.length
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
          <p className="font-serif text-xl font-bold text-[#2C1A0E]">California Ice Cream Trail</p>
          <p className="text-sm text-[#8B5E3C]">A curated guide to California&#39;s finest scoops</p>
        </div>
      </div>

      <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-6 leading-tight">
        What Is the California Ice Cream Trail?
      </h1>

      <div className="prose max-w-none text-[#5C3317] text-base leading-relaxed space-y-5 mb-12">
        <p>
          The California Ice Cream Trail is a free, curated guide to {total} of the most iconic ice
          cream shops across the Golden State. We cover {cities} cities — from a 130-year-old Oakland
          parlor opened in {oldest} to liquid nitrogen creameries born from food-science labs. No
          chains, no franchise soft-serve. Just the real stuff.
        </p>
        <p>
          Each shop on the Trail was chosen for a reason. Some are famous for their history. Some for
          a single legendary flavor that earned a cult following. Some for sourcing ingredients you
          can actually trace back to the farm. Every listing includes a full editorial writeup, a
          &ldquo;Why It&#39;s On The Trail&rdquo; explanation, and practical information so you can
          plan a visit.
        </p>
        <p>
          The Trail is organized around shops — not just flavors. We believe the people, the place,
          and the story behind an ice cream shop is what makes it worth seeking out. A signature
          flavor is the entry point; the shop itself is the destination.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12">
        {[
          { value: `${total}`, label: "Shops on the Trail" },
          { value: `${cities}`, label: "Cities Covered" },
          { value: `${oldest}`, label: "Oldest Shop Est." },
        ].map(({ value, label }) => (
          <div key={label} className="bg-[#F2E8DC] rounded-2xl p-5 text-center">
            <p className="font-serif text-3xl font-bold text-[#E85D75]">{value}</p>
            <p className="text-xs text-[#8B5E3C] mt-1 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>

      {/* What we cover */}
      <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-4">What We Cover</h2>
      <div className="space-y-3 mb-12">
        {[
          {
            title: "Northern California",
            body: "San Francisco, Oakland, Sacramento, Santa Cruz, and the Bay Area artisan scene that changed ice cream nationally.",
          },
          {
            title: "Southern California",
            body: "Los Angeles, San Diego, Palm Springs — from Persian bastani to Mexican horchata ice cream to design-forward gelaterias.",
          },
          {
            title: "Central Valley",
            body: "Farm-to-scoop shops that work directly with the orchards and dairies that supply California's food system.",
          },
        ].map(({ title, body }) => (
          <div key={title} className="bg-white border border-[#E0CEBC] rounded-2xl p-5">
            <h3 className="font-semibold text-[#2C1A0E] mb-1">{title}</h3>
            <p className="text-sm text-[#5C3317] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      {/* How to use */}
      <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] mb-4">How to Use the Trail</h2>
      <div className="space-y-3 mb-12">
        {[
          {
            step: "01",
            title: "Explore Shops",
            body: 'Browse all 27 stops. Search by name, filter by region or vibe, sort by Featured or Oldest. Every shop page has the full story.',
          },
          {
            step: "02",
            title: "Plan Your Route",
            body: "Open the interactive map to see all shops pinned by region. Perfect for planning a road trip or a day in a new city.",
          },
          {
            step: "03",
            title: "Track Your Progress",
            body: "Use the Trail Tracker to mark shops as visited. Earn badges as you go. No account required — your progress saves locally.",
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
        <h2 className="font-serif text-2xl font-bold text-white mb-2">Ready to Explore?</h2>
        <p className="text-[#B09A8A] text-sm mb-6">
          {total} iconic shops. {cities} cities. One beautifully curated guide.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/shops"
            className="inline-flex items-center gap-2 bg-[#E85D75] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#d14d65] transition-colors"
          >
            Explore All Shops
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/map"
            className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
          >
            View the Map
          </Link>
        </div>
      </div>
    </div>
  )
}
