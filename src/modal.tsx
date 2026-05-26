"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, type ReactNode } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

import { Button } from "./button";
import { Card } from "./card";
import { cn } from "./utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function Modal({ open, onClose, title, description, children, footer, className }: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const mounted = typeof document !== "undefined";

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

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div className="absolute inset-0 bg-[rgba(11,26,42,0.48)]" onClick={onClose} aria-hidden />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className={cn("relative z-10 w-full max-w-2xl", className)}
          >
            <Card
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={description ? descriptionId : undefined}
              className="flex max-h-[calc(100vh-2rem)] w-full flex-col overflow-hidden md:max-h-[calc(100vh-3rem)]"
              tone="surface"
              padding="lg"
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
                  aria-label="Close modal"
                  className="min-h-10 px-3"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-6 min-h-0 overflow-y-auto pr-1">{children}</div>
              {footer ? <div className="mt-6 flex flex-wrap justify-end gap-3">{footer}</div> : null}
            </Card>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
