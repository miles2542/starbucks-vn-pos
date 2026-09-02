import { PosButton } from "@/components/common/PosButton";
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
    if (buffer.length >= 3) return; // Cap at 3 digits (up to 999)
    if (buffer === "" && digit === "0") return; // Avoid leading zeros
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

  const keypadKeys: Array<{ label: string; action: () => void; testId: string; variant?: "default" | "nav-blue" | "tender-cyan" }> = [
    { label: "7", action: () => handleDigitClick("7"), testId: "keypad-btn-7" },
    { label: "8", action: () => handleDigitClick("8"), testId: "keypad-btn-8" },
    { label: "9", action: () => handleDigitClick("9"), testId: "keypad-btn-9" },
    { label: "4", action: () => handleDigitClick("4"), testId: "keypad-btn-4" },
    { label: "5", action: () => handleDigitClick("5"), testId: "keypad-btn-5" },
    { label: "6", action: () => handleDigitClick("6"), testId: "keypad-btn-6" },
    { label: "1", action: () => handleDigitClick("1"), testId: "keypad-btn-1" },
    { label: "2", action: () => handleDigitClick("2"), testId: "keypad-btn-2" },
    { label: "3", action: () => handleDigitClick("3"), testId: "keypad-btn-3" },
    { label: "Clear", action: handleClear, testId: "keypad-btn-clear", variant: "tender-cyan" },
    { label: "0", action: () => handleDigitClick("0"), testId: "keypad-btn-0" },
    { label: "Enter", action: handleConfirm, testId: "keypad-btn-enter", variant: "nav-blue" },
  ];

  return (
    <div
      data-testid="modal-qty"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[1px] select-none"
    >
      <div className="w-[380px] bg-[#dbe4ee] border-2 border-[#334155] rounded-sm shadow-2xl overflow-hidden flex flex-col font-sans">
        {/* Header */}
        <div className="bg-[#24334a] text-white px-3 py-2 flex items-center justify-between">
          <span className="font-black text-sm tracking-wide">Enter Quantity</span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-0.5 rounded"
            aria-label="Close quantity dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 bg-[#e2e8f0] flex flex-col gap-3">
          {/* Item details */}
          <div className="bg-white/80 border border-slate-300 p-2.5 rounded-sm flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-600">Item:</span>
              <span data-testid="qty-target-name" className="font-black text-slate-900 truncate max-w-[220px]">
                {target.name}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-600">Current Qty:</span>
              <span data-testid="qty-current-value" className="font-black text-slate-700">
                {target.quantity}
              </span>
            </div>
          </div>

          {/* New Quantity Display */}
          <div className="bg-white border-2 border-[#1e3a8a] rounded-sm p-2 flex items-center justify-between shadow-inner">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">New Qty:</span>
            <span
              data-testid="qty-buffer-display"
              className="text-2xl font-black text-slate-950 font-mono tracking-wider"
            >
              {buffer || "0"}
            </span>
          </div>

          {/* 3x4 Touchscreen Numeric Keypad */}
          <div className="grid grid-cols-3 gap-1.5 h-[220px]" data-testid="qty-keypad-grid">
            {keypadKeys.map((k) => (
              <PosButton
                key={k.label}
                variant={k.variant || "default"}
                data-testid={k.testId}
                onClick={k.action}
                className="text-base font-black"
              >
                {k.label}
              </PosButton>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#cbd5e1] px-4 py-2.5 flex items-center justify-end gap-2 border-t border-[#94a3b8]">
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
