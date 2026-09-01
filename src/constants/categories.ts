import type { CategoryItem } from "@/types/pos";

export const CATEGORIES: CategoryItem[] = [
  // Row 1
  { id: "hot_esp", code: "HOT_ESP", name: "HOT ESP", row: 1, col: 1 },
  { id: "iced_esp", code: "ICED_ESP", name: "ICED ESP", row: 1, col: 2 },
  { id: "coffee_frapp", code: "COFFEE_FRAPP", name: "COFFEE FRAPP", row: 1, col: 3 },
  { id: "cream_frapp", code: "CREAM_FRAPP", name: "CREAM FRAPP", row: 1, col: 4 },
  { id: "blended_juice", code: "BLENDED_JUICE", name: "BLENDED JUICE", row: 1, col: 5 },
  { id: "brewed", code: "BREWED", name: "BREWED", row: 1, col: 6 },
  { id: "tea", code: "TEA", name: "TEA", row: 1, col: 7 },

  // Row 2
  { id: "other_hi", code: "OTHER_HI", name: "OTHER H/I", row: 2, col: 1 },
  { id: "food_hn_hy_bni", code: "FOOD_HN_HY_BNI", name: "Food HN HY BNI", row: 2, col: 2 },
  { id: "pk_hn", code: "PK_HN", name: "PK HN", row: 2, col: 3 },
  { id: "discount", code: "DISCOUNT", name: "DISCOUNT", row: 2, col: 4 },
  { id: "sbux_card", code: "SBUX_CARD", name: "SBUX CARD", row: 2, col: 5, variant: "category-green" },
  { id: "delivery_item", code: "DELIVERY_ITEM", name: "DELIVERY ITEM", row: 2, col: 6 },
  { id: "sbapp_merchandise", code: "SBAPP_MERCHANDISE", name: "SBApp Merchandise", row: 2, col: 7 },

  // Row 3
  { id: "packaging", code: "PACKAGING", name: "PACKAGING", row: 3, col: 1 },
  { id: "summer_3", code: "SUMMER_3", name: "SUMMER 3", row: 3, col: 2, variant: "category-cyan" },
  { id: "autumn_26_27", code: "AUTUMN_26_27", name: "FY26-27 AUTUMN", row: 3, col: 3 },
];
