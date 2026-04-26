"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X, IceCream } from "lucide-react"

const links = [
  { href: "/shops", label: "Explore" },
  { href: "/map", label: "Map" },
  { href: "/trail", label: "The 69 List" },
  { href: "/quiz", label: "Find My Scoop" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8F0] border-b border-[#E0CEBC] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-[#2C1A0E] text-lg">
          <IceCream className="w-6 h-6 text-[#E85D75]" />
          <span className="font-serif hidden sm:inline">The Golden Scoop</span>
          <span className="font-serif sm:hidden">Golden Scoop</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-[#E85D75] ${
                pathname.startsWith(l.href)
                  ? "text-[#E85D75]"
                  : "text-[#5C3317]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#5C3317] p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#FFF8F0] border-t border-[#E0CEBC] px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block text-sm font-medium py-2 transition-colors hover:text-[#E85D75] ${
                pathname.startsWith(l.href) ? "text-[#E85D75]" : "text-[#5C3317]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
