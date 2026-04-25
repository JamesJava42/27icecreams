import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    // To wire up a real email provider, set RESEND_API_KEY and RESEND_AUDIENCE_ID
    // in your .env.local and replace this block.
    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (apiKey && audienceId) {
      const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      })
      if (!res.ok) {
        console.error("[email] Resend error:", await res.text())
        return NextResponse.json({ error: "Provider error" }, { status: 500 })
      }
    } else {
      // Dev fallback: just log the email
      console.log(`[email signup] ${email}`)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[email] error:", err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
