import type { ReactNode } from "react";

import { cn } from "./utils";

export type TableColumn<T> = {
  key: string;
  header: ReactNode;
  align?: "left" | "center" | "right";
  width?: string;
  render: (row: T, rowIndex: number) => ReactNode;
};

type TableProps<T> = {
  columns: Array<TableColumn<T>>;
  rows: T[];
  rowKey: (row: T, rowIndex: number) => string;
  emptyState?: ReactNode;
  className?: string;
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export function Table<T>({
  columns,
  rows,
  rowKey,
  emptyState = "No records found.",
  className,
}: TableProps<T>) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-(--line-soft) bg-(--surface-card) shadow-(--shadow-sm)",
        className,
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-(--color-surface-muted)">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "type-overline px-4 py-3 text-(--ink-subtle)",
                    alignClasses[column.align ?? "left"],
                  )}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row, rowIndex) => (
                <tr key={rowKey(row, rowIndex)} className="border-t border-(--line-soft)">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        "type-body px-4 py-4 align-top text-(--foreground)",
                        alignClasses[column.align ?? "left"],
                      )}
                    >
                      {column.render(row, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="type-body px-4 py-10 text-center text-(--ink-subtle)">
                  {emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
