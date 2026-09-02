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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[0.5px] select-none"
    >
      <div className="w-[360px] bg-white border-2 border-[#1e293b] rounded-none shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Subtle Window Header */}
        <div className="bg-[#334155] text-white px-3 py-1.5 flex items-center justify-between border-b border-[#1e293b]">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-100">
            Change Beverage Size
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-0.5 rounded"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body: White background, sharp black text */}
        <div className="p-3 bg-white flex flex-col gap-2">
          <p className="text-xs font-semibold text-neutral-800">
            Select size for {targetItem?.name || "current beverage"}:
          </p>

          {/* Single-Column List with Blue Rectangular Highlight */}
          <div
            className="flex flex-col border border-slate-300 bg-white"
            data-testid="size-options-list"
          >
            {SIZE_OPTIONS.map((opt) => {
              const isSelected = selectedSize === opt.code;

              return (
                <button
                  key={opt.code}
                  type="button"
                  data-testid={`size-option-${opt.label.toLowerCase()}`}
                  onClick={() => setSelectedSize(opt.code)}
                  className={clsx(
                    "h-10 px-3 text-left font-bold text-sm transition-none flex items-center justify-between select-none border-b border-slate-200 last:border-b-0",
                    isSelected
                      ? "bg-[#1d4ed8] text-white"
                      : "bg-white text-neutral-900 hover:bg-slate-100",
                  )}
                >
                  <span>
                    <span className="font-black mr-2">{opt.code}</span>
                    <span>{opt.label}</span>
                  </span>
                  {isSelected && <span aria-hidden="true" className="text-xs font-black">●</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer: Classic 3D Beveled Buttons */}
        <div className="bg-[#f1f5f9] px-3 py-2 flex items-center justify-end gap-2 border-t border-slate-300">
          <button
            type="button"
            className="w-24 h-9 font-bold text-xs bg-[#e2e8f0] text-slate-900 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-slate-600 active:border-t-slate-600 active:border-l-slate-600 active:border-b-white active:border-r-white shadow-sm flex items-center justify-center cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-24 h-9 font-bold text-xs bg-[#e2e8f0] text-slate-900 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-slate-600 active:border-t-slate-600 active:border-l-slate-600 active:border-b-white active:border-r-white shadow-sm flex items-center justify-center cursor-pointer"
            onClick={handleConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
