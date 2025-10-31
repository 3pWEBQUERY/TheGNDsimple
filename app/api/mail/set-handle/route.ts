import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const HANDLE_REGEX = /^[a-z0-9]{3,20}$/;

export async function POST(request: NextRequest) {
  try {
    const { userId, handle } = await request.json();
    if (!userId || !handle) {
      return NextResponse.json({ error: "userId and handle are required" }, { status: 400 });
    }

    const normalized = String(handle).toLowerCase();
    if (!HANDLE_REGEX.test(normalized)) {
      return NextResponse.json({ error: "invalid_handle" }, { status: 400 });
    }

    const exists = await (prisma as any).user.findFirst({ where: { internalEmailHandle: normalized } });
    if (exists && exists.id !== userId) {
      return NextResponse.json({ error: "unavailable" }, { status: 409 });
    }

    const user = await (prisma as any).user.update({
      where: { id: userId },
      data: { internalEmailHandle: normalized },
      select: {
        id: true,
        internalEmailHandle: true,
        internalEmailVerified: true,
      },
    });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("/api/mail/set-handle error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
