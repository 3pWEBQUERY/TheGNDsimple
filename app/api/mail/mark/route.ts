import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, id, unread, archived } = await request.json();
    if (!userId || !id) return NextResponse.json({ error: "userId and id are required" }, { status: 400 });

    const data: any = {};
    if (typeof unread === "boolean") data.unread = unread;
    if (typeof archived === "boolean") data.archived = archived;

    const result = await (prisma as any).mailMessage.updateMany({
      where: { id, userId },
      data,
    });
    if (result.count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("/api/mail/mark error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
