"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardData {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg?: string;
  change?: number;
  changeLabel?: string;
  hint?: string;
  accent?: "blue" | "amber" | "red" | "emerald" | "slate";
}

const accentMap = {
  blue: { ring: "bg-sky-50 text-sky-600" },
  amber: { ring: "bg-amber-50 text-amber-600" },
  red: { ring: "bg-rose-50 text-rose-600" },
  emerald: { ring: "bg-emerald-50 text-emerald-600" },
  slate: { ring: "bg-slate-100 text-slate-600" },
};

export function StatCard({ data }: { data: StatCardData }) {
  const accent = accentMap[data.accent ?? "blue"];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{data.label}</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-800">{data.value}</p>
          {(data.change !== undefined || data.hint) && (
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              {data.change !== undefined && (
                <span
                  className={cn(
                    "inline-flex items-center gap-0.5 font-bold",
                    data.change >= 0 ? "text-emerald-600" : "text-rose-600"
                  )}
                >
                  {data.change >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(data.change)}%
                </span>
              )}
              <span className="text-slate-400">{data.changeLabel ?? data.hint}</span>
            </div>
          )}
        </div>
        <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", accent.ring)}>
          {data.icon}
        </div>
      </div>
    </div>
  );
}
