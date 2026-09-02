import type { ButtonVariant } from "@/types/pos";
import clsx from "clsx";
import React from "react";

interface PosButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isActive?: boolean;
  badge?: string | number;
  soldOut?: boolean;
  children?: React.ReactNode;
}

export const PosButton: React.FC<PosButtonProps> = ({
  variant = "default",
  isActive = false,
  badge,
  soldOut = false,
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
      disabled={disabled || soldOut}
      className={clsx(
        "pos-btn-base relative w-full h-full text-xs font-bold uppercase tracking-tight select-none overflow-hidden",
        variantClass,
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>

      {/* Top-Right Inventory Stock Count Badge */}
      {badge !== undefined && (
        <span
          data-testid="stock-badge"
          className="absolute top-0 right-0 z-20 bg-[#16a34a] text-white text-[10px] font-black px-1 py-0.2 leading-tight rounded-bl-[2px] shadow-sm pointer-events-none"
        >
          {badge}
        </span>
      )}

      {/* Sold-Out Authentic Red Diagonal Cross Overlay */}
      {soldOut && (
        <div
          data-testid="sold-out-cross"
          className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center p-1"
        >
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="10" y1="10" x2="90" y2="90" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
            <line x1="90" y1="10" x2="10" y2="90" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
      )}
    </button>
  );
};

