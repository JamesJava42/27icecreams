import type { IceCreamItem } from "@/lib/types"

interface LocalBusinessProps {
  shop: IceCreamItem
}

export function LocalBusinessJsonLd({ shop }: LocalBusinessProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "IceCreamShop",
    name: shop.shop,
    description: shop.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: shop.address,
      addressLocality: shop.city,
      addressRegion: "CA",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: shop.lat,
      longitude: shop.lng,
    },
    url: shop.affiliateLinks.shopWebsite,
    priceRange: shop.priceRange,
    servesCuisine: "Ice Cream",
    ...(shop.yearFounded && { foundingDate: String(shop.yearFounded) }),
    ...(shop.hours && { openingHours: shop.hours }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface ArticleProps {
  title: string
  description: string
  datePublished: string
  image: string
  url: string
}

export function ArticleJsonLd({ title, description, datePublished, image, url }: ArticleProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    image,
    url,
    publisher: {
      "@type": "Organization",
      name: "California Ice Cream Trail",
      logo: {
        "@type": "ImageObject",
        url: "https://californiaicecreamtrail.com/logo.png",
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
