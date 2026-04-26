import type { Metadata } from "next"
import { getAllShops } from "@/lib/shops"
import FlavorQuiz from "@/components/FlavorQuiz"

export const metadata: Metadata = {
  title: "Find My Scoop — The Golden Scoop",
  description:
    "Answer 4 quick questions and get 3 personalized California ice cream shop recommendations matched to your craving. Takes under a minute.",
}

export default function FindMyScoopPage() {
  const shops = getAllShops()

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-2">
          Craving Matcher
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-3">
          What Should I Get?
        </h1>
        <p className="text-[#5C3317] leading-relaxed">
          Tell us your mood. We&#39;ll match you with 3 California ice cream shops that fit your craving.
          Takes under a minute.
        </p>
      </div>

      <FlavorQuiz shops={shops} />
    </div>
  )
}
