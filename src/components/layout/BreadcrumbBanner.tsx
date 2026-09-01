import { usePosStore } from "@/store/usePosStore";
import React from "react";

export const BreadcrumbBanner: React.FC = () => {
  const breadcrumb = usePosStore((state) => state.breadcrumb);
  const multiplier = usePosStore((state) => state.multiplier);

  const pathString = breadcrumb.map((node) => node.label).join(" > ");

  return (
    <div
      data-testid="breadcrumb-banner"
      className="h-[34px] bg-[#fefce8] border-y border-[#cbd5e1] flex items-stretch justify-between text-xs select-none shadow-sm"
    >
      {/* Left Path String */}
      <div className="flex items-center px-3 font-bold text-[#1e1b4b] tracking-wide text-sm truncate">
        {pathString || "HOT ESP"}
      </div>

      {/* Right Multiplier Indicator Badge (aligned with Col 7 of Section II) */}
      <div
        data-testid="multiplier-badge"
        className="w-[14.28%] min-w-[90px] bg-[#2e1065] border-l border-[#1e1b4b] flex items-center justify-center font-black text-sm tracking-wider text-[#ef4444] shadow-inner"
      >
        X{multiplier}
      </div>
    </div>
  );
};
