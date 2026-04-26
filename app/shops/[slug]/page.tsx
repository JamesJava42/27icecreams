import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { MapPin, Clock, Star, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getShopBySlug, getAllShopSlugs, getAllShops } from "@/lib/shops"
import AffiliateButton from "@/components/AffiliateButton"
import ShopCard from "@/components/ShopCard"
import SaveButton from "@/components/SaveButton"
import { LocalBusinessJsonLd } from "@/components/JsonLd"
import { getUseCaseTags } from "@/lib/cravings"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllShopSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const shop = getShopBySlug(slug)
  if (!shop) return {}
  return {
    title: `${shop.shop} — California Ice Cream Trail`,
    description: shop.description,
    openGraph: {
      title: `${shop.shop} | ${shop.city}, CA`,
      description: shop.description,
      type: "article",
    },
  }
}

const categoryColors: Record<string, string> = {
  Classic: "bg-blue-100 text-blue-800",
  Cult: "bg-purple-100 text-purple-800",
  Modern: "bg-emerald-100 text-emerald-800",
  Historic: "bg-amber-100 text-amber-800",
}

export default async function ShopDetailPage({ params }: Props) {
  const { slug } = await params
  const shop = getShopBySlug(slug)
  if (!shop) notFound()

  const related = getAllShops()
    .filter((s) => s.slug !== slug)
    .map((s) => {
      let score = 0
      const sharedVibes = s.vibes.filter((v) => shop.vibes.includes(v)).length
      const sharedCats = s.category.filter((c) => shop.category.includes(c)).length
      score += sharedVibes * 3
      score += sharedCats * 2
      if (s.region === shop.region) score += 1
      if (s.featured) score += 1
      return { shop: s, score }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.shop)

  return (
    <>
      <LocalBusinessJsonLd shop={shop} />

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          href="/shops"
          className="inline-flex items-center gap-2 text-sm text-[#8B5E3C] hover:text-[#E85D75] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all shops
        </Link>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <article className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {shop.featured && (
                  <span className="inline-flex items-center gap-1 bg-[#E85D75] text-white text-xs font-bold px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    Featured Stop
                  </span>
                )}
                {shop.category.map((cat) => (
                  <span key={cat} className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[cat]}`}>
                    {cat}
                  </span>
                ))}
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2C1A0E] leading-tight mb-2">
                {shop.shop}
              </h1>
              <p className="text-[#E85D75] font-semibold text-lg mb-4">
                Signature Flavor: {shop.name}
              </p>

              <p className="text-lg text-[#5C3317] leading-relaxed mb-5">{shop.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-[#8B5E3C]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 shrink-0" />
                  {shop.address || `${shop.city}, CA`}
                </span>
                {shop.hours && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 shrink-0" />
                    {shop.hours}
                  </span>
                )}
                {shop.yearFounded && (
                  <span className="flex items-center gap-1.5">
                    🏛️ Est. {shop.yearFounded}
                  </span>
                )}
                <span className="font-bold text-[#5C3317]">{shop.priceRange}</span>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="h-64 sm:h-80 bg-gradient-to-br from-[#F2E8DC] to-[#E0CEBC] rounded-2xl flex items-center justify-center text-8xl mb-10 opacity-60">
              🍦
            </div>

            {/* Why Iconic callout */}
            <div className="bg-[#FFF0F3] border border-[#F9A8B7] rounded-2xl p-6 mb-8">
              <h2 className="font-serif text-xl font-bold text-[#E85D75] mb-3">
                Why It&#39;s On The Trail
              </h2>
              <p className="text-[#5C3317] leading-relaxed">{shop.whyIconic}</p>
            </div>

            {/* MDX content */}
            {shop.content && (
              <div className="prose max-w-none">
                <MDXRemote source={shop.content} />
              </div>
            )}

            {/* Vibe tags */}
            <div className="mt-8 pt-6 border-t border-[#E0CEBC]">
              <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-3">Flavor Vibes</p>
              <div className="flex flex-wrap gap-2">
                {shop.vibes.map((vibe) => (
                  <Link
                    key={vibe}
                    href={`/shops?vibe=${vibe}`}
                    className="text-sm bg-[#F2E8DC] text-[#5C3317] px-3 py-1 rounded-full hover:bg-[#E0CEBC] transition-colors capitalize"
                  >
                    {vibe}
                  </Link>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* CTA card */}
            <div className="bg-white border border-[#E0CEBC] rounded-2xl p-6 sticky top-20 space-y-3">
              <div className="mb-4">
                <h2 className="font-serif text-xl font-bold text-[#2C1A0E] mb-0.5">{shop.shop}</h2>
                <p className="text-sm text-[#8B5E3C]">{shop.city}, California</p>
              </div>

              {/* Get Directions — first action */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.address || shop.shop + " " + shop.city + " CA")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#E85D75] text-white py-3 px-4 rounded-xl font-semibold text-sm hover:bg-[#d14d65] transition-colors"
              >
                📍 Get Directions
              </a>

              <AffiliateButton links={shop.affiliateLinks} slug={shop.slug} />

              <SaveButton slug={shop.slug} />

              {/* Use-case tags */}
              {getUseCaseTags(shop).length > 0 && (
                <div className="pt-2 border-t border-[#F2E8DC]">
                  <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-2">Best For</p>
                  <div className="flex flex-wrap gap-1.5">
                    {getUseCaseTags(shop).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[#FFF0F3] text-[#E85D75] border border-[#F9A8B7] px-2.5 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Seasonality */}
            {shop.seasonality && shop.seasonality.length > 0 && (
              <div className="bg-[#F2E8DC] rounded-2xl p-5">
                <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-2">Best Time to Visit</p>
                <div className="flex flex-wrap gap-2">
                  {shop.seasonality.map((s) => (
                    <span key={s} className="text-sm bg-white text-[#5C3317] px-3 py-1 rounded-full capitalize">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Region link */}
            <div className="bg-[#F2E8DC] rounded-2xl p-5">
              <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-2">Region</p>
              <Link
                href={`/shops?region=${shop.region}`}
                className="inline-block text-sm font-semibold text-[#E85D75] hover:underline"
              >
                {shop.region === "NorCal"
                  ? "Northern California"
                  : shop.region === "SoCal"
                  ? "Southern California"
                  : "Central Valley"}{" "}
                →
              </Link>
            </div>
          </aside>
        </div>

        {/* Related Stops */}
        {related.length > 0 && (
          <section className="mt-16 pt-12 border-t border-[#E0CEBC]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold text-[#2C1A0E]">More from This Region</h2>
              <Link
                href={`/shops?region=${shop.region}`}
                className="flex items-center gap-1 text-sm font-semibold text-[#5C3317] hover:text-[#E85D75] transition-colors"
              >
                See all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((s) => (
                <ShopCard key={s.slug} shop={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
