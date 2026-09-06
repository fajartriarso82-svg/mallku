"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronsUpDown, ArrowUp, ArrowDown, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  className?: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  rowKey,
  pageSize = 8,
  onRowClick,
  emptyState,
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(1);
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  // Reset page jika data berubah drastis
  React.useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const sorted = React.useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return data;
    const arr = [...data];
    arr.sort((a, b) => {
      const va = col.sortValue!(a);
      const vb = col.sortValue!(b);
      if (typeof va === "number" && typeof vb === "number") return va - vb;
      return String(va).localeCompare(String(vb), "id");
    });
    return sortDir === "asc" ? arr : arr.reverse();
  }, [data, sortKey, sortDir, columns]);

  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);

  function toggleSort(key: string) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  if (data.length === 0) {
    return (
      <div className="py-14 text-center">
        {emptyState ?? (
          <div className="flex flex-col items-center text-slate-400">
            <Inbox className="h-10 w-10 mb-2" />
            <p className="text-sm font-medium">Belum ada data</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn("px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-400", col.className)}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => toggleSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-slate-700 transition-colors"
                    >
                      {col.header}
                      {sortKey === col.key ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3 w-3" />
                        ) : (
                          <ArrowDown className="h-3 w-3" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3 w-3 opacity-50" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {paged.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  "transition-colors",
                  onRowClick ? "cursor-pointer hover:bg-slate-50" : ""
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("px-3 py-3 align-middle", col.className)}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <p className="text-xs text-slate-500">
            Menampilkan {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, data.length)} dari{" "}
            {data.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 text-xs font-semibold text-slate-600">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
