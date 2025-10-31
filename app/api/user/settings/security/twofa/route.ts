import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, enabled } = await request.json();

    if (!userId || typeof enabled !== "boolean") {
      return NextResponse.json({ error: "userId and enabled are required" }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      // Cast to any to avoid TS error before prisma generate updates types
      data: enabled
        ? ({ twoFactorEnabled: true } as any)
        : ({ twoFactorEnabled: false, twoFactorSecret: null } as any),
    });

    const { password, ...safeUser } = user as any;
    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error) {
    console.error("/api/user/settings/security/twofa error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
