import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { BlogPost } from "./types"

const blogDir = path.join(process.cwd(), "content/blog")

export function getAllBlogSlugs(): string[] {
  return fs.readdirSync(blogDir).map((f) => f.replace(/\.mdx$/, ""))
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(raw)
  return { ...(data as Omit<BlogPost, "content">), slug, content }
}

export function getAllBlogPosts(): BlogPost[] {
  return getAllBlogSlugs()
    .map((slug) => getBlogBySlug(slug))
    .filter(Boolean)
    .sort((a, b) => new Date(b!.date).getTime() - new Date(a!.date).getTime()) as BlogPost[]
}
