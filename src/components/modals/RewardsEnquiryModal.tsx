import React, { useEffect, useRef, useState } from "react";

interface RewardsEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RewardsEnquiryModal: React.FC<RewardsEnquiryModalProps> = ({ isOpen, onClose }) => {
  const [fillPercent, setFillPercent] = useState<number>(0);
  const timerStartRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timerCloseRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFillPercent(0);
      // 500ms delay, then start animation to 25% width
      timerStartRef.current = setTimeout(() => {
        setFillPercent(25);
      }, 500);

      // Total 1500ms (500ms delay + 800ms transition + 200ms pause) before auto closing
      timerCloseRef.current = setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setFillPercent(0);
    }

    return () => {
      if (timerStartRef.current) clearTimeout(timerStartRef.current);
      if (timerCloseRef.current) clearTimeout(timerCloseRef.current);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCancel = (): void => {
    if (timerStartRef.current) clearTimeout(timerStartRef.current);
    if (timerCloseRef.current) clearTimeout(timerCloseRef.current);
    onClose();
  };

  return (
    <div
      data-testid="modal-rewards-enquiry"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[0.5px] select-none"
    >
      <div className="w-[460px] bg-[#bcbcc3] border border-[#a8a8b2] rounded-lg shadow-2xl p-5 flex flex-col font-sans">
        {/* Top-left small label */}
        <div className="text-xs font-semibold text-neutral-800 tracking-tight">
          SBUX Card
        </div>

        {/* Centered main title */}
        <div className="text-2xl font-bold text-[#0255c3] text-center my-6">
          Please swipe SBUX card
        </div>

        {/* Progress bar container */}
        <div className="w-full bg-[#fafafa] h-7 border-b-2 border-[#003874] mb-6 overflow-hidden shadow-inner">
          <div
            data-testid="rewards-enquiry-progress"
            className="h-full bg-[#22c55e] transition-all duration-[800ms] ease-out"
            style={{ width: `${fillPercent}%` }}
          />
        </div>

        {/* Cancel button */}
        <div className="flex justify-center">
          <button
            type="button"
            data-testid="rewards-enquiry-cancel"
            onClick={handleCancel}
            className="bg-[#d4d4dc] border border-[#a8a8b2] text-neutral-900 font-semibold px-10 py-1.5 text-base rounded shadow-sm hover:bg-[#c8c8d2] active:bg-[#bcbcc3] cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
