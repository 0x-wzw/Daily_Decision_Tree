"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Severity } from "@/lib/interpretation/types";

type ApiResponse = {
  bazi: {
    year: { zh: string };
    month: { zh: string };
    day: { zh: string };
    hour: { zh: string };
    elements: Record<string, number>;
  };
  dayun: {
    periods: Array<{
      n: number;
      pillarZh: string;
      ageStart: number;
      ageEnd: number;
      startUtc: string;
      endUtc: string;
    }>;
  };
  report: {
    balanceIndex: number;
    cards: Array<{
      id: string;
      title: string;
      severity: Severity;
      why: string;
      whatToDo: string[];
      tags: string[];
    }>;
    notes: string[];
  };
};

const severityStyle: Record<Severity, string> = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  med: "bg-amber-50 text-amber-700 ring-amber-200",
  high: "bg-rose-50 text-rose-700 ring-rose-200",
};

const fmtUtc = (value: string) => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toISOString().slice(0, 10);
};

export default function ReportPage() {
  const params = useSearchParams();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestBody = useMemo(() => {
    const birthIsoUtc = params.get("birthIsoUtc") ?? "";
    const gender = (params.get("gender") ?? "male") as "male" | "female";
    const tzOffsetMinutes = Number(params.get("tzOffsetMinutes") ?? "480");
    const dayStartHourLocal = Number(params.get("dayStartHourLocal") ?? "23") === 0 ? 0 : 23;
    return { birthIsoUtc, gender, tzOffsetMinutes, dayStartHourLocal };
  }, [params]);

  useEffect(() => {
    if (!requestBody.birthIsoUtc) {
      setError("Missing required query parameter: birthIsoUtc");
      setLoading(false);
      return;
    }

    let active = true;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/bazi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "Failed to generate report.");
        }

        const json = (await response.json()) as ApiResponse;
        if (active) {
          setData(json);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unknown error.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    run();

    return () => {
      active = false;
    };
  }, [requestBody]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">Hourly Choice Engine Report</h1>
          <Link
            href="/"
            className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100"
          >
            ← Back to home
          </Link>
        </div>

        {loading ? (
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="text-sm text-slate-600">Generating deterministic report...</p>
          </section>
        ) : null}

        {!loading && error ? (
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-rose-200">
            <p className="text-sm text-rose-700">{error}</p>
          </section>
        ) : null}

        {!loading && !error && data ? (
          <>
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold">A) Four Pillars</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Year", data.bazi.year.zh],
                  ["Month", data.bazi.month.zh],
                  ["Day", data.bazi.day.zh],
                  ["Hour", data.bazi.hour.zh],
                ].map(([label, value]) => (
                  <article key={label} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="mt-2 text-2xl font-semibold">{value}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold">B) Five Elements</h2>
              <div className="mt-4 space-y-3">
                {Object.entries(data.bazi.elements).map(([name, value]) => {
                  const max = Math.max(...Object.values(data.bazi.elements), 1);
                  const pct = Math.max(6, (value / max) * 100);
                  return (
                    <div key={name}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium">{name}</span>
                        <span>{Number(value).toFixed(2)}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className="h-2 rounded-full bg-slate-800" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-slate-700">
                <span className="font-medium">Balance index:</span> {data.report.balanceIndex.toFixed(4)}
              </p>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold">C) Interpretation Cards</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {data.report.cards.length > 0 ? (
                  data.report.cards.map((card) => (
                    <article key={card.id} className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold">{card.title}</h3>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium uppercase ring-1 ${severityStyle[card.severity]}`}
                        >
                          {card.severity}
                        </span>
                      </div>
                      <p className="mt-3 text-sm text-slate-700">{card.why}</p>
                      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
                        {card.whatToDo.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex rounded-full bg-white px-2 py-1 text-xs text-slate-600 ring-1 ring-slate-200"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-sm text-slate-600">No interpretation cards were generated for this profile.</p>
                )}
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold">D) DaYun Timeline</h2>
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500">
                      <th className="px-3 py-2 font-medium">n</th>
                      <th className="px-3 py-2 font-medium">Luck Pillar</th>
                      <th className="px-3 py-2 font-medium">Age range</th>
                      <th className="px-3 py-2 font-medium">Approx UTC date range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.dayun.periods.map((period) => (
                      <tr key={`${period.n}-${period.pillarZh}`} className="border-b border-slate-100">
                        <td className="px-3 py-2">{period.n}</td>
                        <td className="px-3 py-2 font-medium">{period.pillarZh}</td>
                        <td className="px-3 py-2">
                          {period.ageStart} - {period.ageEnd}
                        </td>
                        <td className="px-3 py-2">
                          {fmtUtc(period.startUtc)} → {fmtUtc(period.endUtc)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-lg font-semibold">E) Notes</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
                {data.report.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}
