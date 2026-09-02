import { PosButton } from "@/components/common/PosButton";
import {
  ArrowDownDoubleIcon,
  ArrowDownSingleIcon,
  ArrowUpDoubleIcon,
  ArrowUpSingleIcon,
  NavArrowRightIcon,
} from "@/components/common/PosIcons";
import { usePosStore } from "@/store/usePosStore";
import React from "react";

export const FinalizeShell: React.FC = () => {
  const orderItems = usePosStore((state) => state.orderItems);
  const currentServeType = usePosStore((state) => state.currentServeType);
  const clearOrder = usePosStore((state) => state.clearOrder);
  const voidSelectedLine = usePosStore((state) => state.voidSelectedLine);
  const reorderDrink = usePosStore((state) => state.reorderDrink);
  const openModal = usePosStore((state) => state.openModal);

  const totalAmount = React.useMemo(() => {
    return orderItems.reduce((sum, item) => {
      const itemBase = item.unitPrice * item.quantity;
      const modTotal = (item.modifiers || []).reduce(
        (mSum, m) => mSum + m.price * (m.quantity ?? 1),
        0,
      );
      return sum + itemBase + modTotal;
    }, 0);
  }, [orderItems]);

  const handleServeTypeItemClick = () => {
    if (currentServeType !== "Not Set") {
      openModal("serve_type_item");
    }
  };

  return (
    <section
      data-testid="section-4-finalize-section"
      className="flex-[4] bg-[#cbd5e1]/40 border-r border-[#64748b] p-1 flex flex-col gap-1 select-none"
    >
      {/* Top Total & Order Navigation Row */}
      <div className="h-[48px] flex items-stretch gap-1">
        <div className="grid grid-cols-4 gap-1 w-[45%]">
          <PosButton
            variant="nav-blue"
            className="p-0 flex items-center justify-center bg-[#0284c7]"
            onClick={() => reorderDrink("up")}
            aria-label="Move line up"
          >
            <ArrowUpSingleIcon className="w-6 h-6 drop-shadow-sm" />
          </PosButton>
          <PosButton
            variant="nav-blue"
            className="p-0 flex items-center justify-center bg-[#0284c7]"
            onClick={() => reorderDrink("top")}
            aria-label="Move line to top"
          >
            <ArrowUpDoubleIcon className="w-6 h-6 drop-shadow-sm" />
          </PosButton>
          <PosButton
            variant="nav-blue"
            className="p-0 flex items-center justify-center bg-[#0284c7]"
            onClick={() => reorderDrink("bottom")}
            aria-label="Move line to bottom"
          >
            <ArrowDownDoubleIcon className="w-6 h-6 drop-shadow-sm" />
          </PosButton>
          <PosButton
            variant="nav-blue"
            className="p-0 flex items-center justify-center bg-[#0284c7]"
            onClick={() => reorderDrink("down")}
            aria-label="Move line down"
          >
            <ArrowDownSingleIcon className="w-6 h-6 drop-shadow-sm" />
          </PosButton>
        </div>

        {/* Large Total Amount Display */}
        <div
          data-testid="total-amount-display"
          className="flex-1 bg-[#dbeafe] border border-[#93c5fd] rounded-[1px] flex items-center justify-end px-3 font-black text-2xl text-[#1e3a8a] shadow-inner"
        >
          {totalAmount.toLocaleString("en-US")}
        </div>
      </div>

      {/* Action Row 1 */}
      <div className="grid grid-cols-4 gap-1 flex-1">
        <PosButton
          variant="tender-cyan"
          className="text-xs font-black"
          onClick={() => clearOrder()}
        >
          CLEAR ALL
        </PosButton>
        <PosButton
          variant="tender-cyan"
          className="text-xs font-black"
          onClick={() => voidSelectedLine()}
        >
          Void
        </PosButton>
        <PosButton variant="default" className="text-xs font-black">
          Barcode/ SKU
        </PosButton>
        <PosButton variant="default" className="text-xs font-black">
          Hold Receipt
        </PosButton>
      </div>

      {/* Action Row 2 */}
      <div className="grid grid-cols-4 gap-1 flex-1">
        <PosButton variant="default" className="text-xs font-black">
          Recall Receipt
        </PosButton>
        <PosButton
          variant="serve-yellow"
          className="text-xs font-black"
          onClick={() => openModal("serve_type_all")}
        >
          Serve type/All
        </PosButton>
        <PosButton
          variant="serve-yellow"
          className="text-xs font-black"
          onClick={handleServeTypeItemClick}
        >
          Serve type/item
        </PosButton>
        <PosButton variant="serve-yellow" className="text-xs font-black">
          E-Invoice
        </PosButton>
      </div>

      {/* Action Row 3 */}
      <div className="grid grid-cols-4 gap-1 flex-1">
        <PosButton variant="default" className="text-[11px] font-black">
          Balance Enquiry
        </PosButton>
        <PosButton variant="default" className="text-[11px] font-black">
          Rewards Enquiry
        </PosButton>
        <PosButton variant="default" className="text-[11px] font-black">
          TRANS. INQ.
        </PosButton>
        <PosButton variant="serve-yellow" className="p-0 flex items-center justify-center">
          <NavArrowRightIcon className="w-8 h-8" />
        </PosButton>
      </div>
    </section>
  );
};
