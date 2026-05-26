import { Fragment } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

import { Badge } from "./badge";
import { cn } from "./utils";

export type StepItem = {
  title: string;
  description?: string;
};

type StepsProps = {
  items: StepItem[];
  current: number;
  className?: string;
};

const statusLabels = {
  completed: "Completed",
  current: "Ongoing",
  upcoming: "Upcoming",
} as const;

function getConnectorClass(stepNumber: number, current: number) {
  if (stepNumber < current - 1) {
    return "bg-(--color-status-success)";
  }

  if (stepNumber === current - 1) {
    return "bg-(--color-brand-primary)";
  }

  return "bg-(--line-soft)";
}

function getConnectorIconClass(stepNumber: number, current: number) {
  if (stepNumber < current - 1) {
    return "text-(--color-status-success)";
  }

  if (stepNumber === current - 1) {
    return "text-(--color-brand-primary)";
  }

  return "text-(--ink-subtle)";
}

export function Steps({ items, current, className }: StepsProps) {
  return (
    <div role="list" className={cn("w-full overflow-hidden", className)}>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-stretch xl:gap-5">
        {items.map((item, index) => {
          const status = index + 1 < current ? "completed" : index + 1 === current ? "current" : "upcoming";

          return (
            <Fragment key={item.title}>
              <div className="min-w-0 flex-1">
                <div
                  aria-current={status === "current" ? "step" : undefined}
                  className={cn(
                    "relative min-w-0 rounded-3xl border px-5 py-5 shadow-(--shadow-sm) sm:px-6 sm:py-6",
                    status === "completed" &&
                      "border-(--color-status-success-light) bg-(--color-status-success-light)/45",
                    status === "current" &&
                      "border-(--color-brand-primary-light) bg-(--color-brand-primary-light)/5 ring-2 ring-(--color-brand-primary-light)/80",
                    status === "upcoming" && "border-(--line-soft) bg-(--surface-card)",
                  )}
                  role="listitem"
                >
                  <div className="absolute right-3 top-2">
                    <Badge
                      tone={status === "completed" ? "success" : status === "current" ? "brand" : "neutral"}
                      size="sm"
                    >
                      {statusLabels[status]}
                    </Badge>
                  </div>
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="min-w-0 flex-1">
                      <h3 className="mt-1 pr-28 text-base font-extrabold leading-tight text-(--foreground) sm:pr-32 sm:text-lg">
                        {item.title}
                      </h3>
                      {item.description ? (
                        <p className="mt-2 max-w-[22ch] text-sm font-semibold leading-6 text-(--ink-muted)">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {index < items.length - 1 ? (
                <div className="flex justify-center py-1 xl:w-20 xl:flex-none xl:items-center xl:py-0">
                  <div className="flex flex-col items-center gap-2 xl:w-full xl:flex-row xl:gap-2">
                    <span className={cn("h-8 w-px xl:hidden", getConnectorClass(index + 1, current))} />
                    <ArrowDown
                      className={cn("h-4 w-4 xl:hidden", getConnectorIconClass(index + 1, current))}
                    />
                    <span
                      className={cn("hidden h-px flex-1 xl:block", getConnectorClass(index + 1, current))}
                    />
                    <ArrowRight
                      className={cn("hidden h-4 w-4 xl:block", getConnectorIconClass(index + 1, current))}
                    />
                  </div>
                </div>
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
