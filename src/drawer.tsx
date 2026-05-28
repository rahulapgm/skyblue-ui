import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, type ReactNode } from "react";
import { X } from "lucide-react";

import { Button } from "./button";
import { cn } from "./utils";

type DrawerSide = "left" | "right";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  side?: DrawerSide;
  className?: string;
};

const sideClasses: Record<DrawerSide, string> = {
  left: "left-0",
  right: "right-0",
};

const panelMotion: Record<DrawerSide, { initial: { x: string }; exit: { x: string } }> = {
  left: {
    initial: { x: "-100%" },
    exit: { x: "-100%" },
  },
  right: {
    initial: { x: "100%" },
    exit: { x: "100%" },
  },
};

export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  side = "right",
  className,
}: DrawerProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div className="absolute inset-0 bg-[rgba(11,26,42,0.48)]" onClick={onClose} aria-hidden />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            initial={panelMotion[side].initial}
            animate={{ x: 0 }}
            exit={panelMotion[side].exit}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={cn(
              "absolute top-0 h-full w-full max-w-xl overflow-y-auto border-(--line-soft) bg-(--surface-card) p-6 shadow-(--shadow-lg)",
              sideClasses[side],
              side === "left" ? "border-r" : "border-l",
              className,
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id={titleId} className="type-subheading">
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="type-body mt-2 text-(--ink-muted)">
                    {description}
                  </p>
                ) : null}
              </div>
              <Button
                onClick={onClose}
                variant="tertiary"
                size="sm"
                aria-label="Close drawer"
                className="min-h-10 px-3"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-6">{children}</div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
