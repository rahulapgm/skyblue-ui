import { AnimatePresence, motion } from "framer-motion";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { CheckCircle2, Info, OctagonAlert, TriangleAlert, X } from "lucide-react";

import { cn } from "./utils";

type ToastTone = "success" | "info" | "warning" | "error";

type ToastItem = {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
};

type ToastContextValue = {
  showToast: (toast: Omit<ToastItem, "id">) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toneClasses: Record<ToastTone, string> = {
  success: "border-(--color-status-success-light) bg-(--surface-card) text-(--foreground)",
  info: "border-(--color-status-info-light) bg-(--surface-card) text-(--foreground)",
  warning: "border-(--color-status-warning-light) bg-(--surface-card) text-(--foreground)",
  error: "border-(--color-status-error-light) bg-(--surface-card) text-(--foreground)",
};

const toneIcons = {
  success: <CheckCircle2 className="h-5 w-5 text-(--color-status-success)" />,
  info: <Info className="h-5 w-5 text-(--color-status-info)" />,
  warning: <TriangleAlert className="h-5 w-5 text-(--color-status-warning)" />,
  error: <OctagonAlert className="h-5 w-5 text-(--color-status-error)" />,
} as const;

function createToastId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast: (toast) => {
        const id = createToastId();
        setToasts((current) => [...current, { ...toast, id }]);
        window.setTimeout(() => {
          setToasts((current) => current.filter((item) => item.id !== id));
        }, 3500);
      },
      dismissToast: (id) => {
        setToasts((current) => current.filter((item) => item.id !== id));
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={value.dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}

type ToastViewportProps = {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
};

function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  return (
    <div className="pointer-events-none fixed bottom-6 left-6 right-6 z-50 flex flex-col gap-3 sm:left-auto sm:w-full sm:max-w-sm">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={() => onDismiss(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

type ToastProps = ToastItem & {
  onDismiss?: () => void;
  action?: ReactNode;
};

export function Toast({ title, description, tone, onDismiss, action }: ToastProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn("pointer-events-auto rounded-lg border p-4 shadow-(--shadow-lg)", toneClasses[tone])}
      role="status"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{toneIcons[tone]}</div>
        <div className="min-w-0 flex-1">
          <p className="type-title">{title}</p>
          {description ? <p className="type-body mt-1 text-(--ink-muted)">{description}</p> : null}
          {action ? <div className="mt-3">{action}</div> : null}
        </div>
        {onDismiss ? (
          <button
            type="button"
            onClick={onDismiss}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-(--ink-subtle) transition-colors hover:bg-(--color-surface-hover)"
            aria-label="Dismiss toast"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </motion.div>
  );
}
