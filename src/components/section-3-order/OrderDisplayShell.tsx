import { usePosStore } from "@/store/usePosStore";
import clsx from "clsx";
import React from "react";

const getServeTypeSuffix = (itemServeType?: string, globalServeType?: string): string => {
  if (!itemServeType || itemServeType === globalServeType || globalServeType === "Not Set") {
    return "";
  }
  switch (itemServeType) {
    case "BYO":
      return "B";
    case "To Go":
      return "T";
    case "For Here":
      return "H";
    case "B2BTS":
      return "S";
    default:
      return "";
  }
};

export const OrderDisplayShell: React.FC = () => {
  const currentServeType = usePosStore((state) => state.currentServeType);
  const orderItems = usePosStore((state) => state.orderItems);
  const selectedLineId = usePosStore((state) => state.selectedLineId);
  const selectLine = usePosStore((state) => state.selectLine);
  const orderNumber = usePosStore((state) => state.orderNumber);

  const totalQuantity = React.useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [orderItems]);

  const totalAmount = React.useMemo(() => {
    return orderItems.reduce((sum, item) => {
      const itemBaseTotal = item.unitPrice * item.quantity;
      const modifiersTotal = (item.modifiers || []).reduce(
        (mSum, mod) => mSum + mod.price * (mod.quantity ?? 1),
        0,
      );
      return sum + itemBaseTotal + modifiersTotal;
    }, 0);
  }, [orderItems]);

  const taxAmount = React.useMemo(() => {
    if (totalAmount === 0) return 0;
    return Math.round((totalAmount * 8) / 108);
  }, [totalAmount]);

  return (
    <section
      data-testid="section-3-order-display"
      className="flex-[5] bg-[#9ba9b8] border-r border-b border-[#64748b] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Top Purple Order Status Strip */}
      <div className="h-[34px] bg-[#433e75] border-b border-[#2e2a52] flex items-stretch text-xs font-black">
        <div
          data-testid="order-serve-type"
          className="w-1/2 flex items-center px-3 text-[#ff7777] border-r border-[#57528e] uppercase tracking-wide truncate"
        >
          {currentServeType}
        </div>
        <div
          data-testid="order-number"
          className="w-1/2 flex items-center justify-end px-3 text-[#ff7777] uppercase tracking-wide truncate"
        >
          Order No:{orderNumber}
        </div>
      </div>

      {/* Main Order Items List Container */}
      <div className="flex-1 bg-[#8f9fae] p-1 overflow-y-auto font-sans flex flex-col justify-between">
        <div className="flex flex-col gap-0.5" data-testid="order-items-list">
          {orderItems.map((item, index) => {
            const isItemSelected = selectedLineId === item.id;
            const suffix = getServeTypeSuffix(item.serveType, currentServeType);
            const lineLabel = `${index + 1}${suffix}`;

            return (
              <React.Fragment key={item.id}>
                {/* Parent Beverage Row */}
                <div
                  data-testid={`order-item-row-${item.id}`}
                  onClick={() => selectLine(item.id)}
                  className={clsx(
                    "flex items-center px-2 py-1 cursor-pointer text-xs font-bold transition-colors select-none",
                    isItemSelected
                      ? "bg-[#a2c374] text-[#111827] shadow-sm"
                      : "bg-[#cfd7df] text-[#1e293b] hover:bg-[#d8e0e7]",
                  )}
                >
                  {/* Line Number */}
                  <span data-testid="order-item-line-number" className="w-6 text-left shrink-0">
                    {lineLabel}
                  </span>

                  {/* Item Name */}
                  <span data-testid="order-item-name" className="flex-1 text-left truncate pr-1">
                    {item.name}
                  </span>

                  {/* Quantity */}
                  <span className="w-8 text-center shrink-0">{item.quantity}</span>

                  {/* Price */}
                  <span className="w-20 text-right shrink-0">
                    {(item.unitPrice * item.quantity).toLocaleString("en-US")}
                  </span>
                </div>

                {/* Modifiers Sub-lines */}
                {(item.modifiers || []).map((mod) => {
                  const isModSelected = selectedLineId === mod.id;

                  return (
                    <div
                      key={mod.id}
                      data-testid={`order-modifier-row-${mod.id}`}
                      onClick={() => selectLine(mod.id)}
                      className={clsx(
                        "flex items-center px-2 py-0.5 cursor-pointer text-xs font-semibold transition-colors select-none pl-6",
                        isModSelected
                          ? "bg-[#a2c374] text-[#111827] shadow-sm"
                          : "bg-[#cfd7df]/80 text-[#1e293b] hover:bg-[#d8e0e7]",
                      )}
                    >
                      {/* Blank line number column for alignment */}
                      <span className="w-4 text-left shrink-0" />

                      {/* Indented Modifier Name */}
                      <span className="flex-1 text-left truncate pr-1 text-[#334155]">
                        &gt; {mod.name}
                      </span>

                      {/* Quantity */}
                      <span className="w-8 text-center shrink-0">
                        {mod.quantity !== undefined && mod.quantity > 1 ? mod.quantity : ""}
                      </span>

                      {/* Modifier Price */}
                      <span className="w-20 text-right shrink-0 text-[#334155]">
                        {(mod.price * (mod.quantity ?? 1)).toLocaleString("en-US")}
                      </span>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>

        {/* Order Summary Area */}
        <div
          data-testid="order-summary-box"
          className="bg-[#c2d5e8] border border-[#a8c2dc] p-1.5 text-xs font-bold text-slate-800 space-y-0.5 mt-1"
        >
          <div className="flex items-center">
            <span className="w-28 text-left">Total Quantity</span>
            <span className="flex-1 text-center font-bold" data-testid="summary-total-quantity">
              {totalQuantity}
            </span>
            <span className="w-24 text-right font-black" data-testid="summary-running-amount">
              {totalAmount.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="w-28 text-left">Tax Amount</span>
            <span className="w-24 text-right font-bold" data-testid="summary-tax-amount">
              {taxAmount.toLocaleString("en-US")}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-950 font-black">
            <span className="w-28 text-left">Total Amount</span>
            <span className="w-24 text-right font-black" data-testid="summary-total-amount">
              {totalAmount.toLocaleString("en-US")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
