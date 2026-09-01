import { usePosStore } from "@/store/usePosStore";
import React from "react";

export const OrderDisplayShell: React.FC = () => {
  const currentServeType = usePosStore((state) => state.currentServeType);

  return (
    <section
      data-testid="section-3-order-display"
      className="flex-[5] bg-[#94a3b8]/40 border-r border-b border-[#64748b] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top Purple Order Status Strip */}
      <div className="h-[34px] bg-[#312e81] border-b border-[#1e1b4b] flex items-stretch text-xs font-black">
        <div
          data-testid="order-serve-type"
          className="w-1/2 flex items-center px-3 text-[#ff6b6b] border-r border-[#4338ca] uppercase tracking-wide truncate"
        >
          {currentServeType}
        </div>
        <div
          data-testid="order-number"
          className="w-1/2 flex items-center justify-end px-3 text-[#ff6b6b] uppercase tracking-wide truncate"
        >
          Order No: 0100002787
        </div>
      </div>

      {/* Main Order Items List Container (Grey display viewport) */}
      <div className="flex-1 bg-[#64748b]/20 p-2 overflow-y-auto font-mono text-xs flex flex-col justify-between">
        <div className="text-slate-400 italic text-center mt-6">
          [ Order Display Section - Ready for Ticket 03 ]
        </div>

        {/* Order Summary Area */}
        <div className="border-t border-[#cbd5e1] pt-1 text-slate-700 font-bold space-y-0.5 text-right px-2">
          <div className="flex justify-between text-xs">
            <span>Total Quantity</span>
            <span>0</span>
          </div>
          <div className="flex justify-between text-xs">
            <span>Tax Amount</span>
            <span>0</span>
          </div>
          <div className="flex justify-between text-xs text-slate-900 font-black">
            <span>Total Amount</span>
            <span>0</span>
          </div>
        </div>
      </div>
    </section>
  );
};
