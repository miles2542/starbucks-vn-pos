import type { ButtonVariant } from "@/types/pos";
import clsx from "clsx";
import React from "react";

interface PosButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isActive?: boolean;
  children?: React.ReactNode;
}

export const PosButton: React.FC<PosButtonProps> = ({
  variant = "default",
  isActive = false,
  className,
  children,
  disabled,
  ...props
}) => {
  if (variant === "empty" || !children) {
    return <div className={clsx("pos-cell-empty w-full h-full", className)} />;
  }

  const variantClass = {
    default: "pos-btn-default",
    category: "pos-btn-default",
    "category-green": "pos-btn-green",
    "category-cyan": "pos-btn-cyan",
    "modifier-red": "pos-btn-red",
    "tender-cyan": "pos-btn-tender-cyan",
    "tender-grey": "pos-btn-tender-grey",
    "serve-yellow": "pos-btn-yellow",
    "nav-blue": "pos-btn-blue",
    empty: "pos-cell-empty",
  }[variant];

  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        "pos-btn-base w-full h-full text-xs font-bold uppercase tracking-tight select-none",
        variantClass,
        isActive && "pos-btn-category-active ring-1 ring-sky-500",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
