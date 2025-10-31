import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, isProfilePublic, useGridView } = await request.json();

    if (!userId || typeof isProfilePublic !== "boolean") {
      return NextResponse.json({ error: "userId and isProfilePublic are required" }, { status: 400 });
    }

    const updateData: any = { isProfilePublic };
    if (typeof useGridView === "boolean") {
      updateData.useGridView = useGridView;
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    const { password, ...safeUser } = user as any;
    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error) {
    console.error("/api/user/settings/general error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
