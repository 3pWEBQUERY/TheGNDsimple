import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const HANDLE_REGEX = /^[a-z0-9]{3,20}$/;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const handle = (searchParams.get("handle") || "").toLowerCase();

    if (!handle || !HANDLE_REGEX.test(handle)) {
      return NextResponse.json({ available: false, reason: "invalid" }, { status: 200 });
    }

    const exists = await (prisma as any).user.findFirst({ where: { internalEmailHandle: handle } });
    return NextResponse.json({ available: !exists }, { status: 200 });
  } catch (error) {
    console.error("/api/mail/availability error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
