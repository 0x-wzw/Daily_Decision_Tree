"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const defaultNowLocalValue = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
};

const toUtcIso = (datetimeLocal: string, tzOffsetMinutes: number): string => {
  const [datePart, timePart] = datetimeLocal.split("T");
  if (!datePart || !timePart) {
    throw new Error("Invalid datetime-local value");
  }

  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  const localAsUtcMs = Date.UTC(year, month - 1, day, hour, minute, 0, 0);
  const utcMs = localAsUtcMs - tzOffsetMinutes * 60_000;
  return new Date(utcMs).toISOString();
};

export default function HomePage() {
  const router = useRouter();
  const [birthLocal, setBirthLocal] = useState(defaultNowLocalValue);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [tzOffsetMinutes, setTzOffsetMinutes] = useState(480);
  const [dayStartHourLocal, setDayStartHourLocal] = useState<23 | 0>(23);
  const [error, setError] = useState<string | null>(null);

  const previewUtc = useMemo(() => {
    try {
      return birthLocal ? toUtcIso(birthLocal, tzOffsetMinutes) : "";
    } catch {
      return "";
    }
  }, [birthLocal, tzOffsetMinutes]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!birthLocal) {
      setError("Birth datetime is required.");
      return;
    }

    try {
      const birthIsoUtc = toUtcIso(birthLocal, tzOffsetMinutes);
      const params = new URLSearchParams({
        birthIsoUtc,
        gender,
        tzOffsetMinutes: String(tzOffsetMinutes),
        dayStartHourLocal: String(dayStartHourLocal),
      });
      router.push(`/report?${params.toString()}`);
    } catch {
      setError("Could not parse the birth datetime. Please check your input.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Hourly Choice Engine</h1>
          <p className="mt-2 text-sm text-slate-600">
            Enter your birth details to generate an MVP BaZi + DaYun interpretation report.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <div>
              <label htmlFor="birthLocal" className="mb-2 block text-sm font-medium text-slate-700">
                Birth date &amp; time
              </label>
              <input
                id="birthLocal"
                type="datetime-local"
                required
                value={birthLocal}
                onChange={(event) => setBirthLocal(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="gender" className="mb-2 block text-sm font-medium text-slate-700">
                  Gender
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(event) => setGender(event.target.value as "male" | "female")}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label htmlFor="tzOffsetMinutes" className="mb-2 block text-sm font-medium text-slate-700">
                  Timezone offset (minutes)
                </label>
                <input
                  id="tzOffsetMinutes"
                  type="number"
                  value={tzOffsetMinutes}
                  onChange={(event) => setTzOffsetMinutes(Number(event.target.value))}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dayRollover" className="mb-2 block text-sm font-medium text-slate-700">
                Day rollover rule
              </label>
              <select
                id="dayRollover"
                value={dayStartHourLocal}
                onChange={(event) => setDayStartHourLocal(Number(event.target.value) as 23 | 0)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              >
                <option value={23}>23:00 Zi-hour</option>
                <option value={0}>00:00 next-day</option>
              </select>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-600 ring-1 ring-slate-200">
              <span className="font-medium text-slate-800">UTC preview:</span> {previewUtc || "—"}
            </div>

            {error ? <p className="text-sm text-rose-600">{error}</p> : null}

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Generate report
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
