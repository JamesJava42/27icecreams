"use client"

import { useState } from "react"
import { Mail, CheckCircle } from "lucide-react"

interface Props {
  variant?: "inline" | "card"
  title?: string
  description?: string
}

export default function EmailCapture({
  variant = "card",
  title = "Get the Trail Newsletter",
  description = "New shops, seasonal flavor alerts, and road trip itineraries — straight to your inbox.",
}: Props) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus("success")
        setEmail("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className={`flex items-center gap-3 text-emerald-700 ${variant === "card" ? "bg-emerald-50 p-6 rounded-2xl" : ""}`}>
        <CheckCircle className="w-6 h-6 shrink-0" />
        <p className="font-semibold">You&#39;re on the list! Check your inbox.</p>
      </div>
    )
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2 rounded-xl border border-[#E0CEBC] bg-white text-[#2C1A0E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D75]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-4 py-2 bg-[#E85D75] text-white rounded-xl font-semibold text-sm hover:bg-[#d14d65] transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </form>
    )
  }

  return (
    <div className="bg-[#2C1A0E] text-white rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#E85D75] flex items-center justify-center">
          <Mail className="w-5 h-5" />
        </div>
        <h3 className="font-serif text-xl font-bold">{title}</h3>
      </div>
      <p className="text-[#B09A8A] text-sm mb-5 leading-relaxed">{description}</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-3 rounded-xl bg-[#3D2A1A] border border-[#5C3317] text-white placeholder-[#7A6050] text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D75]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-[#E85D75] text-white rounded-xl font-bold text-sm hover:bg-[#d14d65] transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing..." : "Get Updates"}
        </button>
      </form>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Try again?</p>
      )}
    </div>
  )
}
