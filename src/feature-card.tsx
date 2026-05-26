import type { ReactNode } from "react";

import { Card } from "./card";
import { cn } from "./utils";

type FeatureCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  eyebrow?: string;
  className?: string;
};

export function FeatureCard({ title, description, icon, eyebrow, className }: FeatureCardProps) {
  return (
    <Card tone="glass" padding="md" className={cn("h-full", className)}>
      <div className="flex items-start gap-4">
        {icon ? (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand-primary-light) text-(--color-brand-primary)">
            {icon}
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          {eyebrow ? <p className="type-overline mb-1 text-(--color-brand-primary)">{eyebrow}</p> : null}
          <h3 className="type-subheading text-(--foreground)">{title}</h3>
        </div>
      </div>

      <p className="type-body mt-4 text-(--ink-muted)">{description}</p>
    </Card>
  );
}
