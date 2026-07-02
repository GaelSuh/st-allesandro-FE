"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-all duration-200 focus-ring select-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-brand-700)] text-white shadow-soft hover:bg-[var(--color-brand-800)] hover:shadow-elevated",
        gold:
          "bg-gradient-to-b from-[var(--color-gold-500)] to-[var(--color-gold-600)] text-[var(--color-brand-950)] shadow-soft hover:shadow-glow",
        secondary:
          "bg-surface-elevated text-fg-primary border border-default hover:bg-surface-sunken hover:border-strong shadow-soft",
        outline:
          "border border-strong bg-transparent text-fg-primary hover:bg-surface-sunken",
        ghost:
          "bg-transparent text-fg-secondary hover:bg-surface-sunken hover:text-fg-primary",
        link: "bg-transparent text-[var(--color-brand-600)] underline-offset-4 hover:underline px-0",
        danger:
          "bg-[oklch(0.58_0.205_25)] text-white shadow-soft hover:bg-[oklch(0.52_0.205_25)]",
        success:
          "bg-[oklch(0.50_0.155_155)] text-white shadow-soft hover:bg-[oklch(0.44_0.155_155)]",
      },
      size: {
        xs: "h-8 px-3 text-xs",
        sm: "h-9 px-3.5 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-5 text-base",
        xl: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
        "icon-sm": "h-8 w-8 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild, loading, leftIcon, rightIcon, children, disabled, ...props },
    ref
  ) => {
    const startIcon = loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon;
    const endIcon = !loading ? rightIcon : null;

    // When `asChild` is true we ALWAYS render through Radix Slot. Keying the
    // branch off the `asChild` prop alone (not `isValidElement(children)`) keeps
    // the chosen element type identical on the server and the client, avoiding a
    // hydration mismatch across the RSC boundary.
    //
    // Pass the child straight through to Slot whenever there are no Button-level
    // icons to splice — this mirrors the standard shadcn/Radix pattern that is
    // known to hydrate cleanly from Server Components. Only when `leftIcon` /
    // `rightIcon` / `loading` are supplied do we clone the child to insert them
    // inside it (Slot requires a single element child).
    if (asChild) {
      const hasIcons = Boolean(startIcon || endIcon);
      let content: React.ReactNode = children;
      if (hasIcons && React.isValidElement(children)) {
        type AnyChild = React.ReactElement<{ children?: React.ReactNode }>;
        const child = children as AnyChild;
        content = React.cloneElement(
          child,
          undefined,
          <>
            {startIcon}
            {child.props.children}
            {endIcon}
          </>
        );
      }
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          className={cn(buttonVariants({ variant, size }), className)}
          {...props}
        >
          {content}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
