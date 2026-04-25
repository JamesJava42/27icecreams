import { NextRequest, NextResponse } from "next/server"
import { getShopBySlug } from "@/lib/shops"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const shop = getShopBySlug(slug)

  if (!shop) {
    return NextResponse.redirect(new URL("/shops", request.url))
  }

  const dest = request.nextUrl.searchParams.get("dest") || "website"
  const { affiliateLinks } = shop

  const destinations: Record<string, string | undefined> = {
    website: affiliateLinks.shopWebsite,
    doordash: affiliateLinks.doordash,
    ubereats: affiliateLinks.ubereats,
    goldbelly: affiliateLinks.goldbelly,
  }

  const url = destinations[dest] || affiliateLinks.shopWebsite

  // Log click for future analytics (extend with a real DB call here)
  console.log(`[go] ${slug} → ${dest}`)

  return NextResponse.redirect(url, {
    status: 302,
    headers: {
      "Cache-Control": "no-store",
    },
  })
}
