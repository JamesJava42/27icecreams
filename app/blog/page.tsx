import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { getAllBlogPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog — Stories, Guides & Local Finds",
  description: "City-by-city ice cream guides, craving-driven itineraries, and seasonal flavor reports from the California Ice Cream Trail.",
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-10">
        <p className="text-sm font-semibold text-[#E85D75] uppercase tracking-wider mb-1">
          Guides & Inspiration
        </p>
        <h1 className="font-serif text-4xl font-bold text-[#2C1A0E] mb-2">
          Stories, Guides & Local Finds
        </h1>
        <p className="text-[#5C3317]">
          City-by-city ice cream guides, craving-driven itineraries, and seasonal flavor reports from across California.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col sm:flex-row gap-6 bg-white border border-[#E0CEBC] hover:border-[#E85D75] rounded-2xl overflow-hidden transition-colors"
          >
            <div className="sm:w-56 h-40 sm:h-auto bg-gradient-to-br from-[#F2E8DC] to-[#E0CEBC] flex items-center justify-center text-5xl opacity-60 shrink-0">
              🍨
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-[#E85D75] uppercase tracking-wide">
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#8B5E3C]">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#2C1A0E] group-hover:text-[#E85D75] transition-colors mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-[#5C3317] text-sm leading-relaxed line-clamp-2">{post.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#E85D75]">
                Read the guide
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
