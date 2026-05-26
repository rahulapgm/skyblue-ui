import type { ReactNode } from "react";

import { Badge } from "./badge";
import { cn } from "./utils";

type TimelineStatus = "completed" | "current" | "upcoming";

export type TimelineItem = {
  title: string;
  description?: string;
  meta?: ReactNode;
  status?: TimelineStatus;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

const dotClasses: Record<TimelineStatus, string> = {
  completed: "bg-(--color-status-success)",
  current: "bg-(--color-brand-primary) ring-4 ring-(--color-brand-primary-light)",
  upcoming: "bg-(--color-line-strong)",
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {items.map((item, index) => {
        const status = item.status ?? "upcoming";

        return (
          <div key={`${item.title}-${index}`} className="flex gap-4">
            <div className="flex w-6 flex-col items-center">
              <span className={cn("mt-1 h-3 w-3 rounded-full", dotClasses[status])} />
              {index < items.length - 1 ? (
                <span className="mt-2 h-full min-h-10 w-px bg-(--line-soft)" />
              ) : null}
            </div>
            <div className="flex-1 rounded-2xl border border-(--line-soft) bg-(--surface-card) p-4 shadow-(--shadow-sm)">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="type-title">{item.title}</h3>
                <Badge
                  tone={status === "completed" ? "success" : status === "current" ? "brand" : "neutral"}
                  size="sm"
                >
                  {status}
                </Badge>
              </div>
              {item.description ? (
                <p className="type-body mt-2 text-(--ink-muted)">{item.description}</p>
              ) : null}
              {item.meta ? <div className="mt-3">{item.meta}</div> : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
