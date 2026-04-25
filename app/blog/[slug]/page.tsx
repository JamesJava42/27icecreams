import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/blog"
import { ArticleJsonLd } from "@/components/JsonLd"
import EmailCapture from "@/components/EmailCapture"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        datePublished={post.date}
        image={`https://californiaicecreamtrail.com${post.image}`}
        url={`https://californiaicecreamtrail.com/blog/${slug}`}
      />

      <div className="max-w-3xl mx-auto px-4 py-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#8B5E3C] hover:text-[#E85D75] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold text-[#E85D75] uppercase tracking-wide bg-[#FFF0F3] px-3 py-1 rounded-full">
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
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2C1A0E] leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-[#5C3317] leading-relaxed">{post.description}</p>
        </header>

        {/* Hero image placeholder */}
        <div className="h-56 sm:h-72 bg-gradient-to-br from-[#F2E8DC] to-[#E0CEBC] rounded-2xl flex items-center justify-center text-7xl opacity-60 mb-10">
          🍨
        </div>

        {/* Content */}
        {post.content && (
          <div className="prose max-w-none">
            <MDXRemote source={post.content} />
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 border-t border-[#E0CEBC] pt-10 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/shops"
              className="flex-1 text-center bg-[#E85D75] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#d14d65] transition-colors"
            >
              Explore All 27 Stops →
            </Link>
            <Link
              href="/map"
              className="flex-1 text-center bg-[#F2E8DC] text-[#5C3317] px-6 py-3 rounded-xl font-semibold hover:bg-[#E0CEBC] transition-colors"
            >
              View the Map →
            </Link>
          </div>
          <EmailCapture variant="card" />
        </div>
      </div>
    </>
  )
}
