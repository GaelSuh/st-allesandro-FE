import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

export function Container({ className, size = "xl", ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)} {...props} />;
}

export function Section({
  className,
  children,
  eyebrow,
  title,
  description,
  align = "center",
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  eyebrow?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", className)} {...props}>
      <Container>
        {(eyebrow || title || description) && (
          <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
            {eyebrow && (
              <p className="inline-flex items-center gap-2 rounded-full border border-default bg-surface-elevated px-3 py-1 text-xs font-medium tracking-wide text-[var(--color-brand-700)] shadow-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-500)]" />
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg-primary sm:text-4xl lg:text-5xl text-balance">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base leading-relaxed text-fg-secondary sm:text-lg text-pretty">
                {description}
              </p>
            )}
          </div>
        )}
        <div className={cn((eyebrow || title || description) && "mt-12 sm:mt-16")}>{children}</div>
      </Container>
    </section>
  );
}
