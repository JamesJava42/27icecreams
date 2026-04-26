import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Star } from "lucide-react"
import { getAllCities, getShopsByCity, cityToSlug, slugToCity } from "@/lib/shops"
import { getCityContent } from "@/lib/cities"
import ShopCard from "@/components/ShopCard"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllCities().map((city) => ({ slug: cityToSlug(city) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const city = slugToCity(slug)
  const shops = getShopsByCity(city)
  if (shops.length === 0) return {}
  const content = getCityContent(city)
  return {
    title: `Ice Cream in ${city}, CA — California Ice Cream Trail`,
    description:
      content?.intro.slice(0, 155) ??
      `The best ice cream shops in ${city}, California. ${shops.length} ${shops.length === 1 ? "stop" : "stops"} on the California Ice Cream Trail.`,
  }
}

export default async function CityPage({ params }: Props) {
  const { slug } = await params
  const city = slugToCity(slug)
  const shops = getShopsByCity(city)
  if (shops.length === 0) notFound()

  const content = getCityContent(city)
  const region = shops[0].region
  const regionLabel =
    region === "NorCal"
      ? "Northern California"
      : region === "SoCal"
      ? "Southern California"
      : "Central Valley"

  const featured = shops.filter((s) => s.featured)
  const rest = shops.filter((s) => !s.featured)

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link
        href="/cities"
        className="inline-flex items-center gap-2 text-sm text-[#8B5E3C] hover:text-[#E85D75] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        All cities
      </Link>

      {/* Hero */}
      <div className="mb-10">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          {regionLabel}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2C1A0E] mb-3">
          {content ? content.emoji : "📍"} Ice Cream in {city}
        </h1>
        {content && (
          <p className="text-lg text-[#8B5E3C] font-medium mb-4 italic">{content.tagline}</p>
        )}
        <p className="text-[#5C3317] text-base leading-relaxed max-w-3xl">
          {content?.intro ??
            `${shops.length} iconic ${shops.length === 1 ? "shop" : "shops"} on the California Ice Cream Trail.`}
        </p>
      </div>

      {/* Must-try callout */}
      {content && (
        <div className="bg-gradient-to-r from-[#FFF0F3] to-[#FDDDD4] border border-[#F9A8B7] rounded-2xl p-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-xs font-bold text-[#E85D75] uppercase tracking-wider mb-1">
                Must-Try Flavor in {city}
              </p>
              <p className="font-serif text-2xl font-bold text-[#2C1A0E] mb-1">
                {content.mustTryFlavor}
              </p>
              <p className="text-sm text-[#8B5E3C]">@ {content.mustTryAt}</p>
            </div>
            <div className="bg-white/70 rounded-xl p-4 max-w-sm">
              <p className="text-xs font-bold text-[#8B5E3C] uppercase tracking-wider mb-1">
                Why it matters
              </p>
              <p className="text-sm text-[#5C3317] leading-relaxed">{content.whyItMatters}</p>
            </div>
          </div>
        </div>
      )}

      {/* Featured shops */}
      {featured.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-[#E85D75] fill-current" />
            <h2 className="font-serif text-xl font-bold text-[#2C1A0E]">Featured in {city}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((shop) => (
              <ShopCard key={shop.slug} shop={shop} />
            ))}
          </div>
        </div>
      )}

      {/* All / remaining shops */}
      {rest.length > 0 && (
        <div className="mb-10">
          {featured.length > 0 && (
            <h2 className="font-serif text-xl font-bold text-[#2C1A0E] mb-4">
              More in {city}
            </h2>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((shop) => (
              <ShopCard key={shop.slug} shop={shop} />
            ))}
          </div>
        </div>
      )}

      {/* Footer nav */}
      <div className="mt-12 pt-8 border-t border-[#E0CEBC] flex flex-col sm:flex-row gap-4 items-center justify-between">
        <p className="text-sm text-[#8B5E3C]">
          {shops.length} {shops.length === 1 ? "shop" : "shops"} · {regionLabel}
        </p>
        <div className="flex gap-4">
          <Link
            href={`/shops?region=${region}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#E85D75] hover:underline"
          >
            All {regionLabel} shops
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/shops"
            className="text-sm font-semibold text-[#5C3317] hover:text-[#E85D75] transition-colors"
          >
            Browse all shops →
          </Link>
        </div>
      </div>
    </div>
  )
}
