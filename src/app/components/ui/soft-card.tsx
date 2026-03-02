"use client";

import type { HTMLAttributes, ReactNode } from "react";

type SoftCardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "section" | "aside" | "header" | "li";
  interactive?: boolean;
  organicCorners?: boolean;
  children?: ReactNode;
};

function joinClasses(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export default function SoftCard({
  as = "div",
  interactive = false,
  organicCorners = false,
  className,
  style,
  children,
  ...rest
}: SoftCardProps) {
  const Tag = as;

  return (
    <Tag
      className={joinClasses(
        "ui-soft-card",
        interactive && "ui-soft-card--interactive",
        className,
      )}
      style={{
        ...(organicCorners ? { borderRadius: "var(--radius-organic)" } : null),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
