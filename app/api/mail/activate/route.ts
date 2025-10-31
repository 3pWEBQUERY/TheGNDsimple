import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const user = await (prisma as any).user.update({
      where: { id: userId },
      data: { internalEmailVerified: true, internalEmailVerifiedAt: new Date() },
      select: {
        id: true,
        internalEmailHandle: true,
        internalEmailVerified: true,
        internalEmailVerifiedAt: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("/api/mail/activate error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
