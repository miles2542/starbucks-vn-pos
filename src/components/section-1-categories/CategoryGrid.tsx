import { PosButton } from "@/components/common/PosButton";
import { CATEGORIES } from "@/constants/categories";
import { PAYMENT_CATEGORY_TABS, type PaymentTabId } from "@/constants/menus/payment";
import { usePosStore } from "@/store/usePosStore";
import React from "react";

const TOTAL_ROWS = 3;
const TOTAL_COLS = 7;

export const CategoryGrid: React.FC = () => {
  const setActiveCategory = usePosStore((state) => state.setActiveCategory);
  const isPaymentMode = usePosStore((state) => state.isPaymentMode);
  const activePaymentTab = usePosStore((state) => state.activePaymentTab);
  const setPaymentTab = usePosStore((state) => state.setPaymentTab);

  if (isPaymentMode) {
    const paymentTabMap = new Map<string, { id: PaymentTabId; name: string }>();
    PAYMENT_CATEGORY_TABS.forEach((t) => {
      paymentTabMap.set(`${t.row}-${t.col}`, t);
    });

    const gridCells = Array.from({ length: TOTAL_ROWS }, (_, rIdx) => {
      const row = rIdx + 1;
      return Array.from({ length: TOTAL_COLS }, (_, cIdx) => {
        const col = cIdx + 1;
        return paymentTabMap.get(`${row}-${col}`);
      });
    });

    return (
      <section
        data-testid="section-1-category-grid"
        className="p-1 bg-[#aeaeb0] border-b border-[#000000] flex-1 flex flex-col justify-stretch"
      >
        <div className="grid grid-cols-7 grid-rows-3 gap-1 w-full h-full">
          {gridCells.flatMap((rowItems, rIdx) =>
            rowItems.map((tab, cIdx) => {
              const key = `pay-tab-${rIdx + 1}-${cIdx + 1}`;
              if (!tab) {
                return <PosButton key={key} variant="empty" />;
              }

              return (
                <PosButton
                  key={key}
                  variant="category"
                  onClick={() => setPaymentTab(tab.id)}
                  className={`text-[13px] tracking-tight leading-tight px-1 font-bold ${
                    activePaymentTab === tab.id ? "ring-2 ring-[#0284c7] ring-inset" : ""
                  }`}
                >
                  {tab.name}
                </PosButton>
              );
            }),
          )}
        </div>
      </section>
    );
  }

  // Construct 7x3 grid matrix (1-indexed rows 1-3 and cols 1-7)
  const gridCells = Array.from({ length: TOTAL_ROWS }, (_, rIdx) => {
    const row = rIdx + 1;
    return Array.from({ length: TOTAL_COLS }, (_, cIdx) => {
      const col = cIdx + 1;
      return CATEGORIES.find((cat) => cat.row === row && cat.col === col);
    });
  });

  return (
    <section
      data-testid="section-1-category-grid"
      className="p-1 bg-[#aeaeb0] border-b border-[#000000] flex-1 flex flex-col justify-stretch"
    >
      <div className="grid grid-cols-7 grid-rows-3 gap-1 w-full h-full">
        {gridCells.flatMap((rowItems, rIdx) =>
          rowItems.map((category, cIdx) => {
            const key = `cat-${rIdx + 1}-${cIdx + 1}`;
            if (!category) {
              return <PosButton key={key} variant="empty" />;
            }

            const variant = category.variant || "category";

            return (
              <PosButton
                key={key}
                variant={variant}
                onClick={() => setActiveCategory(category.id)}
                className="text-[13px] tracking-tight leading-tight px-1 font-bold"
              >
                {category.name}
              </PosButton>
            );
          }),
        )}
      </div>
    </section>
  );
};

