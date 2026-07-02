"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, error, type = "text", ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-fg-tertiary">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            "flex h-11 w-full rounded-xl bg-surface px-3.5 py-2 text-sm text-fg-primary",
            "border border-default placeholder:text-fg-tertiary",
            "transition-colors focus:outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[var(--color-brand-500)]/10",
            "disabled:cursor-not-allowed disabled:opacity-60",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error && "border-[oklch(0.58_0.205_25)] focus:border-[oklch(0.58_0.205_25)] focus:ring-[oklch(0.58_0.205_25)]/10",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute inset-y-0 right-3 flex items-center text-fg-tertiary">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }>(
  ({ className, error, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[100px] w-full rounded-xl bg-surface px-3.5 py-2.5 text-sm text-fg-primary",
        "border border-default placeholder:text-fg-tertiary",
        "transition-colors focus:outline-none focus:border-[var(--color-brand-500)] focus:ring-4 focus:ring-[var(--color-brand-500)]/10",
        "disabled:cursor-not-allowed disabled:opacity-60 resize-y",
        error && "border-[oklch(0.58_0.205_25)] focus:border-[oklch(0.58_0.205_25)] focus:ring-[oklch(0.58_0.205_25)]/10",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
