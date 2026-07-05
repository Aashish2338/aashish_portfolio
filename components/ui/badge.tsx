import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink/10 bg-ink/5 px-3 py-1 text-xs font-medium text-ink/80 dark:border-white/10 dark:bg-white/5 dark:text-paper/80",
        className
      )}
    >
      {children}
    </span>
  );
}
