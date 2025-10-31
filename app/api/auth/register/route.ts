import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

function sanitizeHandleBase(input: string): string {
  const base = input.toLowerCase().replace(/[^a-z0-9]/g, "");
  return base.slice(0, 12) || "user";
}

function randomSuffix(length = 4): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

async function generateUniqueHandle(username: string): Promise<string> {
  const base = sanitizeHandleBase(username);
  // Try base, then base+random suffixes
  const candidates = [base];
  for (let i = 0; i < 10; i++) candidates.push(`${base}${randomSuffix()}`);
  for (const h of candidates) {
    const exists = await (prisma as any).user.findFirst({ where: { internalEmailHandle: h } });
    if (!exists) return h;
  }
  // Fallback: purely random
  while (true) {
    const h = randomSuffix(6);
    const exists = await (prisma as any).user.findFirst({ where: { internalEmailHandle: h } });
    if (!exists) return h;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, username, password, confirmPassword } = await request.json();

    if (!email || !username || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email or username already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate internal @thegnd.io mailbox handle
    const internalEmailHandle = await generateUniqueHandle(username);

    const user = await (prisma as any).user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        internalEmailHandle,
        internalEmailVerified: false,
      },
      select: {
        id: true,
        email: true,
        username: true,
        internalEmailHandle: true,
        internalEmailVerified: true,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
