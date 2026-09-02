import { PosButton } from "@/components/common/PosButton";
import { CATEGORIES } from "@/constants/categories";
import { usePosStore } from "@/store/usePosStore";
import React from "react";

const TOTAL_ROWS = 3;
const TOTAL_COLS = 7;

export const CategoryGrid: React.FC = () => {
  const setActiveCategory = usePosStore((state) => state.setActiveCategory);

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
      className="p-1 bg-[#cbd5e1]/40 border-b border-[#94a3b8] flex-1 flex flex-col justify-stretch"
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
