import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

function parseLocalPart(address: string): string | null {
  try {
    const match = address.match(/<([^>]+)>/);
    const email = (match ? match[1] : address).trim();
    const [local] = email.split("@");
    return local || null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const secret = request.headers.get("x-inbound-secret");
    if (!process.env.INBOUND_SECRET || secret !== process.env.INBOUND_SECRET) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const contentType = request.headers.get("content-type") || "";
    let payload: any;
    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else {
      const form = await request.formData();
      payload = Object.fromEntries(form as any);
    }

    const to = String(payload.to || payload.recipient || "");
    const from = String(payload.from || "");
    if (!to || !from) return NextResponse.json({ error: "missing_to_from" }, { status: 400 });

    const local = parseLocalPart(to);
    if (!local) return NextResponse.json({ error: "invalid_to" }, { status: 400 });

    const user = await (prisma as any).user.findFirst({ where: { internalEmailHandle: local } });
    if (!user) return NextResponse.json({ ok: true }, { status: 202 });

    const subject = payload.subject ? String(payload.subject) : null;
    const text = payload.text ? String(payload.text) : null;
    const html = payload.html ? String(payload.html) : null;
    const messageId = payload.messageId || payload["Message-Id"] || null;
    const date = payload.date ? new Date(payload.date) : new Date();

    await (prisma as any).mailMessage.create({
      data: {
        userId: user.id,
        messageId: messageId,
        from,
        to,
        subject,
        snippet: (text || html || "").slice(0, 200),
        text,
        html,
        date,
        unread: true,
        archived: false,
        direction: "INBOUND",
      }
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("/api/mail/inbound error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
