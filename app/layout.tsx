import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export const metadata: Metadata = {
  title: {
    default: "California Ice Cream Trail — 27 Essential Scoops",
    template: "%s | California Ice Cream Trail",
  },
  description:
    "Discover the 27 most iconic ice cream shops and flavors in California. From San Francisco Mission creameries to LA's Persian bastani to San Diego's century-old scooperies.",
  keywords: ["California ice cream", "best ice cream California", "ice cream trail", "artisan creamery"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://californiaicecreamtrail.com",
    siteName: "California Ice Cream Trail",
    title: "California Ice Cream Trail — 27 Essential Scoops",
    description:
      "Discover the 27 most iconic ice cream shops and flavors in California.",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "California Ice Cream Trail",
    description: "27 essential scoops across the Golden State.",
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
