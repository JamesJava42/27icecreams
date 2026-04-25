import Link from "next/link"
import { Map, Trophy, HelpCircle, BookOpen, ArrowRight, Star, Clock, Leaf, Zap } from "lucide-react"
import { getFeaturedShops, getAllShops } from "@/lib/shops"
import { getAllBlogPosts } from "@/lib/blog"
import ShopCard from "@/components/ShopCard"
import EmailCapture from "@/components/EmailCapture"
import type { IceCreamItem } from "@/lib/types"

function getScoopOfTheDay() {
  const all = getAllShops()
  const start = new Date(new Date().getFullYear(), 0, 0).getTime()
  const dayOfYear = Math.floor((Date.now() - start) / 86400000)
  return all[dayOfYear % all.length]
}

// City data: each entry pins the "hero flavor" to show visitors what's famous there
const CITY_HIGHLIGHTS = [
  {
    city: "San Francisco",
    emoji: "🌉",
    iconicFlavor: "Salted Caramel",
    iconicShop: "Bi-Rite Creamery",
    slug: "bi-rite-creamery",
    why: "Ground zero for CA's artisan ice cream revolution",
  },
  {
    city: "Los Angeles",
    emoji: "🌴",
    iconicFlavor: "Rosewater Saffron Pistachio",
    iconicShop: "Mashti Malone's",
    slug: "mashti-malones",
    why: "Persian bastani, cult shops & century-old parlors",
  },
  {
    city: "Oakland",
    emoji: "🦁",
    iconicFlavor: "Black & Tan Sundae",
    iconicShop: "Fentons Creamery",
    slug: "fentons-creamery",
    why: "Est. 1894 — the Pixar ice cream shop, for real",
  },
  {
    city: "Santa Cruz",
    emoji: "🏄",
    iconicFlavor: "Lavender Honey",
    iconicShop: "Penny Ice Creamery",
    slug: "penny-ice-creamery",
    why: "Farm-sourced, hyper-seasonal, deeply local",
  },
  {
    city: "Santa Barbara",
    emoji: "☀️",
    iconicFlavor: "Eureka Lemon & Marionberries",
    iconicShop: "McConnell's Fine Ice Creams",
    slug: "mcconnells-fine-ice-creams",
    why: "Channel Islands dairy, hand-churned since 1949",
  },
  {
    city: "San Diego",
    emoji: "🌊",
    iconicFlavor: "Horchata",
    iconicShop: "Mariposa Ice Cream",
    slug: "mariposa-ice-cream",
    why: "Mexican-inspired flavors in the sunniest city in CA",
  },
  {
    city: "Palm Springs",
    emoji: "🌵",
    iconicFlavor: "Sicilian Pistachio Gelato",
    iconicShop: "Gelato Paradiso",
    slug: "gelato-paradiso",
    why: "Imported Bronte pistachio paste in the desert",
  },
  {
    city: "Sacramento",
    emoji: "🌾",
    iconicFlavor: "Honey Bourbon Pecan",
    iconicShop: "Big Dipper Creamery",
    slug: "big-dipper-creamery",
    why: "Farm-to-scoop in California's agricultural heartland",
  },
  {
    city: "Lake Tahoe",
    emoji: "⛷️",
    iconicFlavor: "Brown Butter Cookie Dough",
    iconicShop: "Tahoe Blue Cow",
    slug: "tahoe-blue-cow",
    why: "Ice cream at 6,300 ft — best après-ski tradition",
  },
]

export default function Home() {
  const featured = getFeaturedShops().slice(0, 6)
  const all = getAllShops()
  const total = all.length
  const posts = getAllBlogPosts().slice(0, 3)
  const scoop = getScoopOfTheDay()

  // Compute shop count per city for the city cards
  const shopsByCity = all.reduce<Record<string, number>>((acc, s) => {
    acc[s.city] = (acc[s.city] || 0) + 1
    return acc
  }, {})

  // Oldest shop year for the stats strip
  const oldest = all.reduce((min: number, s: IceCreamItem) =>
    s.yearFounded && s.yearFounded < min ? s.yearFounded : min, 9999)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C1A0E] via-[#5C3317] to-[#8B5E3C]">
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-8xl">🍦</div>
          <div className="absolute top-32 right-20 text-6xl">🍨</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">🍧</div>
          <div className="absolute bottom-20 right-10 text-5xl">🥄</div>
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E85D75] text-white text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider">
            <Star className="w-3 h-3 fill-current" />
            {total} Essential Stops · 9 Cities
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight mb-6">
            The California<br />
            <span style={{ color: "#F9A8B7" }}>Ice Cream Trail</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#D0B8A8] max-w-2xl mx-auto mb-10 leading-relaxed">
            From a 130-year-old Oakland parlor to Hollywood&#39;s Persian bastani to liquid nitrogen
            creameries — the {total} most iconic scoops in the Golden State, mapped and ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shops"
              className="inline-flex items-center gap-2 bg-[#E85D75] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-[#d14d65] transition-colors"
            >
              Start the Trail
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 text-white border border-white/30 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-colors"
            >
              <Map className="w-5 h-5" />
              View Map
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#2C1A0E]">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { value: `${total}`, label: "Iconic Stops" },
            { value: `${Object.keys(shopsByCity).length}`, label: "Cities Covered" },
            { value: `${oldest}`, label: "Oldest Shop Founded" },
            { value: "Free", label: "To Use & Explore" },
          ].map(({ value, label }) => (
            <div key={label} className="py-2">
              <p className="font-serif text-3xl font-bold text-[#E85D75]">{value}</p>
              <p className="text-xs text-[#B09A8A] mt-1 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scoop of the Day */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div
          className="border rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
          style={{ background: "linear-gradient(to right, #FFF0F3, #FDDDD4)", borderColor: "#F9A8B7" }}
        >
          <div className="text-6xl shrink-0">🍦</div>
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs font-bold text-[#E85D75] uppercase tracking-wider mb-1">
              Scoop of the Day
            </p>
            <h2 className="font-serif text-2xl font-bold text-[#2C1A0E]">{scoop.name}</h2>
            <p className="text-[#5C3317] text-sm">
              {scoop.shop} · {scoop.city}
            </p>
          </div>
          <Link
            href={`/shops/${scoop.slug}`}
            className="shrink-0 inline-flex items-center gap-2 bg-[#E85D75] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#d14d65] transition-colors"
          >
            See the scoop
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { href: "/trail", icon: Trophy, label: "Trail Tracker", desc: "Mark shops as visited" },
            { href: "/map", icon: Map, label: "Interactive Map", desc: "All 27 stops on one map" },
            { href: "/quiz", icon: HelpCircle, label: "Flavor Quiz", desc: "Find your perfect scoop" },
            { href: "/blog", icon: BookOpen, label: "Trail Blog", desc: "City guides & routes" },
          ].map(({ href, icon: Icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="bg-white border border-[#E0CEBC] hover:border-[#E85D75] rounded-2xl p-5 flex flex-col items-center text-center gap-2 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-[#FFF0F3] flex items-center justify-center mb-1">
                <Icon className="w-6 h-6 text-[#E85D75]" />
              </div>
              <p className="font-semibold text-[#2C1A0E] text-sm group-hover:text-[#E85D75] transition-colors">
                {label}
              </p>
              <p className="text-xs text-[#8B5E3C]">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BROWSE BY CITY ── */}
      <section className="bg-[#F2E8DC] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-2">
              Find Your City
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#2C1A0E]">
              Famous Ice Cream by City
            </h2>
            <p className="text-[#5C3317] text-sm mt-2 max-w-lg mx-auto">
              Every city on the Trail has at least one iconic scoop worth crossing town for.
              Here&#39;s the one flavor that defines each stop.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CITY_HIGHLIGHTS.map(({ city, emoji, iconicFlavor, iconicShop, slug, why }) => {
              const count = shopsByCity[city] || 1
              return (
                <Link
                  key={city}
                  href={`/shops/${slug}`}
                  className="group bg-white border border-[#E0CEBC] hover:border-[#E85D75] hover:shadow-md rounded-2xl p-5 transition-all"
                >
                  {/* City header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{emoji}</span>
                      <h3 className="font-serif text-lg font-bold text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors">
                        {city}
                      </h3>
                    </div>
                    <span className="text-xs font-bold bg-[#F2E8DC] text-[#5C3317] px-2.5 py-1 rounded-full whitespace-nowrap">
                      {count} {count === 1 ? "stop" : "stops"}
                    </span>
                  </div>

                  {/* Must-try flavor callout */}
                  <div className="bg-gradient-to-r from-[#FFF0F3] to-[#FDDDD4] border border-[#F9A8B7] rounded-xl px-4 py-3 mb-3">
                    <p className="text-xs font-bold text-[#E85D75] uppercase tracking-wide mb-0.5">
                      Must-Try Flavor
                    </p>
                    <p className="font-semibold text-[#2C1A0E] text-sm leading-snug">{iconicFlavor}</p>
                    <p className="text-xs text-[#8B5E3C]">@ {iconicShop}</p>
                  </div>

                  {/* Why this city */}
                  <p className="text-xs text-[#8B5E3C] leading-relaxed">{why}</p>

                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#E85D75]">
                    See the scoop
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/shops"
              className="inline-flex items-center gap-2 bg-[#2C1A0E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5C3317] transition-colors"
            >
              Browse all {total} stops
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY THE TRAIL? (attraction section) ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-2">
            Why Use the Trail?
          </p>
          <h2 className="font-serif text-3xl font-bold text-[#2C1A0E]">
            California&#39;s Ice Cream — Organized for You
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Clock,
              title: "130+ Years of History",
              body:
                "From Fentons in 1894 to liquid nitrogen startups in 2013 — the Trail spans every era of California ice cream culture. No other guide covers the full arc.",
              accent: "#E85D75",
            },
            {
              icon: Leaf,
              title: "From the Farm, Not a Factory",
              body:
                "Every shop on the Trail sources real ingredients: Straus organic dairy, Brentwood peaches, Bronte pistachios, Iranian saffron. Know what you're eating.",
              accent: "#22c55e",
            },
            {
              icon: Zap,
              title: "Instant Personalization",
              body:
                "Take the 4-question Flavor Quiz and get 3 shops matched to your exact taste. Or filter by city, vibe, or category — find the perfect scoop in seconds.",
              accent: "#f97316",
            },
          ].map(({ icon: Icon, title, body, accent }) => (
            <div
              key={title}
              className="bg-white border border-[#E0CEBC] rounded-2xl p-6"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: `${accent}18` }}
              >
                <Icon className="w-6 h-6" style={{ color: accent }} />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#2C1A0E] mb-2">{title}</h3>
              <p className="text-sm text-[#5C3317] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Social-proof strip */}
        <div className="mt-10 bg-[#2C1A0E] rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-serif text-lg font-bold text-center sm:text-left">
            Ready to start your California Ice Cream adventure?
          </p>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/quiz"
              className="bg-[#E85D75] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#d14d65] transition-colors whitespace-nowrap"
            >
              Take the Quiz
            </Link>
            <Link
              href="/trail"
              className="bg-white/10 text-white border border-white/20 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors whitespace-nowrap"
            >
              Track the Trail
            </Link>
          </div>
        </div>
      </section>

      {/* Featured shops */}
      <section className="bg-[#F2E8DC] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
                Trail Highlights
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#2C1A0E]">Featured Stops</h2>
            </div>
            <Link
              href="/shops"
              className="flex items-center gap-1 text-sm font-semibold text-[#5C3317] hover:text-[#E85D75] transition-colors"
            >
              All {total} stops
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((shop) => (
              <ShopCard key={shop.slug} shop={shop} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog teaser */}
      {posts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold text-[#2C1A0E]">Trail Blog</h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-semibold text-[#5C3317] hover:text-[#E85D75] transition-colors"
            >
              All posts
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-[#E0CEBC] hover:border-[#E85D75] rounded-2xl overflow-hidden transition-colors"
              >
                <div className="h-36 bg-gradient-to-br from-[#F2E8DC] to-[#E0CEBC] flex items-center justify-center text-5xl opacity-60">
                  🍨
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold text-[#E85D75] uppercase tracking-wide mb-2">
                    {post.category}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#8B5E3C] mt-2 line-clamp-2">{post.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Email capture */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <EmailCapture />
      </section>
    </div>
  )
}
