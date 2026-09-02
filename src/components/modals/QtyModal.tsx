import { usePosStore } from "@/store/usePosStore";
import { X } from "lucide-react";
import React, { useState, useEffect, useMemo } from "react";

interface QtyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QtyModal: React.FC<QtyModalProps> = ({ isOpen, onClose }) => {
  const orderItems = usePosStore((state) => state.orderItems);
  const selectedLineId = usePosStore((state) => state.selectedLineId);
  const updateItemQuantity = usePosStore((state) => state.updateItemQuantity);

  const target = useMemo(() => {
    if (!selectedLineId) return null;
    for (const item of orderItems) {
      if (item.id === selectedLineId) {
        return { id: item.id, name: item.name, quantity: item.quantity };
      }
      for (const mod of item.modifiers) {
        if (mod.id === selectedLineId) {
          return { id: mod.id, name: mod.name, quantity: mod.quantity ?? 1 };
        }
      }
    }
    return null;
  }, [orderItems, selectedLineId]);

  const [buffer, setBuffer] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setBuffer("");
    }
  }, [isOpen]);

  if (!isOpen || !target) return null;

  const handleDigitClick = (digit: string) => {
    if (buffer.length >= 3) return; // Cap at 3 digits
    if (buffer === "" && digit === "0") return; // Avoid leading zero
    setBuffer((prev) => prev + digit);
  };

  const handleClear = () => {
    setBuffer("");
  };

  const handleConfirm = () => {
    const qty = Number.parseInt(buffer, 10);
    if (!Number.isNaN(qty) && qty > 0) {
      updateItemQuantity(target.id, qty);
    }
    onClose();
  };

  const keypadKeys = [
    { label: "7", action: () => handleDigitClick("7"), testId: "keypad-btn-7" },
    { label: "8", action: () => handleDigitClick("8"), testId: "keypad-btn-8" },
    { label: "9", action: () => handleDigitClick("9"), testId: "keypad-btn-9" },
    { label: "4", action: () => handleDigitClick("4"), testId: "keypad-btn-4" },
    { label: "5", action: () => handleDigitClick("5"), testId: "keypad-btn-5" },
    { label: "6", action: () => handleDigitClick("6"), testId: "keypad-btn-6" },
    { label: "1", action: () => handleDigitClick("1"), testId: "keypad-btn-1" },
    { label: "2", action: () => handleDigitClick("2"), testId: "keypad-btn-2" },
    { label: "3", action: () => handleDigitClick("3"), testId: "keypad-btn-3" },
    { label: "Clear", action: handleClear, testId: "keypad-btn-clear", isSpecial: true },
    { label: "0", action: () => handleDigitClick("0"), testId: "keypad-btn-0" },
    { label: "Enter", action: handleConfirm, testId: "keypad-btn-enter", isEnter: true },
  ];

  return (
    <div
      data-testid="modal-qty"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[0.5px] select-none"
    >
      <div className="w-[360px] bg-white border-2 border-[#1e293b] rounded-none shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Subtle Window Header */}
        <div className="bg-[#334155] text-white px-3 py-1.5 flex items-center justify-between border-b border-[#1e293b]">
          <span className="font-bold text-xs uppercase tracking-wider text-slate-100">
            Enter Quantity
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

        {/* Modal Body */}
        <div className="p-3 bg-white flex flex-col gap-2.5">
          {/* Target Info */}
          <div className="bg-[#f8fafc] border border-slate-300 p-2 text-xs flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-semibold">Target Item:</span>
              <span data-testid="qty-target-name" className="font-bold text-slate-900 truncate max-w-[210px]">
                {target.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-semibold">Current Qty:</span>
              <span data-testid="qty-current-value" className="font-bold text-slate-800">
                {target.quantity}
              </span>
            </div>
          </div>

          {/* New Quantity Display */}
          <div className="bg-white border-2 border-[#1d4ed8] p-1.5 flex items-center justify-between shadow-inner">
            <span className="text-xs font-bold text-slate-600 uppercase">New Qty:</span>
            <span
              data-testid="qty-buffer-display"
              className="text-2xl font-black text-slate-950 font-mono"
            >
              {buffer || "0"}
            </span>
          </div>

          {/* 3x4 Touchscreen Numeric Keypad */}
          <div className="grid grid-cols-3 gap-1 h-[210px]" data-testid="qty-keypad-grid">
            {keypadKeys.map((k) => (
              <button
                key={k.label}
                type="button"
                data-testid={k.testId}
                onClick={k.action}
                className={`font-bold text-base border-t-2 border-l-2 border-white border-b-2 border-r-2 border-slate-500 active:border-t-slate-500 active:border-l-slate-500 active:border-b-white active:border-r-white shadow-sm flex items-center justify-center cursor-pointer select-none ${
                  k.isEnter
                    ? "bg-[#1d4ed8] text-white"
                    : k.isSpecial
                      ? "bg-[#fed7aa] text-amber-950"
                      : "bg-[#e2e8f0] text-slate-900 hover:bg-[#cbd5e1]"
                }`}
              >
                {k.label}
              </button>
            ))}
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
