import { track } from "@vercel/analytics"

const SAVE_KEY = "ca-ict-saved"

export function subscribeToSaved(callback: () => void): () => void {
  window.addEventListener("storage", callback)
  window.addEventListener("ca-ict-saved-change", callback)
  return () => {
    window.removeEventListener("storage", callback)
    window.removeEventListener("ca-ict-saved-change", callback)
  }
}

export function getSavedSlugs(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SAVE_KEY) || "[]")
  } catch {
    return []
  }
}

export function toggleSavedSlug(slug: string): void {
  const slugs = getSavedSlugs()
  const isSaved = slugs.includes(slug)
  const next = isSaved ? slugs.filter((s) => s !== slug) : [...slugs, slug]
  localStorage.setItem(SAVE_KEY, JSON.stringify(next))
  window.dispatchEvent(new Event("ca-ict-saved-change"))
  track(isSaved ? "shop_unsaved" : "shop_saved", { slug })
}
