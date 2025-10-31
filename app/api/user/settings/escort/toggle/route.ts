import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, enable } = await request.json();

    if (!userId || typeof enable !== "boolean") {
      return NextResponse.json({ error: "userId and enable are required" }, { status: 400 });
    }

    if (enable) {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { isEscort: true } as any,
      });

      await (prisma as any).escortProfile.upsert({
        where: { userId },
        update: { active: true },
        create: { 
          userId, 
          active: true, 
          tags: [],
          gallery: [],
          languages: [],
          incall: false,
          outcall: false,
          travelAvailable: false
        },
      });

      const safe = await (prisma as any).user.findUnique({
        where: { id: userId },
        include: { escortProfile: true },
      });
      return NextResponse.json({ user: safe }, { status: 200 });
    } else {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { isEscort: false } as any,
      });

      await (prisma as any).escortProfile.updateMany({
        where: { userId },
        data: { active: false },
      });

      const safe = await (prisma as any).user.findUnique({
        where: { id: userId },
        include: { escortProfile: true },
      });
      return NextResponse.json({ user: safe }, { status: 200 });
    }
  } catch (error) {
    console.error("/api/user/settings/escort/toggle error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
