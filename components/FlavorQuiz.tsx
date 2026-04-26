"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { ChevronRight, Heart, RotateCcw } from "lucide-react"
import { track } from "@vercel/analytics"
import type { IceCreamItem, Vibe, Category } from "@/lib/types"
import { subscribeToSaved, getSavedSlugs, toggleSavedSlug } from "@/lib/saved"

interface Question {
  id: string
  text: string
  options: { label: string; value: string; emoji: string }[]
}

const questions: Question[] = [
  {
    id: "flavor",
    text: "Right now, I'm craving...",
    options: [
      { label: "Something fruity & refreshing", value: "fruity", emoji: "🍓" },
      { label: "Rich, deep chocolate", value: "chocolate", emoji: "🍫" },
      { label: "Nutty, caramel, indulgent", value: "nutty", emoji: "🥜" },
      { label: "Surprise me — something unexpected", value: "unique", emoji: "✨" },
    ],
  },
  {
    id: "region",
    text: "Where are you (or where are you going)?",
    options: [
      { label: "Bay Area / NorCal", value: "NorCal", emoji: "🌉" },
      { label: "LA / San Diego / SoCal", value: "SoCal", emoji: "🌴" },
      { label: "Anywhere — just find me the best", value: "any", emoji: "🗺️" },
    ],
  },
  {
    id: "era",
    text: "What kind of ice cream experience do you want?",
    options: [
      { label: "A classic I can trust", value: "Classic", emoji: "🏛️" },
      { label: "A cult shop with a story", value: "Cult", emoji: "🔮" },
      { label: "Something modern & inventive", value: "Modern", emoji: "🔬" },
      { label: "A historic California institution", value: "Historic", emoji: "📜" },
    ],
  },
  {
    id: "dairy",
    text: "Any dietary preference?",
    options: [
      { label: "Full dairy — give me the real stuff", value: "cream", emoji: "🥛" },
      { label: "Dairy-free options are a plus", value: "dairy-free", emoji: "🌱" },
      { label: "I love a good gelato", value: "gelato", emoji: "🇮🇹" },
    ],
  },
]

function score(shops: IceCreamItem[], answers: Record<string, string>): IceCreamItem[] {
  return shops
    .map((shop) => {
      let points = 0
      if (answers.flavor && shop.vibes.includes(answers.flavor as Vibe)) points += 3
      if (answers.region && (answers.region === "any" || shop.region === answers.region)) points += 2
      if (answers.era && shop.category.includes(answers.era as Category)) points += 2
      if (answers.dairy === "dairy-free" && shop.vibes.includes("dairy-free")) points += 3
      if (answers.dairy === "cream" && !shop.vibes.includes("dairy-free")) points += 1
      if (shop.featured) points += 1
      return { shop, points }
    })
    .sort((a, b) => b.points - a.points)
    .slice(0, 3)
    .map((x) => x.shop)
}

interface Props {
  shops: IceCreamItem[]
}

export default function FlavorQuiz({ shops }: Props) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [done, setDone] = useState(false)

  const savedSlugs = useSyncExternalStore(
    subscribeToSaved,
    getSavedSlugs,
    () => [] as string[]
  )

  function answer(value: string) {
    const q = questions[current]
    const next = { ...answers, [q.id]: value }
    setAnswers(next)
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1)
    } else {
      setDone(true)
      track("quiz_completed", { flavor: next.flavor, region: next.region })
    }
  }

  function reset() {
    setCurrent(0)
    setAnswers({})
    setDone(false)
  }

  if (done) {
    const results = score(shops, answers)
    return (
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-[#8B5E3C] text-sm mb-2">Your personalized picks</p>
          <h2 className="font-serif text-3xl font-bold text-[#2C1A0E]">
            Your 3 Perfect Shops 🍦
          </h2>
          <p className="text-sm text-[#8B5E3C] mt-1">Based on your answers</p>
        </div>

        <div className="grid gap-4">
          {results.map((shop, i) => {
            const reasons: string[] = []
            if (answers.flavor && shop.vibes.includes(answers.flavor as Vibe))
              reasons.push(`${answers.flavor} flavors`)
            if (answers.region && answers.region !== "any" && shop.region === answers.region)
              reasons.push(`${answers.region} location`)
            if (answers.era && shop.category.includes(answers.era as Category))
              reasons.push(`${answers.era.toLowerCase()} style`)
            if (answers.dairy === "dairy-free" && shop.vibes.includes("dairy-free" as Vibe))
              reasons.push("dairy-free options")
            const matchLine =
              reasons.length > 0
                ? `Matches: ${reasons.slice(0, 2).join(" · ")}`
                : "Highly rated on the Trail"

            const isSaved = savedSlugs.includes(shop.slug)

            return (
              <div
                key={shop.slug}
                className="relative bg-white border border-[#E0CEBC] hover:border-[#E85D75] rounded-2xl transition-colors group"
              >
                {/* Save button — outside Link so nesting is valid */}
                <button
                  onClick={() => toggleSavedSlug(shop.slug)}
                  aria-label={isSaved ? "Remove from saved" : "Save shop"}
                  className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isSaved ? "fill-[#E85D75] text-[#E85D75]" : "text-[#8B5E3C]"
                    }`}
                  />
                </button>

                <Link
                  href={`/shops/${shop.slug}`}
                  className="flex items-start gap-4 p-5 block"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E85D75] to-[#F4845F] flex items-center justify-center text-white font-bold text-lg shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0 pr-8">
                    <h3 className="font-serif font-bold text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors leading-snug">
                      {shop.shop}
                    </h3>
                    <p className="text-xs text-[#8B5E3C] mt-0.5 mb-1">
                      Signature: {shop.name}
                    </p>
                    <p className="text-xs text-[#B09A8A]">{shop.city}, CA</p>
                    <p className="text-xs text-[#E85D75] font-semibold mt-1.5">{matchLine}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#D0B8A8] group-hover:text-[#E85D75] shrink-0 transition-colors mt-1" />
                </Link>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/shops"
            className="inline-flex items-center justify-center gap-2 bg-[#2C1A0E] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#5C3317] transition-colors"
          >
            Explore all shops
          </Link>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-white border border-[#E0CEBC] text-[#5C3317] px-5 py-2.5 rounded-xl font-semibold text-sm hover:border-[#E85D75] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake quiz
          </button>
        </div>
      </div>
    )
  }

  const q = questions[current]
  const progress = (current / questions.length) * 100

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-[#8B5E3C] mb-2">
          <span>
            Question {current + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-[#F2E8DC] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E85D75] to-[#F4845F] rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] text-center">{q.text}</h2>

      {/* Options */}
      <div className="grid gap-3">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => answer(opt.value)}
            className="flex items-center gap-3 bg-white border border-[#E0CEBC] hover:border-[#E85D75] hover:bg-[#FFF0F3] rounded-2xl p-4 text-left transition-colors group"
          >
            <span className="text-2xl">{opt.emoji}</span>
            <span className="font-medium text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors">
              {opt.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
