import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.INBOUND_SECRET) {
      return NextResponse.json({ ok: false, error: "server_misconfigured_missing_secret" }, { status: 500 });
    }
    const envSecret = String(process.env.INBOUND_SECRET).trim();
    const headerSecretRaw = request.headers.get("x-inbound-secret");
    const urlSecretRaw = new URL(request.url).searchParams.get("secret");
    const headerSecret = headerSecretRaw ? headerSecretRaw.trim() : null;
    const urlSecret = urlSecretRaw ? urlSecretRaw.trim() : null;
    const matches = headerSecret === envSecret || urlSecret === envSecret;
    if (!matches) {
      return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "unexpected" }, { status: 500 });
  }
}
