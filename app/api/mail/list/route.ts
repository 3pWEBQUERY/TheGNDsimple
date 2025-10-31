import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const q = (searchParams.get("q") || "").trim();
    const unreadOnly = searchParams.get("unreadOnly") === "true";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "20", 10);

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const where: any = { userId };
    if (unreadOnly) where.unread = true;
    if (q) {
      where.OR = [
        { from: { contains: q, mode: "insensitive" } },
        { to: { contains: q, mode: "insensitive" } },
        { subject: { contains: q, mode: "insensitive" } },
        { snippet: { contains: q, mode: "insensitive" } },
      ];
    }

    const [items, total, unreadCount] = await Promise.all([
      (prisma as any).mailMessage.findMany({
        where,
        orderBy: { date: "desc" },
        select: { id: true, from: true, to: true, subject: true, snippet: true, date: true, unread: true, direction: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      (prisma as any).mailMessage.count({ where }),
      (prisma as any).mailMessage.count({ where: { userId, unread: true } }),
    ]);

    return NextResponse.json({ items, total, unreadCount, page, pageSize }, { status: 200 });
  } catch (error) {
    console.error("/api/mail/list error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
