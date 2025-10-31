import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, to, subject, text, html } = await request.json();
    if (!userId || !to || (!text && !html)) {
      return NextResponse.json({ error: "userId, to and text or html are required" }, { status: 400 });
    }

    const user = await (prisma as any).user.findUnique({
      where: { id: userId },
      select: { internalEmailHandle: true }
    });
    if (!user || !user.internalEmailHandle) {
      return NextResponse.json({ error: "mailbox_not_set" }, { status: 400 });
    }

    const from = `${user.internalEmailHandle}@thegnd.io`;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "missing_provider" }, { status: 501 });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ from, to, subject: subject || "", text, html })
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data?.message || "send_failed" }, { status: 502 });
    }

    await (prisma as any).mailMessage.create({
      data: {
        userId,
        messageId: data?.id || null,
        from,
        to,
        subject: subject || null,
        snippet: (text || html || "").slice(0, 200),
        text: text || null,
        html: html || null,
        date: new Date(),
        unread: false,
        archived: false,
        direction: "OUTBOUND",
      }
    });

    return NextResponse.json({ ok: true, id: data?.id }, { status: 200 });
  } catch (error) {
    console.error("/api/mail/send error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
