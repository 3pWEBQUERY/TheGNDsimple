import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      bio,
      description,
      gallery,
      services,
      // Contact fields
      whatsapp,
      telegram,
      signal,
      viber,
      wechat,
      line,
      snapchat,
      instagram,
      twitter,
      onlyfans,
      website,
      // Location fields
      address,
      city,
      postalCode,
      state,
      country,
      incall,
      outcall,
      travelAvailable,
      // General fields
      slogan,
      age,
      nationality,
      languages,
      heightCm,
      weightKg,
      bodyType,
      hairColor,
      hairLength,
      breastType,
      breastSize,
      intimateArea,
      piercings,
      tattoos,
      clothingStyle,
      clothingSize,
      shoeSize,
    } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const data: any = {};
    if (typeof bio === "string") data.bio = bio;
    if (typeof description === "string") data.description = description;
    if (Array.isArray(gallery)) data.gallery = gallery;
    if (Array.isArray(services) || typeof services === "object") data.services = services;
    // Contact fields
    if (typeof whatsapp === "string") data.whatsapp = whatsapp;
    if (typeof telegram === "string") data.telegram = telegram;
    if (typeof signal === "string") data.signal = signal;
    if (typeof viber === "string") data.viber = viber;
    if (typeof wechat === "string") data.wechat = wechat;
    if (typeof line === "string") data.line = line;
    if (typeof snapchat === "string") data.snapchat = snapchat;
    if (typeof instagram === "string") data.instagram = instagram;
    if (typeof twitter === "string") data.twitter = twitter;
    if (typeof onlyfans === "string") data.onlyfans = onlyfans;
    if (typeof website === "string") data.website = website;
    // Location fields
    if (typeof address === "string") data.address = address;
    if (typeof city === "string") data.city = city;
    if (typeof postalCode === "string") data.postalCode = postalCode;
    if (typeof state === "string") data.state = state;
    if (typeof country === "string") data.country = country;
    if (typeof incall === "boolean") data.incall = incall;
    if (typeof outcall === "boolean") data.outcall = outcall;
    if (typeof travelAvailable === "boolean") data.travelAvailable = travelAvailable;
    if (typeof slogan === "string") data.slogan = slogan;
    if (typeof age === "number") data.age = age;
    if (typeof nationality === "string") data.nationality = nationality;
    if (Array.isArray(languages)) data.languages = languages;
    if (typeof heightCm === "number") data.heightCm = heightCm;
    if (typeof weightKg === "number") data.weightKg = weightKg;
    if (typeof bodyType === "string") data.bodyType = bodyType;
    if (typeof hairColor === "string") data.hairColor = hairColor;
    if (typeof hairLength === "string") data.hairLength = hairLength;
    if (typeof breastType === "string") data.breastType = breastType;
    if (typeof breastSize === "string") data.breastSize = breastSize;
    if (typeof intimateArea === "string") data.intimateArea = intimateArea;
    if (typeof piercings === "string") data.piercings = piercings;
    if (typeof tattoos === "string") data.tattoos = tattoos;
    if (typeof clothingStyle === "string") data.clothingStyle = clothingStyle;
    if (typeof clothingSize === "string") data.clothingSize = clothingSize;
    if (typeof shoeSize === "string") data.shoeSize = shoeSize;

    const escort = await (prisma as any).escortProfile.upsert({
      where: { userId },
      update: data,
      create: { userId, active: true, ...data },
    });

    return NextResponse.json({ escort }, { status: 200 });
  } catch (error) {
    console.error("/api/escort/profile/update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
