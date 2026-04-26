import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    default: "The Golden Scoop — California's 69 Best Ice Cream Flavors",
    template: "%s | The Golden Scoop",
  },
  description:
    "California's 69 best ice cream flavors, curated by taste. From San Francisco's Mission District to San Diego's coast — find the scoop worth crossing the state for.",
  keywords: ["California ice cream", "best ice cream California", "California ice cream guide", "artisan creamery", "top ice cream flavors"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://californiaicecreamtrail.com",
    siteName: "The Golden Scoop",
    title: "The Golden Scoop — California's 69 Best Ice Cream Flavors",
    description:
      "California's 69 best ice cream flavors, curated by taste. Find the scoop worth crossing the state for.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Golden Scoop",
    description: "California's 69 best ice cream flavors, curated by taste.",
    images: ["/og-default.jpg"],
  },
  metadataBase: new URL("https://californiaicecreamtrail.com"),
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
