import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "focus-ring h-11 w-full rounded-xl border border-ink/15 bg-white/70 px-4 text-sm text-ink placeholder:text-muted dark:border-white/10 dark:bg-white/5 dark:text-paper",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
