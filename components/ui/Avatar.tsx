"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const sizeMap = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
  "2xl": "h-20 w-20 text-xl",
};

interface AvatarProps {
  src?: string;
  name?: string;
  size?: keyof typeof sizeMap;
  className?: string;
  ring?: boolean;
}

export function Avatar({ src, name = "?", size = "md", className, ring }: AvatarProps) {
  const fallback = name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <AvatarPrimitive.Root
      className={cn(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-surface-sunken align-middle font-semibold text-fg-secondary",
        ring && "ring-2 ring-[var(--color-gold-300)] ring-offset-2 ring-offset-[var(--surface-elevated)]",
        sizeMap[size],
        className
      )}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={name}
          className="aspect-square h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-brand-100)] to-[var(--color-brand-200)] text-[var(--color-brand-800)]">
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}

export function AvatarGroup({
  members,
  max = 4,
  size = "sm",
}: {
  members: { name: string; src?: string }[];
  max?: number;
  size?: keyof typeof sizeMap;
}) {
  const visible = members.slice(0, max);
  const overflow = members.length - visible.length;
  return (
    <div className="flex -space-x-2">
      {visible.map((m, i) => (
        <Avatar key={i} src={m.src} name={m.name} size={size} className="ring-2 ring-[var(--surface-elevated)]" />
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-surface-sunken text-fg-secondary ring-2 ring-[var(--surface-elevated)] font-semibold",
            sizeMap[size]
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
