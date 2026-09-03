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
    case "B2BS":
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
      className="flex-[5] bg-[#7a7a78] border-r border-b border-[#000000] flex flex-col justify-start overflow-hidden select-none"
    >
      {/* Upper Row 1: Split Purple Row (#795fb3) */}
      <div className="h-[22px] bg-[#795fb3] flex items-stretch border-b border-[#000000] text-xs font-black shrink-0">
        <div className="w-[58%] border-r border-[#000000]" />
        <div className="w-[42%]" />
      </div>

      {/* Upper Row 2: Status & Order Number Row (#9c948e, text #b94026) */}
      <div className="h-[26px] bg-[#9c948e] flex items-stretch text-xs font-black border-b border-[#000000] shrink-0">
        <div
          data-testid="order-serve-type"
          className="w-[58%] flex items-center px-2 text-[#b94026] border-r border-[#000000] tracking-wide truncate"
        >
          {currentServeType}
        </div>
        <div
          data-testid="order-number"
          className="w-[42%] flex items-center justify-end px-2 text-[#b94026] tracking-wide truncate"
        >
          Order No:{orderNumber}
        </div>
      </div>

      {/* Main Order Items List Container */}
      <div className="flex-1 bg-[#7a7a78] p-0.5 overflow-y-auto font-sans flex flex-col justify-start">
        <div className="flex flex-col gap-[1px]" data-testid="order-items-list">
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
                    "flex items-center px-2 py-1 cursor-pointer text-xs font-bold select-none",
                    isItemSelected
                      ? "bg-[#9bc272] text-[#000000]"
                      : "bg-[#cfcfd2] text-[#000000] hover:bg-[#d8d8dc]",
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
                        "flex items-center px-2 py-0.5 cursor-pointer text-xs font-semibold select-none pl-6",
                        isModSelected
                          ? "bg-[#9bc272] text-[#000000]"
                          : "bg-[#cfcfd2]/90 text-[#000000] hover:bg-[#d8d8dc]",
                      )}
                    >
                      {/* Blank line number column for alignment */}
                      <span className="w-4 text-left shrink-0" />

                      {/* Indented Modifier Name */}
                      <span className="flex-1 text-left truncate pr-1">
                        &gt; {mod.name}
                      </span>

                      {/* Quantity */}
                      <span className="w-8 text-center shrink-0">
                        {mod.quantity !== undefined && mod.quantity > 1 ? mod.quantity : ""}
                      </span>

                      {/* Modifier Price */}
                      <span className="w-20 text-right shrink-0">
                        {(mod.price * (mod.quantity ?? 1)).toLocaleString("en-US")}
                      </span>
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>

        {/* Order Summary Area: Rendered directly below last item only when items exist */}
        {orderItems.length > 0 && (
          <div
            data-testid="order-summary-box"
            className="bg-[#8ac5f3] border border-[#70a6d0] p-1 text-xs font-bold text-[#000000] space-y-0.5 mt-[1px]"
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
            <div className="flex justify-between items-center text-[#000000] font-black">
              <span className="w-28 text-left">Total Amount</span>
              <span className="w-24 text-right font-black" data-testid="summary-total-amount">
                {totalAmount.toLocaleString("en-US")}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
