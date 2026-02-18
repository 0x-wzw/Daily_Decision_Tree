import { NextResponse } from "next/server";
import { generateMvpReport } from "@/lib/interpretation/generate";

export async function POST(req: Request) {
  const body = await req.json();
  // expected: { birthIsoUtc, gender, tzOffsetMinutes?, dayStartHourLocal? }
  const birthUtc = new Date(body.birthIsoUtc);
  if (Number.isNaN(birthUtc.getTime())) {
    return NextResponse.json({ error: "Invalid birthIsoUtc" }, { status: 400 });
  }
  if (body.gender !== "male" && body.gender !== "female") {
    return NextResponse.json({ error: "Invalid gender" }, { status: 400 });
  }

  const out = generateMvpReport({
    birthUtc,
    gender: body.gender,
    tzOffsetMinutes: body.tzOffsetMinutes ?? 480,
    dayStartHourLocal: body.dayStartHourLocal ?? 23,
  });

  return NextResponse.json(out);
}
