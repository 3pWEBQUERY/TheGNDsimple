import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, theme } = await request.json();

    if (!userId || !theme) {
      return NextResponse.json({ error: "userId and theme are required" }, { status: 400 });
    }

    if (!["LIGHT", "DARK"].includes(theme)) {
      return NextResponse.json({ error: "Invalid theme" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      // Cast to any to avoid TS error before prisma generate updates types
      data: { theme } as any,
    });

    const { password, ...safeUser } = user as any;
    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error) {
    console.error("/api/user/settings/look error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
