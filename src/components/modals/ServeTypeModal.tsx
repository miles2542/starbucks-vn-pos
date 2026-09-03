import { usePosStore } from "@/store/usePosStore";
import type { ServeType } from "@/types/pos";
import clsx from "clsx";
import React from "react";

interface ServeTypeModalProps {
  mode: "all" | "item";
  isOpen: boolean;
  onClose: () => void;
}

type ModalServeOption = "For Here" | "Reset" | "To Go" | "BYO" | "B2BS";

const SERVE_OPTIONS_ALL: ModalServeOption[] = ["For Here", "To Go", "BYO", "B2BS"];
const SERVE_OPTIONS_ITEM: ModalServeOption[] = ["For Here", "Reset", "To Go", "BYO", "B2BS"];

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

  const initialSelected = React.useMemo<ModalServeOption>(() => {
    if (mode === "item") {
      if (targetItem?.serveType) {
        return (targetItem.serveType === "B2BTS" ? "B2BS" : targetItem.serveType) as ModalServeOption;
      }
      return "For Here";
    }
    if (currentServeType !== "Not Set") {
      return (currentServeType === "B2BTS" ? "B2BS" : currentServeType) as ModalServeOption;
    }
    return "For Here";
  }, [mode, targetItem, currentServeType]);

  const [selectedOption, setSelectedOption] = React.useState<ModalServeOption>(initialSelected);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedOption(initialSelected);
    }
  }, [isOpen, initialSelected]);

  if (!isOpen) return null;

  const handleConfirm = (): void => {
    if (mode === "all") {
      setServeType(selectedOption as ServeType);
    } else if (mode === "item" && targetItem) {
      if (selectedOption === "Reset") {
        setItemServeType(targetItem.id, undefined);
      } else {
        setItemServeType(targetItem.id, selectedOption as ServeType);
      }
    }
    onClose();
  };

  const options = mode === "all" ? SERVE_OPTIONS_ALL : SERVE_OPTIONS_ITEM;

  return (
    <div
      data-testid="modal-serve-type"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[0.5px] select-none"
    >
      <div className="w-[380px] bg-[#cfcfd5] border border-[#a8a8b2] rounded-md shadow-2xl p-4 flex flex-col font-sans">
        {/* Title */}
        <div className="text-base font-semibold text-black mb-3">
          Please choose the services type
        </div>

        {/* Options container with black border and empty background #839192 */}
        <div
          data-testid="serve-type-options-list"
          className="w-full h-48 border border-black bg-[#839192] flex flex-col overflow-hidden mb-4"
        >
          {options.map((option) => {
            const isSelected = selectedOption === option;
            const testIdKey = option.toLowerCase().replace(/\s+/g, "-");

            return (
              <button
                key={option}
                type="button"
                data-testid={`serve-option-${testIdKey}`}
                onClick={() => setSelectedOption(option)}
                className={clsx(
                  "h-8 px-2 text-left font-semibold text-sm transition-none flex items-center select-none cursor-pointer",
                  isSelected
                    ? "bg-[#026bca] text-[#fafafa]"
                    : "bg-[#fafafa] text-black hover:bg-slate-100",
                )}
              >
                <span>{option}</span>
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
