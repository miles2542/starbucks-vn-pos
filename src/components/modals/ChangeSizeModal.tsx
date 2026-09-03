import { usePosStore } from "@/store/usePosStore";
import type { SizeCode } from "@/types/pos";
import clsx from "clsx";
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

  const handleConfirm = (): void => {
    if (targetItem) {
      changeSelectedItemSize(selectedSize);
    }
    onClose();
  };

  return (
    <div
      data-testid="modal-change-size"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[0.5px] select-none"
    >
      <div className="w-[380px] bg-[#cfcfd5] border border-[#a8a8b2] rounded-md shadow-2xl p-4 flex flex-col font-sans">
        {/* Title */}
        <div className="text-base font-semibold text-black mb-3">
          Please choose the size
        </div>

        {/* Options container with black border and empty background #839192 */}
        <div
          data-testid="size-options-list"
          className="w-full h-48 border border-black bg-[#839192] flex flex-col overflow-hidden mb-4"
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
                  "h-8 px-2 text-left font-semibold text-sm transition-none flex items-center select-none cursor-pointer",
                  isSelected
                    ? "bg-[#026bca] text-[#fafafa]"
                    : "bg-[#fafafa] text-black hover:bg-slate-100",
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Bottom OK & Cancel Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="w-24 h-9 font-semibold text-sm bg-[#d4d4dc] text-black border border-[#9fa0a6] rounded shadow-sm hover:bg-[#c8c8d2] active:bg-[#bcbcc3] flex items-center justify-center cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-24 h-9 font-semibold text-sm bg-[#d4d4dc] text-black border border-[#9fa0a6] rounded shadow-sm hover:bg-[#c8c8d2] active:bg-[#bcbcc3] flex items-center justify-center cursor-pointer"
            onClick={handleConfirm}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};
