import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const userId = searchParams.get("userId");
    if (!id || !userId) {
      return NextResponse.json({ error: "id and userId are required" }, { status: 400 });
    }

    const msg = await (prisma as any).mailMessage.findFirst({
      where: { id, userId },
      select: { id: true, from: true, to: true, subject: true, snippet: true, text: true, html: true, date: true, unread: true, archived: true, direction: true },
    });
    if (!msg) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ message: msg }, { status: 200 });
  } catch (error) {
    console.error("/api/mail/get error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
