import { usePosStore } from "@/store/usePosStore";
import clsx from "clsx";
import React from "react";

export const OrderDisplayShell: React.FC = () => {
  const currentServeType = usePosStore((state) => state.currentServeType);
  const orderItems = usePosStore((state) => state.orderItems);
  const selectedOrderItemId = usePosStore((state) => state.selectedOrderItemId);
  const selectOrderItem = usePosStore((state) => state.selectOrderItem);

  const totalQuantity = React.useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [orderItems]);

  const totalAmount = React.useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
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
          Order No:0100002787
        </div>
      </div>

      {/* Main Order Items List Container */}
      <div className="flex-1 bg-[#8f9fae] p-1 overflow-y-auto font-sans flex flex-col justify-between">
        <div className="flex flex-col gap-0.5" data-testid="order-items-list">
          {orderItems.map((item, index) => {
            const isSelected = item.id === selectedOrderItemId;

            return (
              <div
                key={item.id}
                data-testid={`order-item-row-${item.id}`}
                onClick={() => selectOrderItem(item.id)}
                className={clsx(
                  "flex items-center px-2 py-1 cursor-pointer text-xs font-bold transition-colors select-none",
                  isSelected
                    ? "bg-[#a2c374] text-[#111827] shadow-sm"
                    : "bg-[#cfd7df] text-[#1e293b] hover:bg-[#d8e0e7]",
                )}
              >
                {/* Line Number */}
                <span className="w-6 text-left shrink-0">{index + 1}</span>

                {/* Item Name */}
                <span className="flex-1 text-left truncate pr-1">{item.name}</span>

                {/* Quantity */}
                <span className="w-8 text-center shrink-0">{item.quantity}</span>

                {/* Price */}
                <span className="w-20 text-right shrink-0">
                  {item.totalPrice.toLocaleString("en-US")}
                </span>
              </div>
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

