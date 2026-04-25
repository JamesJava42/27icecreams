"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, RotateCcw } from "lucide-react"
import type { IceCreamItem, Vibe, Category } from "@/lib/types"

interface Question {
  id: string
  text: string
  options: { label: string; value: string; emoji: string }[]
}

const questions: Question[] = [
  {
    id: "flavor",
    text: "What's your flavor soul?",
    options: [
      { label: "Fruity & bright", value: "fruity", emoji: "🍓" },
      { label: "Chocolate everything", value: "chocolate", emoji: "🍫" },
      { label: "Nuts & caramel", value: "nutty", emoji: "🥜" },
      { label: "Weird & wonderful", value: "unique", emoji: "✨" },
    ],
  },
  {
    id: "region",
    text: "Which part of California speaks to you?",
    options: [
      { label: "Bay Area & Wine Country", value: "NorCal", emoji: "🌉" },
      { label: "LA & San Diego", value: "SoCal", emoji: "🌴" },
      { label: "No preference — surprise me", value: "any", emoji: "🗺️" },
    ],
  },
  {
    id: "era",
    text: "Do you prefer your ice cream...",
    options: [
      { label: "Time-tested classic", value: "Classic", emoji: "🏛️" },
      { label: "Cult favorite with a story", value: "Cult", emoji: "🔮" },
      { label: "Modern & inventive", value: "Modern", emoji: "🔬" },
      { label: "Historic institution", value: "Historic", emoji: "📜" },
    ],
  },
  {
    id: "dairy",
    text: "Dairy situation?",
    options: [
      { label: "Full cream, no compromises", value: "cream", emoji: "🥛" },
      { label: "Dairy-free options welcome", value: "dairy-free", emoji: "🌱" },
      { label: "Gelato (lower fat, denser)", value: "gelato", emoji: "🇮🇹" },
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

  function answer(value: string) {
    const q = questions[current]
    const next = { ...answers, [q.id]: value }
    setAnswers(next)
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1)
    } else {
      setDone(true)
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
            Your 3 Perfect Scoops 🍦
          </h2>
        </div>

        <div className="grid gap-4">
          {results.map((shop, i) => (
            <Link
              key={shop.slug}
              href={`/shops/${shop.slug}`}
              className="flex items-center gap-4 bg-white border border-[#E0CEBC] hover:border-[#E85D75] rounded-2xl p-5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E85D75] to-[#F4845F] flex items-center justify-center text-white font-bold text-lg shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#8B5E3C] font-semibold mb-0.5">{shop.shop}</p>
                <h3 className="font-serif font-bold text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors">
                  {shop.name}
                </h3>
                <p className="text-xs text-[#8B5E3C]">{shop.city} · {shop.region}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#D0B8A8] group-hover:text-[#E85D75] shrink-0 transition-colors" />
            </Link>
          ))}
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 mx-auto text-sm text-[#8B5E3C] hover:text-[#E85D75] transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Retake quiz
        </button>
      </div>
    )
  }

  const q = questions[current]
  const progress = ((current) / questions.length) * 100

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
