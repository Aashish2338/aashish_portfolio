"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold shadow-[0_4px_16px_rgba(8,145,178,0.25)] hover:shadow-[0_6px_22px_rgba(8,145,178,0.4)] dark:from-cyan-400 dark:to-cyan-500 dark:text-[#030712] dark:shadow-[0_0_20px_rgba(0,242,254,0.35)] dark:hover:shadow-[0_0_30px_rgba(0,242,254,0.6)] hover:-translate-y-0.5",
        outline:
          "border border-slate-300 bg-white/60 text-slate-800 hover:border-cyan-600 hover:text-cyan-700 hover:bg-cyan-50/60 dark:border-white/15 dark:bg-transparent dark:text-paper dark:hover:text-cyan-300 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_15px_rgba(0,242,254,0.2)]",
        ghost:
          "bg-transparent text-slate-800 hover:bg-cyan-50 hover:text-cyan-700 dark:text-paper dark:hover:bg-cyan-500/10 dark:hover:text-cyan-300",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
