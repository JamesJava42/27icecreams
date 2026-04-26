# California Ice Cream Trail 🍦

A complete Next.js content site for discovering the 27 most iconic ice cream shops and flavors across California — built with passive income, SEO, and viral sharing in mind.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Pages & Features](#pages--features)
5. [Content System](#content-system)
6. [Monetization Architecture](#monetization-architecture)
7. [SEO Setup](#seo-setup)
8. [Running the Project](#running-the-project)
9. [Deploying to Vercel](#deploying-to-vercel)
10. [Environment Variables](#environment-variables)
11. [Adding New Shops](#adding-new-shops)
12. [Adding New Blog Posts](#adding-new-blog-posts)
13. [Passive Income Roadmap](#passive-income-roadmap)
14. [Future Features to Build](#future-features-to-build)
15. [The 27 Stops](#the-27-stops)

---

## Project Overview

The California Ice Cream Trail is a curated guide to 27 iconic ice cream stops across the state. The site is designed to:

- Drive organic SEO traffic through city guides, shop detail pages, and blog posts
- Monetize through affiliate links (DoorDash, Uber Eats, Goldbelly) and email newsletter
- Build a recurring audience through the Trail Tracker, Flavor Quiz, and interactive map
- Scale to display ads (Mediavine/Raptive) once traffic hits ~50k monthly sessions

**No database required.** All content is Markdown/MDX files stored in Git.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Content | MDX files + gray-matter + next-mdx-remote |
| Map | Leaflet + react-leaflet (client-side only) |
| Icons | lucide-react |
| Email | Resend API (via `/api/email` route) |
| Deployment | Vercel (recommended) |

---

## Project Structure

```
icecream-trail/
│
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout (Nav + Footer + metadata)
│   ├── globals.css               # Global styles + CSS variables
│   │
│   ├── shops/
│   │   ├── page.tsx              # All 27 stops listing with filters
│   │   └── [slug]/page.tsx       # Individual shop detail page
│   │
│   ├── map/page.tsx              # Interactive Leaflet map
│   ├── trail/page.tsx            # Trail Tracker (localStorage)
│   ├── quiz/page.tsx             # Flavor Quiz
│   │
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Individual blog post
│   │
│   ├── go/[slug]/route.ts        # Affiliate redirect route
│   ├── api/email/route.ts        # Email capture API
│   ├── sitemap.ts                # Auto-generated sitemap.xml
│   └── robots.ts                 # robots.txt
│
├── components/
│   ├── Nav.tsx                   # Sticky top navigation
│   ├── Footer.tsx                # Site footer
│   ├── ShopCard.tsx              # Shop card for grid views
│   ├── ShopFilters.tsx           # Region/category/vibe filter chips (client)
│   ├── AffiliateButton.tsx       # DoorDash / Uber Eats / Goldbelly buttons
│   ├── EmailCapture.tsx          # Email signup form (card + inline variants)
│   ├── JsonLd.tsx                # LocalBusiness + Article JSON-LD schemas
│   ├── TrailTracker.tsx          # Check-off tracker + badges (client)
│   ├── MapView.tsx               # Leaflet map component (client)
│   ├── MapViewClient.tsx         # Client wrapper for dynamic() import
│   └── FlavorQuiz.tsx            # 4-question quiz with personalized results (client)
│
├── content/
│   ├── shops/                    # 27 MDX files — one per shop/flavor
│   │   ├── bi-rite-creamery.mdx
│   │   ├── humphry-slocombe.mdx
│   │   ├── salt-and-straw.mdx
│   │   └── ... (24 more)
│   │
│   └── blog/                     # Blog post MDX files
│       ├── best-ice-cream-san-francisco.mdx
│       ├── best-ice-cream-los-angeles.mdx
│       └── california-ice-cream-trail-guide.mdx
│
├── lib/
│   ├── types.ts                  # TypeScript types (IceCreamItem, BlogPost, etc.)
│   ├── shops.ts                  # Shop data access functions
│   └── blog.ts                   # Blog post data access functions
│
├── next.config.ts                # Next.js config
└── README.md                     # This file
```

---

## Pages & Features

### Home Page (`/`)
- **Hero** — headline, CTA buttons (Start Trail, View Map)
- **Stats Strip** — total stops, cities covered, oldest shop year
- **Scoop of the Day** — deterministic daily rotation, no database needed
- **Feature Cards** — Trail Tracker, Map, Quiz, Blog quick-links
- **Browse by City** — 9 city cards, each showing stop count + must-try flavor
- **Why the Trail?** — three value props + CTA bar
- **Featured Stops** — 6 curated shop cards
- **Blog Teaser** — 3 latest posts
- **Email Capture** — newsletter signup

### Shop Listing (`/shops`)
- Grid of all 27 stops
- **Filter chips** — by Region (NorCal / SoCal / Central), Category (Classic / Cult / Modern / Historic), Vibe (fruity / chocolate / nutty / unique / dairy-free / floral / savory-sweet)
- URL-based filter state (shareable filtered links)
- Shows filtered count vs total

### Shop Detail (`/shops/[slug]`)
- Full MDX prose content (shop history, flavor story, neighborhood context)
- "Why It's On The Trail" callout box
- Affiliate buttons sidebar (DoorDash, Uber Eats, Goldbelly, Shop Website)
- LocalBusiness JSON-LD structured data
- Seasonality tags, vibe tags (linked to filtered list)
- Region quick-link
- Static generation for all 27 slugs

### Interactive Map (`/map`)
- Leaflet map centered on California, all 27 markers
- Color-coded by region (green = NorCal, orange = SoCal, amber = Central)
- Click any marker for shop name + "View details" popup
- Shop list below map grouped by region

### Trail Tracker (`/trail`)
- Check off each of the 27 shops as you visit
- Saved in **localStorage** — no account, no server
- Progress bar + badge system:
  - 🥄 Getting Started (0–4)
  - 🍦 Scooper (5+)
  - 🍨 Churner (15+)
  - 🌟 Trail Master (all 27)
- **Share button** — generates shareable text or copies to clipboard
- Shops organized by region with visit counts per region

### Flavor Quiz (`/quiz`)
- 4 questions: flavor soul, region preference, era (classic vs modern), dairy preference
- Weighted scoring matches answers to shop data
- Returns 3 personalized shop recommendations
- Results link directly to shop detail pages
- Retake option

### Blog (`/blog`, `/blog/[slug]`)
- MDX-rendered blog posts with Article JSON-LD
- Launched with 3 posts:
  - *The Best Ice Cream in San Francisco* — city guide
  - *The Best Ice Cream in Los Angeles* — city guide
  - *The Complete California Ice Cream Trail* — road trip planning guide

### Affiliate Redirect (`/go/[slug]?dest=website|doordash|ubereats|goldbelly`)
- All outbound links go through this route
- Logs clicks server-side (extend with a DB or analytics service)
- Swap affiliate IDs in one place without touching shop MDX files
- Returns 302 redirect to actual destination

---

## Content System

### Shop MDX Frontmatter

Every shop is a single `.mdx` file in `content/shops/`. The frontmatter drives all the data; the body is rich prose content rendered on the detail page.

```yaml
---
id: 1
name: "Salted Caramel"           # The specific flavor
shop: "Bi-Rite Creamery"         # The shop name
shopSlug: "bi-rite-creamery"
city: "San Francisco"
state: "CA"
lat: 37.7614                     # For the map marker
lng: -122.4260
region: "NorCal"                 # NorCal | SoCal | Central
category: ["Cult", "Classic"]    # Classic | Cult | Modern | Historic
vibes: ["savory-sweet"]          # fruity | chocolate | nutty | unique | dairy-free | floral | savory-sweet
description: "..."               # 2-3 sentence card description
whyIconic: "..."                 # The "Why It's On The Trail" callout
yearFounded: 2006
priceRange: "$$"                 # $ | $$ | $$$
address: "3692 18th St, San Francisco, CA 94110"
hours: "Sun-Thu 11am-10pm, Fri-Sat 11am-11pm"
image: "/images/bi-rite-salted-caramel.jpg"
affiliateLinks:
  doordash: "https://..."        # Optional
  ubereats: "https://..."        # Optional
  goldbelly: "https://..."       # Optional — for shippable shops
  shopWebsite: "https://..."     # Required
featured: true                   # Shows in featured grid on home page
seasonality: ["year-round"]      # Optional seasonal tags
---

## Prose content here (markdown)...
```

### Blog MDX Frontmatter

```yaml
---
title: "The Best Ice Cream in San Francisco"
description: "2-3 sentence meta description"
date: "2025-07-15"              # ISO date for sorting
image: "/images/blog/..."
category: "City Guides"
---

## Blog content here (markdown)...
```

---

## Monetization Architecture

### 1. Affiliate Links (near-term, highest intent)
All outbound links use the `/go/[slug]?dest=...` redirect route.

To add your affiliate IDs:
1. Sign up for DoorDash Affiliate, Uber Eats Affiliate, and Goldbelly Affiliate programs
2. Replace the raw URLs in each shop's `affiliateLinks` frontmatter with your affiliate URLs
3. The redirect route already passes traffic through — no other code changes needed

**Goldbelly shops** (highest per-conversion payout, ship nationally):
- Salt & Straw
- McConnell's Fine Ice Creams
- Humphry Slocombe
- Three Twins Ice Cream
- Coolhaus

### 2. Email Newsletter
- Capture form is live on every page (home, blog posts, trail page)
- API route at `/api/email/route.ts` logs emails in dev mode
- To activate Resend: add `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` to `.env.local`
- Monetize at ~2k subscribers via Beehiiv sponsor network or direct shop sponsorships ($50-200/issue)

### 3. Display Ads (later — needs traffic first)
- Do NOT add AdSense immediately — RPMs are too low
- Apply to **Mediavine** at 50k monthly sessions or **Raptive** at 100k
- Food sites in the US earn $20-50 RPM on these networks

### 4. Digital Products
- Sell a printable "California Ice Cream Trail" PDF map + checklist via Gumroad or Lemon Squeezy
- Zero marginal cost. Price at $7-12.

### 5. Sponsored Shop Placements
- Once you have real traffic, shops will pay $100-300/month for "Featured" status
- The `featured: true` flag already exists in every shop's data — just wire up a pricing page

---

## SEO Setup

### What's Already Built
- **Per-page metadata** — title, description, OpenGraph, Twitter card in every `generateMetadata()` function
- **JSON-LD structured data**:
  - `LocalBusiness` (type: IceCreamShop) on every shop detail page
  - `Article` on every blog post
- **Sitemap** — auto-generated at `/sitemap.xml` from all shop slugs + blog slugs
- **Robots.txt** — auto-generated, blocks `/go/` and `/api/` from crawlers
- **Static generation** — all 27 shop pages and all blog pages are statically generated at build time

### Update Before Launch
1. Change `metadataBase` in `app/layout.tsx` to your actual domain
2. Update the same domain in `app/sitemap.ts` and `app/robots.ts`
3. Submit `yourdomain.com/sitemap.xml` to Google Search Console after deploy

### SEO Quick Wins After Launch
- Write one blog post per major CA city (SF and LA are done — add San Diego, Sacramento, Santa Barbara next)
- Each post targets "best ice cream in [city]" — high-intent, commercial queries
- Each shop detail page targets "[shop name] [city]" — navigational queries

---

## Running the Project

### Prerequisites
- Node.js 18 or later
- npm 9 or later

### Install & Run

```bash
# Navigate to the project
cd icecream-trail

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Checking for Errors (without building)

```bash
# TypeScript type check
npx tsc --noEmit

# Lint check
npm run lint
```

### Note on Production Builds Inside OneDrive

If your project lives in an OneDrive folder, `npm run build` will fail with an `EPERM` error because OneDrive locks the `.next/` directory during cloud sync. This does **not** affect `npm run dev` or Vercel deployments.

**Fix option 1:** In File Explorer, right-click the `icecream-trail` folder → OneDrive → Settings and exclude `.next` from sync.

**Fix option 2:** Move the project to a non-OneDrive folder such as `C:\Projects\icecream-trail`.

**Fix option 3:** Deploy to Vercel — it builds in its own environment and this issue does not apply.

---

## Deploying to Vercel

```bash
# Install Vercel CLI once
npm install -g vercel

# Deploy from the project folder
cd icecream-trail
vercel --prod
```

Vercel auto-detects Next.js. No `vercel.json` config file is needed.

After deploying:
1. Set your custom domain in the Vercel dashboard
2. Add environment variables in Vercel → Project → Settings → Environment Variables
3. Submit your sitemap to Google Search Console

---

## Environment Variables

Create a `.env.local` file in the project root:

```bash
# Email capture — Resend (https://resend.com)
# Create a free account, add your sending domain, create an Audience
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_AUDIENCE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Without these variables the app works fine — emails are logged to the server console in dev mode.

---

## Adding New Shops

1. Create `content/shops/your-shop-slug.mdx`
2. Copy the frontmatter template from any existing shop file and fill in all fields
3. Write the MDX body (shop history, flavor story, neighborhood context — aim for 400+ words)
4. The shop automatically appears in the listing, map, sitemap, Trail Tracker, and Quiz

**Finding lat/lng coordinates:** Search the address on Google Maps → right-click the pin → "What's here?"

**Important fields:**
- `featured: true` — adds the shop to the home page featured grid
- `affiliateLinks.goldbelly` — only add if the shop ships nationally via Goldbelly
- `category` — can have multiple values, e.g. `["Classic", "Historic"]`
- `vibes` — drives the Quiz matching, add all that apply

---

## Adding New Blog Posts

1. Create `content/blog/your-post-slug.mdx`
2. Add frontmatter with title, description, date, image, category
3. Write the MDX body
4. The post automatically appears in the blog listing, sitemap, and home page teaser

**High-value post ideas:**
- "Best Ice Cream in [City]" — one for every CA city with Trail stops
- "Best Dairy-Free Ice Cream in California"
- "Ice Cream Shops Open Late in [City]"
- "How to Make [Iconic Flavor] at Home" — Recipe schema markup drives serious SEO
- "California Ice Cream Road Trip: [Region] Edition"

---

## Passive Income Roadmap

### Month 1 — Launch
- [ ] Deploy to Vercel with custom domain
- [ ] Connect Resend for email capture
- [ ] Sign up for DoorDash and Goldbelly affiliate programs
- [ ] Submit sitemap to Google Search Console
- [ ] Post in r/SanFrancisco, r/LosAngeles, r/bayarea, r/AskLosAngeles

### Month 2 — Content
- [ ] Write 5 more city guide blog posts
- [ ] Add "Make It At Home" recipes for 3 iconic flavors (with Amazon affiliate links)
- [ ] Submit to Product Hunt

### Month 3 — Monetization
- [ ] Launch email newsletter (Beehiiv or ConvertKit)
- [ ] Create the $9 printable PDF trail map (Gumroad)
- [ ] Build the AI Flavor Generator (Anthropic API)

### Month 4-6 — Traffic & Scale
- [ ] Build the Road Trip Planner feature
- [ ] Launch weekly newsletter
- [ ] At 50k monthly sessions: apply to Mediavine for display ads

---

## Future Features to Build

### AI Flavor Generator
Use the Anthropic Claude API. User describes their mood/craving → Claude invents a custom California-inspired flavor name + backstory + recommends the closest real shop on the Trail.

```
Route:  /generate
API:    /api/generate  (calls claude-sonnet-4-6)
```

### Road Trip Planner
User picks 2 California cities and number of days → auto-generated shop itinerary ordered by drive time. Output a printable itinerary + "Add all to Google Maps" button.

### Shop Submission Form
Users suggest new shops → submissions go to your email via Resend (no DB needed). You vet and add them as new MDX files.

### At-Home Recipe Vault
Homemade versions of iconic flavors with Recipe JSON-LD schema markup. Amazon affiliate links on every ingredients list.

### Programmatic City SEO Pages
Auto-generate `/cities/san-francisco`, `/cities/los-angeles`, etc. from the shops data. Each page targets "[city] ice cream" searches.

---

## The 27 Stops

| # | Flavor | Shop | City | Region |
|---|--------|------|------|--------|
| 1 | Salted Caramel | Bi-Rite Creamery | San Francisco | NorCal |
| 2 | Secret Breakfast | Humphry Slocombe | San Francisco | NorCal |
| 3 | Strawberry Honey Balsamic with Black Pepper | Salt & Straw | San Francisco | NorCal |
| 4 | Liquid Nitrogen Brown Butter Peach | Smitten Ice Cream | San Francisco | NorCal |
| 5 | Black & Tan Sundae | Fentons Creamery | Oakland | NorCal |
| 6 | Lavender Honey | Penny Ice Creamery | Santa Cruz | NorCal |
| 7 | Sea Salt Caramel Chunk | Screamin' Mimi's | Sebastopol | NorCal |
| 8 | Brown Butter Cookie Dough | Tahoe Blue Cow | Tahoe City | NorCal |
| 9 | Eureka Lemon & Marionberries | McConnell's Fine Ice Creams | Santa Barbara | SoCal |
| 10 | Caramelized Banana | Sweet Rose Creamery | Santa Monica | SoCal |
| 11 | Earl Grey Tea with Shortbread | Carmela Ice Cream | Pasadena | SoCal |
| 12 | Rosewater Saffron Pistachio | Mashti Malone's | Los Angeles | SoCal |
| 13 | Brown Bread | Scoops | Los Angeles | SoCal |
| 14 | Fresh Mango Sorbet | Fosselman's Ice Cream | Alhambra | SoCal |
| 15 | Peanut Butter & Jelly | Hammond's Gourmet Ice Cream | San Diego | SoCal |
| 16 | Horchata | Mariposa Ice Cream | San Diego | SoCal |
| 17 | Chocolate Malted Krunch | Thrifty Ice Cream | Statewide | SoCal |
| 18 | Sicilian Pistachio Gelato | Gelato Paradiso | Palm Springs | SoCal |
| 19 | Marionberry Cheesecake | Tucker's Ice Cream | Alameda | NorCal |
| 20 | Dirty Mint Chip Sandwich | Coolhaus | Los Angeles | SoCal |
| 21 | Burgundy Cherry | Marianne's Ice Cream | Santa Cruz | NorCal |
| 22 | Toasted Almond | Loard's Ice Cream | Oakland | NorCal |
| 23 | Organic Madagascar Vanilla | Three Twins Ice Cream | San Rafael | NorCal |
| 24 | Honey Bourbon Pecan | Big Dipper Creamery | Sacramento | Central |
| 25 | Organic Whole Milk Soft Serve | Straus Family Creamery | Marshall | NorCal |
| 26 | Thai Tea | Creamistry | Irvine | SoCal |
| 27 | Avocado Sea Salt | Naia Gelato | Los Gatos | NorCal |

---

*Built with Next.js 16, Tailwind CSS, TypeScript, and MDX.*
