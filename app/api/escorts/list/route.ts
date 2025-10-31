import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    // Fetch active escorts with their profiles
    const escorts = await prisma.user.findMany({
      where: {
        isEscort: true,
        escortProfile: {
          active: true
        }
      },
      include: {
        escortProfile: true
      },
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: "desc"
      }
    });

    // Format the response
    const formattedEscorts = escorts.map(user => ({
      id: user.id,
      username: user.username,
      avatar: user.avatar,
      profile: user.escortProfile ? {
        slogan: (user.escortProfile as any).slogan,
        age: (user.escortProfile as any).age,
        city: user.escortProfile.city,
        country: user.escortProfile.country,
        gallery: user.escortProfile.gallery,
        services: user.escortProfile.services
      } : null
    }));

    return NextResponse.json({ escorts: formattedEscorts }, { status: 200 });
  } catch (error) {
    console.error("/api/escorts/list error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
