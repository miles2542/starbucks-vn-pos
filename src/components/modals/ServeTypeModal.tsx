import { PosButton } from "@/components/common/PosButton";
import { usePosStore } from "@/store/usePosStore";
import type { ServeType } from "@/types/pos";
import clsx from "clsx";
import { X } from "lucide-react";
import React from "react";

interface ServeTypeModalProps {
  mode: "all" | "item";
  isOpen: boolean;
  onClose: () => void;
}

const SERVE_OPTIONS: ServeType[] = ["For Here", "To Go", "BYO", "B2BTS"];

export const ServeTypeModal: React.FC<ServeTypeModalProps> = ({ mode, isOpen, onClose }) => {
  const currentServeType = usePosStore((state) => state.currentServeType);
  const orderItems = usePosStore((state) => state.orderItems);
  const selectedLineId = usePosStore((state) => state.selectedLineId);
  const setServeType = usePosStore((state) => state.setServeType);
  const setItemServeType = usePosStore((state) => state.setItemServeType);

  const targetItem = React.useMemo(() => {
    if (mode !== "item") return null;
    return (
      orderItems.find(
        (item) => item.id === selectedLineId || item.modifiers.some((m) => m.id === selectedLineId),
      ) || (orderItems.length > 0 ? orderItems[orderItems.length - 1] : null)
    );
  }, [mode, orderItems, selectedLineId]);

  const initialSelected = React.useMemo<ServeType>(() => {
    if (mode === "item" && targetItem?.serveType) {
      return targetItem.serveType;
    }
    if (currentServeType !== "Not Set") {
      return currentServeType;
    }
    return "For Here";
  }, [mode, targetItem, currentServeType]);

  const [selectedOption, setSelectedOption] = React.useState<ServeType>(initialSelected);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedOption(initialSelected);
    }
  }, [isOpen, initialSelected]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (mode === "all") {
      setServeType(selectedOption);
    } else if (mode === "item" && targetItem) {
      setItemServeType(targetItem.id, selectedOption);
    }
    onClose();
  };

  return (
    <div
      data-testid="modal-serve-type"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[1px] select-none"
    >
      <div className="w-[420px] bg-[#dbe4ee] border-2 border-[#334155] rounded-sm shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Modal Header */}
        <div className="bg-[#24334a] text-white px-3 py-2 flex items-center justify-between">
          <span className="font-black text-sm tracking-wide">
            {mode === "all" ? "Serve type / All" : "Serve type / Item"}
          </span>
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
            {mode === "all"
              ? "Select global serve type for the order:"
              : `Select serve type for item: ${targetItem?.name || "Selected Item"}`}
          </p>

          <div className="grid grid-cols-2 gap-2">
            {SERVE_OPTIONS.map((option) => {
              const isSelected = selectedOption === option;

              return (
                <button
                  key={option}
                  type="button"
                  data-testid={`serve-option-${option.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setSelectedOption(option)}
                  className={clsx(
                    "h-14 font-black text-sm border-2 rounded-sm transition-all flex items-center justify-center shadow-sm",
                    isSelected
                      ? "bg-[#a2c374] text-slate-950 border-[#4d7c0f] ring-2 ring-[#4d7c0f]/50"
                      : "bg-[#cbd5e1] text-slate-800 border-[#94a3b8] hover:bg-[#d8e2ed]",
                  )}
                >
                  {option}
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
