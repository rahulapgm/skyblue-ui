"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "./utils";

type RevealFrom = "up" | "down" | "left" | "right";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  duration?: number;
  amount?: number;
  once?: boolean;
  from?: RevealFrom;
};

type FloatProps = HTMLMotionProps<"div"> & {
  children?: ReactNode;
  x?: number[];
  y?: number[];
  scale?: number[];
  duration?: number;
  ease?: "easeInOut" | "easeIn" | "easeOut" | "linear";
};

function getRevealInitial(from: RevealFrom) {
  if (from === "left") {
    return { opacity: 0, x: -24 };
  }

  if (from === "right") {
    return { opacity: 0, x: 24 };
  }

  if (from === "down") {
    return { opacity: 0, y: -20 };
  }

  return { opacity: 0, y: 20 };
}

function getRevealVisible(from: RevealFrom) {
  if (from === "left" || from === "right") {
    return { opacity: 1, x: 0 };
  }

  return { opacity: 1, y: 0 };
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  amount = 0.18,
  once = true,
  from = "up",
  ...props
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      initial={prefersReducedMotion ? false : getRevealInitial(from)}
      whileInView={prefersReducedMotion ? undefined : getRevealVisible(from)}
      viewport={{ once, amount }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function Float({
  children,
  className,
  x,
  y = [0, 16, 0],
  scale,
  duration = 5,
  ease = "easeInOut",
  ...props
}: FloatProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      {...props}
      animate={
        prefersReducedMotion
          ? { opacity: 1 }
          : {
              ...(x ? { x } : {}),
              ...(y ? { y } : {}),
              ...(scale ? { scale } : {}),
            }
      }
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease,
            }
      }
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
