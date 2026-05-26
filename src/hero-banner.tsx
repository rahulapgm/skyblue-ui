import type { ReactNode } from "react";

import { Badge } from "./badge";
import { Button } from "./button";
import { Card } from "./card";
import { cn } from "./utils";

type HeroBannerAction = {
  label: string;
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

type HeroBannerProps = {
  eyebrow?: string;
  title: string;
  description: string;
  media?: ReactNode;
  actions?: HeroBannerAction[];
  highlights?: ReactNode;
  className?: string;
};

export function HeroBanner({
  eyebrow,
  title,
  description,
  media,
  actions,
  highlights,
  className,
}: HeroBannerProps) {
  return (
    <Card
      tone="glass"
      padding="xl"
      className={cn("overflow-hidden rounded-[calc(var(--radius-xl)+8px)]", className)}
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          {eyebrow ? <Badge tone="brand">{eyebrow}</Badge> : null}
          <h1
            className="type-display mt-4 max-w-3xl"
            style={{ letterSpacing: "var(--global-letter-spacing)" }}
          >
            {title}
          </h1>
          <p className="type-block mt-4 max-w-2xl text-(--ink-muted)">{description}</p>
          {actions?.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {actions.map((action) =>
                action.href ? (
                  <Button
                    key={`${action.href}-${action.label}`}
                    href={action.href}
                    ariaLabel={action.ariaLabel}
                    variant={action.variant ?? "primary"}
                  >
                    {action.label}
                  </Button>
                ) : (
                  <Button
                    key={action.label}
                    onClick={action.onClick}
                    aria-label={action.ariaLabel}
                    variant={action.variant ?? "primary"}
                  >
                    {action.label}
                  </Button>
                ),
              )}
            </div>
          ) : null}
          {highlights ? <div className="mt-6">{highlights}</div> : null}
        </div>
        {media ? <div>{media}</div> : null}
      </div>
    </Card>
  );
}
