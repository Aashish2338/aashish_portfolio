import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "focus-ring w-full rounded-xl border border-ink/15 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-muted dark:border-white/10 dark:bg-white/5 dark:text-paper",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
