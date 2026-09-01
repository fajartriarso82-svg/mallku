import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { cn, formatRupiah } from "@/lib/utils";

export interface KPICardItem {
  title: string;
  value: string | number;
  change?: {
    percentage: number;
    isPositive?: boolean;
    period?: string;
  };
  icon: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

interface KPICardsProps {
  data: KPICardItem[];
  columns?: 1 | 2 | 3 | 4;
}

export function KPICards({ data, columns = 3 }: KPICardsProps) {
  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };

  const formatNumber = (value: string | number) => {
    if (typeof value === "number") {
      return value.toLocaleString("id-ID");
    }
    return value;
  };

  return (
    <div className={cn("grid gap-4", getGridCols())}>
      {data.map((item, index) => {
        const isPos = item.change ? item.change.percentage >= 0 : true;
        return (
          <Card key={index} className="border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle className="text-sm font-medium text-slate-500">{item.title}</CardTitle>
                <div className="text-2xl font-bold text-slate-800">{formatNumber(item.value)}</div>
                {item.change && (
                  <div className={cn("flex items-center text-xs font-semibold", isPos ? "text-emerald-600" : "text-rose-600")}>
                    {isPos ? (
                      <TrendingUp className="mr-1 h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="mr-1 h-3.5 w-3.5" />
                    )}
                    <span>{Math.abs(item.change.percentage)}%</span>
                    <span className="text-slate-400 font-normal ml-1">dari {item.change.period || "bulan lalu"}</span>
                  </div>
                )}
              </div>
              <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", item.iconBgColor || "bg-slate-100")}>
                <div className={item.iconColor || "text-slate-600"}>{item.icon}</div>
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
}