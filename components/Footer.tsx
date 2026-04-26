import Link from "next/link"
import { IceCream } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#2C1A0E] text-[#E0CEBC] mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <IceCream className="w-5 h-5 text-[#E85D75]" />
              <span className="font-serif text-white font-bold text-lg">The Golden Scoop</span>
            </div>
            <p className="text-sm leading-relaxed text-[#B09A8A] max-w-sm">
              California&#39;s 69 best ice cream flavors, curated by taste. From San Francisco&#39;s
              Mission District to San Diego&#39;s coast — find the scoop worth crossing the state for.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">Discover</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/shops", label: "Explore Shops" },
                { href: "/trail", label: "The 69 List" },
                { href: "/quiz", label: "Find My Scoop" },
                { href: "/map", label: "Interactive Map" },
                { href: "/blog", label: "Guides & Stories" },
                { href: "/about", label: "About" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[#E85D75] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">By Region</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/shops?region=NorCal", label: "Northern California" },
                { href: "/shops?region=SoCal", label: "Southern California" },
                { href: "/shops?region=Central", label: "Central Valley" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-[#E85D75] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3D2A1A] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#7A6050]">
          <p>© {new Date().getFullYear()} The Golden Scoop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
