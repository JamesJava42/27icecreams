import { ExternalLink, ShoppingBag, Truck, Globe } from "lucide-react"
import type { AffiliateLinks } from "@/lib/types"

interface Props {
  links: AffiliateLinks
  slug: string
}

export default function AffiliateButton({ links, slug }: Props) {
  return (
    <div className="space-y-3">
      <a
        href={`/go/${slug}?dest=website`}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="flex items-center justify-between w-full bg-[#2C1A0E] text-white px-4 py-3 rounded-xl font-semibold hover:bg-[#5C3317] transition-colors group"
      >
        <span className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Visit Shop Website
        </span>
        <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
      </a>

      {links.doordash && (
        <a
          href={`/go/${slug}?dest=doordash`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center justify-between w-full bg-[#FF3008] text-white px-4 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity group"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Order on DoorDash
          </span>
          <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
        </a>
      )}

      {links.ubereats && (
        <a
          href={`/go/${slug}?dest=ubereats`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center justify-between w-full bg-[#06C167] text-white px-4 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity group"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Order on Uber Eats
          </span>
          <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
        </a>
      )}

      {links.goldbelly && (
        <a
          href={`/go/${slug}?dest=goldbelly`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center justify-between w-full bg-[#FF6B35] text-white px-4 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity group"
        >
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Ship Nationwide via Goldbelly
          </span>
          <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100" />
        </a>
      )}

      <p className="text-xs text-[#8B5E3C] text-center">
        Some links above are affiliate links. Purchasing through them supports this site.
      </p>
    </div>
  )
}
