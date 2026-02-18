import { NextResponse } from "next/server";
import { generateMvpReport } from "@/lib/interpretation/generate";

type BaziRequest = {
  birthIsoUtc?: string;
  gender?: "male" | "female";
  tzOffsetMinutes?: number;
  dayStartHourLocal?: 23 | 0;
};

export async function POST(req: Request) {
  let payload: BaziRequest;

  try {
    payload = (await req.json()) as BaziRequest;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const birthIsoUtc = payload.birthIsoUtc;
  const gender = payload.gender;
  const tzOffsetMinutes = Number.isFinite(payload.tzOffsetMinutes)
    ? Number(payload.tzOffsetMinutes)
    : 480;
  const dayStartHourLocal = payload.dayStartHourLocal === 0 ? 0 : 23;

  if (!birthIsoUtc || (gender !== "male" && gender !== "female")) {
    return NextResponse.json(
      { error: "birthIsoUtc and valid gender are required." },
      { status: 400 },
    );
  }

  const birthUtc = new Date(birthIsoUtc);
  if (Number.isNaN(birthUtc.getTime())) {
    return NextResponse.json({ error: "birthIsoUtc must be a valid ISO timestamp." }, { status: 400 });
  }

  const data = generateMvpReport({
    birthUtc,
    gender,
    tzOffsetMinutes,
    dayStartHourLocal,
  });

  return NextResponse.json(data);
}
