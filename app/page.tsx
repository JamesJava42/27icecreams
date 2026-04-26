import Link from "next/link"
import { Map, ArrowRight, Compass, ListChecks } from "lucide-react"
import { getFeaturedShops, getAllShops } from "@/lib/shops"
import { getAllBlogPosts } from "@/lib/blog"
import { CRAVING_OPTIONS } from "@/lib/cravings"
import { FLAVORS } from "@/lib/flavors"
import ShopCard from "@/components/ShopCard"
import EmailCapture from "@/components/EmailCapture"
import type { IceCreamItem } from "@/lib/types"

export default function Home() {
  const featured = getFeaturedShops().slice(0, 6)
  const all = getAllShops()
  const posts = getAllBlogPosts().slice(0, 3)
  const topFlavors = FLAVORS.filter((f) => f.featured).slice(0, 6)

  const shopsByCity = all.reduce<Record<string, number>>((acc, s) => {
    acc[s.city] = (acc[s.city] || 0) + 1
    return acc
  }, {})

  const oldest = all.reduce(
    (min: number, s: IceCreamItem) =>
      s.yearFounded && s.yearFounded < min ? s.yearFounded : min,
    9999
  )

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2C1A0E] via-[#5C3317] to-[#8B5E3C]">
        <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
          <div className="absolute top-10 left-10 text-8xl">🍦</div>
          <div className="absolute top-32 right-20 text-6xl">🍨</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">🍧</div>
          <div className="absolute bottom-20 right-10 text-5xl">🥄</div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider border border-white/20">
              69 Iconic Flavors · {Object.keys(shopsByCity).length} California Cities
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white leading-tight mb-4">
              Find the scoop worth<br />
              <span style={{ color: "#F9A8B7" }}>crossing the state for</span>
            </h1>
            <p className="text-[#D0B8A8] text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              California&#39;s 69 best ice cream flavors, curated by taste. From San
              Francisco&#39;s Mission District to San Diego&#39;s coast.
            </p>

            {/* Craving chips */}
            <div className="mb-8">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-semibold">
                What are you craving?
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {CRAVING_OPTIONS.map(({ label, emoji, vibe }) => (
                  <Link
                    key={vibe}
                    href={`/shops?vibe=${vibe}`}
                    className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-[#E85D75] border border-white/20 hover:border-[#E85D75] text-white text-sm font-medium px-4 py-2 rounded-full transition-all"
                  >
                    <span>{emoji}</span>
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 bg-[#E85D75] text-white px-7 py-3.5 rounded-2xl font-bold text-base hover:bg-[#d14d65] transition-colors"
              >
                <Compass className="w-5 h-5" />
                Find My Scoop
              </Link>
              <Link
                href="/trail"
                className="inline-flex items-center gap-2 text-white border border-white/30 px-7 py-3.5 rounded-2xl font-bold text-base hover:bg-white/10 transition-colors"
              >
                <ListChecks className="w-5 h-5" />
                The 69 List
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#2C1A0E]">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { value: "69", label: "Curated Flavors" },
            { value: `${all.length}`, label: "Iconic Shops" },
            { value: `${Object.keys(shopsByCity).length}`, label: "Cities Covered" },
            { value: `${oldest}`, label: "Oldest Shop Est." },
          ].map(({ value, label }) => (
            <div key={label} className="py-2">
              <p className="font-serif text-3xl font-bold text-[#E85D75]">{value}</p>
              <p className="text-xs text-[#B09A8A] mt-1 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TOP FLAVORS ── */}
      <section className="bg-[#F2E8DC] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
                The Golden Selection
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#2C1A0E]">Top Flavors on the List</h2>
            </div>
            <Link
              href="/trail"
              className="flex items-center gap-1 text-sm font-semibold text-[#5C3317] hover:text-[#E85D75] transition-colors"
            >
              See all 69
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topFlavors.map((flavor) => (
              <Link
                key={flavor.id}
                href={`/shops/${flavor.shopSlug}`}
                className="group bg-white border border-[#E0CEBC] hover:border-[#E85D75] rounded-2xl p-5 transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-bold text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors leading-tight">
                      {flavor.name}
                    </h3>
                    <p className="text-xs text-[#8B5E3C] mt-0.5">{flavor.shop} · {flavor.city}</p>
                  </div>
                  <span className="text-sm font-bold text-[#E85D75] shrink-0 ml-2">{flavor.price}</span>
                </div>
                <p className="text-sm text-[#5C3317] leading-relaxed line-clamp-2">{flavor.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#E85D75]">
                  See the shop
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED SHOPS ── */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
                The Shops
              </p>
              <h2 className="font-serif text-3xl font-bold text-[#2C1A0E]">Where to Find Them</h2>
            </div>
            <Link
              href="/shops"
              className="flex items-center gap-1 text-sm font-semibold text-[#5C3317] hover:text-[#E85D75] transition-colors"
            >
              All {all.length} shops
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

      {/* ── MAP PREVIEW ── */}
      <section className="bg-[#2C1A0E] py-14">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-2">
              Plan Your Visit
            </p>
            <h2 className="font-serif text-3xl font-bold text-white mb-3">
              All {all.length} Shops, One Map
            </h2>
            <p className="text-[#B09A8A] text-sm leading-relaxed max-w-md mb-6">
              Filter by region, see every shop pinned across Northern CA, Southern CA, and the
              Central Valley. Plan a road trip or find what&#39;s nearby.
            </p>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 bg-[#E85D75] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#d14d65] transition-colors"
            >
              <Map className="w-4 h-4" />
              Open the Map
            </Link>
          </div>
          <div className="w-full md:w-72 h-48 bg-[#3D2A1A] rounded-2xl flex items-center justify-center text-6xl opacity-50 shrink-0">
            🗺️
          </div>
        </div>
      </section>

      {/* ── THE 69 LIST PREVIEW ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-80 shrink-0">
            <div className="bg-white border border-[#E0CEBC] rounded-2xl p-6 space-y-3">
              <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider">Your Progress</p>
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-[#2C1A0E]">0 / 69</span>
                <span className="text-xs bg-[#F2E8DC] text-[#5C3317] px-2 py-1 rounded-full">Just starting</span>
              </div>
              <div className="w-full bg-[#F2E8DC] rounded-full h-2">
                <div className="bg-[#E85D75] h-2 rounded-full" style={{ width: "0%" }} />
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {["Taster", "Connoisseur", "Golden"].map((badge) => (
                  <div key={badge} className="bg-[#F2E8DC] rounded-xl p-2 text-center opacity-40">
                    <div className="text-2xl mb-1">🏅</div>
                    <p className="text-xs text-[#5C3317] font-semibold">{badge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-2">
              The 69 List
            </p>
            <h2 className="font-serif text-3xl font-bold text-[#2C1A0E] mb-3">
              Track Every Flavor You Try
            </h2>
            <p className="text-[#5C3317] text-sm leading-relaxed mb-6 max-w-md">
              69 of California&#39;s most iconic ice cream flavors. Check off each one as you try it,
              earn badges, and share your progress — no account needed.
            </p>
            <Link
              href="/trail"
              className="inline-flex items-center gap-2 bg-[#2C1A0E] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#5C3317] transition-colors"
            >
              <ListChecks className="w-4 h-4" />
              See The 69 List
            </Link>
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      {posts.length > 0 && (
        <section className="bg-[#F2E8DC] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
                  The Guide
                </p>
                <h2 className="font-serif text-3xl font-bold text-[#2C1A0E]">Stories & Guides</h2>
              </div>
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
          </div>
        </section>
      )}

      {/* ── NEWSLETTER ── */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <EmailCapture
          title="Get the Golden Picks"
          description="New flavors added to the list, seasonal drops, and the best California ice cream finds — delivered to your inbox."
        />
      </section>
    </div>
  )
}
