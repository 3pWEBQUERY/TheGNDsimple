import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, email, username } = await request.json();

    if (!userId || !email || !username) {
      return NextResponse.json({ error: "userId, email and username are required" }, { status: 400 });
    }

    // Ensure email and username are unique for other users
    const existingByEmail = await prisma.user.findFirst({ where: { email, NOT: { id: userId } } });
    if (existingByEmail) {
      return NextResponse.json({ error: "Email is already taken" }, { status: 409 });
    }
    const existingByUsername = await prisma.user.findFirst({ where: { username, NOT: { id: userId } } });
    if (existingByUsername) {
      return NextResponse.json({ error: "Username is already taken" }, { status: 409 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      // Cast to any until prisma generate updates types after migration
      data: { email, username } as any,
    });

    const { password, ...safeUser } = user as any;
    return NextResponse.json({ user: safeUser }, { status: 200 });
  } catch (error) {
    console.error("/api/user/settings/security/update-profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
