import type { ReactNode } from "react";
import { CircleAlert, CircleCheckBig, Info, TriangleAlert } from "lucide-react";

import { cn } from "./utils";

type MessageTone = "info" | "success" | "warning" | "error";

type MessageBoxProps = {
  tone?: MessageTone;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

const toneClasses: Record<MessageTone, string> = {
  info: "border-(--color-status-info-light) bg-(--color-status-info-light)/60",
  success: "border-(--color-status-success-light) bg-(--color-status-success-light)/70",
  warning: "border-(--color-status-warning-light) bg-(--color-status-warning-light)/80",
  error: "border-(--color-status-error-light) bg-(--color-status-error-light)/70",
};

const toneIcons: Record<MessageTone, ReactNode> = {
  info: <Info className="h-5 w-5 text-(--color-status-info)" />,
  success: <CircleCheckBig className="h-5 w-5 text-(--color-status-success)" />,
  warning: <TriangleAlert className="h-5 w-5 text-(--color-status-warning)" />,
  error: <CircleAlert className="h-5 w-5 text-(--color-status-error)" />,
};

export function MessageBox({ tone = "info", title, description, actions, className }: MessageBoxProps) {
  return (
    <div
      className={cn("rounded-xl border p-4 shadow-(--shadow-sm)", toneClasses[tone], className)}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{toneIcons[tone]}</div>
        <div className="min-w-0 flex-1">
          <p className="type-title">{title}</p>
          {description ? <p className="type-body mt-2 text-(--ink-muted)">{description}</p> : null}
          {actions ? <div className="mt-3 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </div>
  );
}
