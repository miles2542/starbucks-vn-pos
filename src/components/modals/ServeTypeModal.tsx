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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[0.5px] select-none"
    >
      <div className="w-[360px] bg-white border-2 border-[#1e293b] rounded-none shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Subtle Window Header */}
        <div className="bg-[#334155] text-white px-3 py-1.5 flex items-center justify-between border-b border-[#1e293b]">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-100">
            {mode === "all" ? "Serve type / All" : "Serve type / Item"}
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

        {/* Modal Body: White background, sharp black text, single-column list */}
        <div className="p-3 bg-white flex flex-col gap-2">
          <p className="text-xs font-semibold text-neutral-800">
            {mode === "all"
              ? "Select global serve type for the order:"
              : `Select serve type for item: ${targetItem?.name || "Selected Item"}`}
          </p>

          {/* Clean Single-Column List with Classic Blue Rectangular Highlight */}
          <div
            className="flex flex-col border border-slate-300 bg-white"
            data-testid="serve-type-options-list"
          >
            {SERVE_OPTIONS.map((option) => {
              const isSelected = selectedOption === option;

              return (
                <button
                  key={option}
                  type="button"
                  data-testid={`serve-option-${option.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setSelectedOption(option)}
                  className={clsx(
                    "h-10 px-3 text-left font-bold text-sm transition-none flex items-center justify-between select-none border-b border-slate-200 last:border-b-0",
                    isSelected
                      ? "bg-[#1d4ed8] text-white"
                      : "bg-white text-neutral-900 hover:bg-slate-100",
                  )}
                >
                  <span>{option}</span>
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
