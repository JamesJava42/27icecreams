import type { Metadata } from "next"
import { getAllShops } from "@/lib/shops"
import FlavorQuiz from "@/components/FlavorQuiz"

export const metadata: Metadata = {
  title: "Flavor Quiz — Find Your Perfect Scoop",
  description: "Answer 4 questions and we'll match you with 3 personalized California Ice Cream Trail stops. Takes 30 seconds.",
}

export default function QuizPage() {
  const shops = getAllShops()

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-2">
          Personalized Picks
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-3">
          Find Your Perfect Scoop
        </h1>
        <p className="text-[#5C3317] leading-relaxed">
          4 quick questions. 3 personalized recommendations from the California Ice Cream Trail.
        </p>
      </div>

      <FlavorQuiz shops={shops} />
    </div>
  )
}
