import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const user = await (prisma as any).user.findUnique({
      where: { id: userId },
      include: { escortProfile: true },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { password, ...safeUser } = user as any;
    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error) {
    console.error("/api/user/me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
