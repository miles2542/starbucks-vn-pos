import { PosButton } from "@/components/common/PosButton";
import { usePosStore } from "@/store/usePosStore";
import type { SizeCode } from "@/types/pos";
import clsx from "clsx";
import { X } from "lucide-react";
import React from "react";

interface ChangeSizeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIZE_OPTIONS: { code: SizeCode; label: string }[] = [
  { code: "S", label: "Short" },
  { code: "T", label: "Tall" },
  { code: "G", label: "Grande" },
  { code: "V", label: "Venti" },
];

export const ChangeSizeModal: React.FC<ChangeSizeModalProps> = ({ isOpen, onClose }) => {
  const orderItems = usePosStore((state) => state.orderItems);
  const selectedLineId = usePosStore((state) => state.selectedLineId);
  const activeSize = usePosStore((state) => state.activeSize);
  const changeSelectedItemSize = usePosStore((state) => state.changeSelectedItemSize);

  const targetItem = React.useMemo(() => {
    return (
      orderItems.find(
        (item) => item.id === selectedLineId || item.modifiers.some((m) => m.id === selectedLineId),
      ) || (orderItems.length > 0 ? orderItems[orderItems.length - 1] : null)
    );
  }, [orderItems, selectedLineId]);

  const initialSize = React.useMemo<SizeCode>(() => {
    if (targetItem?.size) return targetItem.size;
    return activeSize || "T";
  }, [targetItem, activeSize]);

  const [selectedSize, setSelectedSize] = React.useState<SizeCode>(initialSize);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedSize(initialSize);
    }
  }, [isOpen, initialSize]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (targetItem) {
      changeSelectedItemSize(selectedSize);
    }
    onClose();
  };

  return (
    <div
      data-testid="modal-change-size"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[1px] select-none"
    >
      <div className="w-[380px] bg-[#dbe4ee] border-2 border-[#334155] rounded-sm shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Modal Header */}
        <div className="bg-[#24334a] text-white px-3 py-2 flex items-center justify-between">
          <span className="font-black text-sm tracking-wide">Change Beverage Size</span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-0.5 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 bg-[#e2e8f0] flex flex-col gap-3">
          <p className="text-xs font-bold text-slate-700">
            Select size for {targetItem?.name || "current beverage"}:
          </p>

          <div className="grid grid-cols-2 gap-2">
            {SIZE_OPTIONS.map((opt) => {
              const isSelected = selectedSize === opt.code;

              return (
                <button
                  key={opt.code}
                  type="button"
                  data-testid={`size-option-${opt.label.toLowerCase()}`}
                  onClick={() => setSelectedSize(opt.code)}
                  className={clsx(
                    "h-14 font-black text-sm border-2 rounded-sm transition-all flex flex-col items-center justify-center shadow-sm",
                    isSelected
                      ? "bg-[#a2c374] text-slate-950 border-[#4d7c0f] ring-2 ring-[#4d7c0f]/50"
                      : "bg-[#cbd5e1] text-slate-800 border-[#94a3b8] hover:bg-[#d8e2ed]",
                  )}
                >
                  <span className="text-base font-black">{opt.code}</span>
                  <span className="text-xs">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#cbd5e1] px-4 py-3 flex items-center justify-end gap-2 border-t border-[#94a3b8]">
          <PosButton
            variant="default"
            className="w-24 h-10 font-black text-xs"
            onClick={onClose}
          >
            Cancel
          </PosButton>
          <PosButton
            variant="category-green"
            className="w-24 h-10 font-black text-xs"
            onClick={handleConfirm}
          >
            OK
          </PosButton>
        </div>
      </div>
    </div>
  );
};
