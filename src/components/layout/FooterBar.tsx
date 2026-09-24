import { CashierUserIcon } from "@/components/common/PosIcons";
import { usePosStore } from "@/store/usePosStore";
import React from "react";

export const FooterBar: React.FC = () => {
  const businessDate = usePosStore((state) => state.businessDate);
  const cashierName = usePosStore((state) => state.cashierName);
  const currentServeType = usePosStore((state) => state.currentServeType);

  return (
    <footer
      data-testid="footer-status-bar"
      className="h-[32px] bg-[#aeaeb0] border-t border-[#8e8e90] flex items-center justify-between px-3 text-[#000000] text-xs font-semibold select-none shrink-0"
    >
      {/* Left: Software Version */}
      <div className="flex items-center gap-2">
        <span className="font-bold tracking-tight text-neutral-800">OnePOS [2.0.15.0]</span>
      </div>

      {/* Right: Status Info */}
      <div className="flex items-center gap-4 text-xs">
        <span className="font-bold text-neutral-700">{currentServeType}</span>
        <span className="text-slate-400">|</span>
        <span className="font-semibold text-neutral-700">Business Date{businessDate}</span>
        <div className="flex items-center gap-1.5 font-bold text-neutral-800 bg-[#cbd5e1]/50 px-2 py-0.5 rounded">
          <CashierUserIcon className="w-3.5 h-3.5 text-teal-700" />
          <span>{cashierName}</span>
        </div>
      </div>
    </footer>
  );
};
