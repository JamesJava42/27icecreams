export interface CityContent {
  emoji: string
  tagline: string
  intro: string
  mustTryFlavor: string
  mustTryAt: string
  whyItMatters: string
}

const CITY_CONTENT: Record<string, CityContent> = {
  "San Francisco": {
    emoji: "🌉",
    tagline: "Ground zero for California artisan ice cream",
    intro:
      "San Francisco didn't just adopt the farm-to-table movement — it applied it to ice cream. The Mission District became the unlikely birthplace of a style of scooping that prioritized locally sourced dairy, seasonal produce, and intense, honest flavors over mass-market sweetness.",
    mustTryFlavor: "Salted Caramel",
    mustTryAt: "Bi-Rite Creamery",
    whyItMatters:
      "The creameries here proved that ice cream could be a serious culinary statement, not just a hot-day treat.",
  },
  "Los Angeles": {
    emoji: "🌴",
    tagline: "Where cultures collide in a cone",
    intro:
      "Los Angeles is the most diverse ice cream city in California. Persian bastani sits two miles from Japanese mochi ice cream, which sits three blocks from a century-old soda fountain. The variety here isn't a marketing claim — it's the product of a genuinely multicultural city with a year-round craving for something cold.",
    mustTryFlavor: "Rosewater Saffron Pistachio",
    mustTryAt: "Mashti Malone's",
    whyItMatters:
      "LA's ice cream scene is a mirror of its population — you'll find flavors here that don't exist anywhere else in the world.",
  },
  Oakland: {
    emoji: "🦁",
    tagline: "Est. 1894 — California's oldest ice cream landmark",
    intro:
      "Oakland's Fentons Creamery has been scooping since before the turn of the century — and became permanently famous when Pixar used it as the real-life inspiration for 'Up.' But beyond the movie mythology, Fentons is genuinely one of the great American ice cream parlors, with sundaes the size of footballs and an unbroken 130-year tradition.",
    mustTryFlavor: "Black & Tan Sundae",
    mustTryAt: "Fentons Creamery",
    whyItMatters: "This is where California's ice cream story actually started.",
  },
  "Santa Cruz": {
    emoji: "🏄",
    tagline: "Farm-sourced, hyper-seasonal, radically local",
    intro:
      "Santa Cruz takes its food seriously, and ice cream is no exception. Penny Ice Creamery operates on a farm-first philosophy — every flavor is built around what's in season locally, which means the menu changes constantly and every visit feels like a discovery.",
    mustTryFlavor: "Lavender Honey",
    mustTryAt: "Penny Ice Creamery",
    whyItMatters:
      "Proof that seasonal, locally sourced ice cream is as compelling as the artisan food movement applied to any other ingredient.",
  },
  "Santa Barbara": {
    emoji: "☀️",
    tagline: "Hand-churned on Channel Islands dairy since 1949",
    intro:
      "McConnell's has been making ice cream in Santa Barbara for over 75 years, using milk from their own dairy herd in the Santa Ynez Valley. The result is an exceptionally rich, dense product that tastes unmistakably of the California coast — butter-forward, clean, and deeply satisfying.",
    mustTryFlavor: "Eureka Lemon & Marionberries",
    mustTryAt: "McConnell's Fine Ice Creams",
    whyItMatters:
      "One of the rare American ice cream brands that controls its entire supply chain from cow to cone.",
  },
  "San Diego": {
    emoji: "🌊",
    tagline: "Sun, surf, and Mexican-inspired scoops",
    intro:
      "San Diego's proximity to the border and its Mexican-American culinary heritage shows up directly in the ice cream. Horchata, chamoy, tamarind, and cajeta-inspired flavors aren't novelties here — they're the local standard. The perpetual sunshine keeps demand constant year-round.",
    mustTryFlavor: "Horchata",
    mustTryAt: "Mariposa Ice Cream",
    whyItMatters:
      "San Diego's ice cream reflects a border-region food culture that's genuinely distinct from the rest of California.",
  },
  "Palm Springs": {
    emoji: "🌵",
    tagline: "Imported Bronte pistachio in the Coachella desert",
    intro:
      "Palm Springs is not an obvious ice cream destination — until you realize that temperatures regularly hit 110°F in summer and that Gelato Paradiso has been importing Bronte pistachio paste from Sicily to make one of the most remarkable gelatos in California. The desert setting makes every scoop feel earned.",
    mustTryFlavor: "Sicilian Pistachio Gelato",
    mustTryAt: "Gelato Paradiso",
    whyItMatters:
      "Authentic Sicilian-style gelato in the middle of the California desert — an unlikely combination that works perfectly.",
  },
  Sacramento: {
    emoji: "🌾",
    tagline: "Farm-to-scoop in California's agricultural heartland",
    intro:
      "Sacramento sits at the center of California's farm economy, and Big Dipper Creamery takes full advantage — sourcing from Central Valley farms to create flavors that are genuinely regional. Honey Bourbon Pecan made with local honey, stone fruit from nearby orchards, and seasonal specials that change with the harvest calendar.",
    mustTryFlavor: "Honey Bourbon Pecan",
    mustTryAt: "Big Dipper Creamery",
    whyItMatters: "The most direct expression of California agricultural abundance in ice cream form.",
  },
  "Lake Tahoe": {
    emoji: "⛷️",
    tagline: "Best après-ski dessert at 6,300 feet",
    intro:
      "Ice cream at altitude, after a day on the mountain, hits differently. Tahoe Blue Cow has turned this insight into a shop identity — seasonal flavors that lean into the mountain setting, a space that works year-round (not just summer), and a scoop that's become a Tahoe ritual for regulars.",
    mustTryFlavor: "Brown Butter Cookie Dough",
    mustTryAt: "Tahoe Blue Cow",
    whyItMatters:
      "The only ice cream shop on the Trail that's genuinely designed for all four seasons — and better for it.",
  },
}

export function getCityContent(city: string): CityContent | null {
  return CITY_CONTENT[city] ?? null
}
