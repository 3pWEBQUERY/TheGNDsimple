import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { userId, bio, gallery, avatar } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const data: any = {};
    if (typeof bio === "string") data.profileBio = bio;
    if (Array.isArray(gallery)) data.profileGallery = gallery;
    if (typeof avatar === "string") data.avatar = avatar;
    else if (avatar === null) data.avatar = null;

    const user = await prisma.user.update({ where: { id: userId }, data });
    const { password, ...safe } = user as any;
    return NextResponse.json({ user: safe }, { status: 200 });
  } catch (error) {
    console.error("/api/user/profile/update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
