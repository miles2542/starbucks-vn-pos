import { PosButton } from "@/components/common/PosButton";
import {
  MENU_ITEMS_BY_CATEGORY,
  MODIFIER_COLUMN_BUTTONS,
  SIZE_COLUMN_BUTTONS,
  TENDER_ROW_BUTTONS,
} from "@/constants/menuItems";
import { usePosStore } from "@/store/usePosStore";
import type { MenuItem } from "@/types/pos";
import React from "react";

const MODIFIER_BY_ROW = new Map(MODIFIER_COLUMN_BUTTONS.map((b) => [b.row, b]));
const SIZE_BY_ROW = new Map(SIZE_COLUMN_BUTTONS.map((b) => [b.row, b]));
const TENDER_BY_COL = new Map(TENDER_ROW_BUTTONS.map((b) => [b.col, b]));

export const ItemGrid: React.FC = () => {
  const activeCategoryId = usePosStore((state) => state.activeCategoryId);
  const multiplier = usePosStore((state) => state.multiplier);
  const isRefreshing = usePosStore((state) => state.isRefreshing);
  const setMultiplier = usePosStore((state) => state.setMultiplier);
  const setActiveSubcategory = usePosStore((state) => state.setActiveSubcategory);

  const currentCategoryItems = MENU_ITEMS_BY_CATEGORY[activeCategoryId] || [];
  const itemMap = React.useMemo(() => {
    const map = new Map<string, MenuItem>();
    for (const item of currentCategoryItems) {
      map.set(`${item.row}-${item.col}`, item);
    }
    return map;
  }, [currentCategoryItems]);

  const handleCenterItemClick = (item: MenuItem) => {
    if (item.isSubcategory) {
      setActiveSubcategory(item.id, item.name);
    }
  };

  return (
    <section
      data-testid="section-2-item-grid"
      className="p-1 bg-[#cbd5e1]/30 flex-[3] flex flex-col justify-stretch"
    >
      <div className="grid grid-cols-7 grid-rows-7 gap-1 w-full h-full">
        {/* Render the 7x7 grid coordinates (row 1-7, col 1-7) */}
        {Array.from({ length: 7 }, (_, rIdx) => {
          const row = rIdx + 1;

          return Array.from({ length: 7 }, (_, cIdx) => {
            const col = cIdx + 1;
            const cellKey = `grid-${row}-${col}`;

            // 1. Column 1: Modifiers and Multipliers (Rows 1-6) & Empty on Row 7
            if (col === 1) {
              const modBtn = MODIFIER_BY_ROW.get(row);
              if (!modBtn) {
                return <PosButton key={cellKey} variant="empty" />;
              }

              const isMultiplierActive = modBtn.multiplier !== undefined && multiplier === modBtn.multiplier;

              return (
                <PosButton
                  key={cellKey}
                  variant="modifier-red"
                  isActive={isMultiplierActive}
                  onClick={() => {
                    if (modBtn.multiplier !== undefined) {
                      setMultiplier(modBtn.multiplier as 1 | 2 | 3 | 4);
                    }
                  }}
                  className="text-xs font-black tracking-wide"
                >
                  {modBtn.name}
                </PosButton>
              );
            }

            // 2. Column 7: Sizes and Sets (Rows 1-6) & Empty on Row 7
            if (col === 7) {
              const sizeBtn = SIZE_BY_ROW.get(row);
              if (!sizeBtn) {
                return <PosButton key={cellKey} variant="empty" />;
              }

              return (
                <PosButton
                  key={cellKey}
                  variant="modifier-red"
                  className="text-xs font-black tracking-tight"
                >
                  {sizeBtn.name}
                </PosButton>
              );
            }

            // 3. Row 7: Tender Buttons (Cols 2-6)
            if (row === 7) {
              const tenderBtn = TENDER_BY_COL.get(col);
              if (!tenderBtn) {
                return <PosButton key={cellKey} variant="empty" />;
              }

              return (
                <PosButton
                  key={cellKey}
                  variant={tenderBtn.variant}
                  className="text-[11px] font-extrabold tracking-tight px-0.5"
                >
                  {tenderBtn.name}
                </PosButton>
              );
            }

            // 4. Center 5x6 Item Matrix (Cols 2-6, Rows 1-6)
            const centerRow = row;
            const centerCol = col - 1;
            const item = isRefreshing ? undefined : itemMap.get(`${centerRow}-${centerCol}`);

            if (!item) {
              return (
                <PosButton
                  key={cellKey}
                  variant="empty"
                  className={isRefreshing ? "transition-opacity opacity-0" : ""}
                />
              );
            }

            return (
              <PosButton
                key={cellKey}
                variant={item.variant || "default"}
                onClick={() => handleCenterItemClick(item)}
                className={`text-[12px] font-black tracking-tight px-1 transition-opacity ${
                  isRefreshing ? "opacity-0" : "opacity-100"
                }`}
              >
                {item.name}
              </PosButton>
            );
          });
        })}
      </div>
    </section>
  );
};
