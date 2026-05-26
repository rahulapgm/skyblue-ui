import type { ReactNode } from "react";
import { Ban, CheckCircle2, CircleAlert, Inbox, Info } from "lucide-react";

import { Card } from "./card";
import { cn } from "./utils";

type ResultStatus = "success" | "info" | "warning" | "error" | "empty";

type ResultProps = {
  status?: ResultStatus;
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

const defaultIcons: Record<ResultStatus, ReactNode> = {
  success: <CheckCircle2 className="h-8 w-8 text-(--color-status-success)" />,
  info: <Info className="h-8 w-8 text-(--color-status-info)" />,
  warning: <CircleAlert className="h-8 w-8 text-(--color-status-warning)" />,
  error: <Ban className="h-8 w-8 text-(--color-status-error)" />,
  empty: <Inbox className="h-8 w-8 text-(--ink-subtle)" />,
};

export function Result({ status = "info", title, description, icon, actions, className }: ResultProps) {
  return (
    <Card
      tone="surface"
      padding="lg"
      className={cn("flex flex-col items-start gap-4 text-left", className)}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-(--color-surface-muted)">
        {icon ?? defaultIcons[status]}
      </div>
      <div>
        <h3 className="type-subheading">{title}</h3>
        {description ? <p className="type-body mt-2 text-(--ink-muted)">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </Card>
  );
}
