import type { MenuItem } from "@/types/pos";

export const MENU_ITEMS_BY_CATEGORY: Record<string, MenuItem[]> = {
  hot_esp: [
    // Row 1
    { id: "t_latte", categoryId: "hot_esp", name: "T LATTE", price: 75000, row: 1, col: 1 },
    { id: "t_cappuccino", categoryId: "hot_esp", name: "T CAPPUCCINO", price: 75000, row: 1, col: 2 },
    { id: "t_mocha", categoryId: "hot_esp", name: "T MOCHA", price: 85000, row: 1, col: 3 },
    { id: "t_cm", categoryId: "hot_esp", name: "T CM", price: 85000, row: 1, col: 4 },
    { id: "t_americano", categoryId: "hot_esp", name: "T AMERICANO", price: 65000, row: 1, col: 5 },

    // Row 2
    { id: "t_adl", categoryId: "hot_esp", name: "T ADL", price: 85000, row: 2, col: 1 },
    { id: "solo_espresso", categoryId: "hot_esp", name: "SOLO ESPRESSO", price: 45000, row: 2, col: 2 },
    { id: "doppio_espresso", categoryId: "hot_esp", name: "DOPPIO ESPRESSO", price: 55000, row: 2, col: 3 },
    { id: "solo_macchiato", categoryId: "hot_esp", name: "SOLO MACCHIATO", price: 50000, row: 2, col: 4 },
    { id: "doppio_macchiato", categoryId: "hot_esp", name: "DOPPIO MACCHIATO", price: 60000, row: 2, col: 5 },

    // Row 3
    { id: "doppio_con_panna", categoryId: "hot_esp", name: "DOPPIO CON PANNA", price: 60000, row: 3, col: 1 },
    { id: "solo_con_panna", categoryId: "hot_esp", name: "SOLO CON PANNA", price: 50000, row: 3, col: 2 },
    { id: "t_flat_white", categoryId: "hot_esp", name: "T FLAT WHITE", price: 80000, row: 3, col: 3 },
    { id: "t_ahl", categoryId: "hot_esp", name: "T AHL", price: 85000, row: 3, col: 4 },
    { id: "t_ccrl", categoryId: "hot_esp", name: "T CCRL", price: 85000, row: 3, col: 5 },
  ],

  food_hn_hy_bni: [
    { id: "bakery_hn", categoryId: "food_hn_hy_bni", name: "BAKERY HN", row: 1, col: 1, isSubcategory: true },
    { id: "desserts_hn", categoryId: "food_hn_hy_bni", name: "DESSERTS HN", row: 1, col: 2, isSubcategory: true },
    { id: "sandwiches_hn", categoryId: "food_hn_hy_bni", name: "SANDWICHES HN", row: 1, col: 3, isSubcategory: true },
    { id: "snack_mixology_hn", categoryId: "food_hn_hy_bni", name: "Snack Mixology HN", row: 1, col: 4, isSubcategory: true },
  ],

  iced_esp: [
    { id: "g_iced_latte", categoryId: "iced_esp", name: "G ICED LATTE", price: 85000, row: 1, col: 1 },
    { id: "g_iced_cappuccino", categoryId: "iced_esp", name: "G ICED CAPPUCCINO", price: 85000, row: 1, col: 2 },
    { id: "g_iced_mocha", categoryId: "iced_esp", name: "G ICED MOCHA", price: 95000, row: 1, col: 3 },
    { id: "g_iced_cm", categoryId: "iced_esp", name: "G ICED CM", price: 95000, row: 1, col: 4 },
    { id: "g_iced_americano", categoryId: "iced_esp", name: "G ICED AMERICANO", price: 75000, row: 1, col: 5 },
  ],

  coffee_frapp: [
    { id: "g_cf", categoryId: "coffee_frapp", name: "G COFFEE FRAPP", price: 90000, row: 1, col: 1 },
    { id: "g_crf", categoryId: "coffee_frapp", name: "G CARAMEL FRAPP", price: 100000, row: 1, col: 2 },
    { id: "g_mf", categoryId: "coffee_frapp", name: "G MOCHA FRAPP", price: 100000, row: 1, col: 3 },
    { id: "g_jcf", categoryId: "coffee_frapp", name: "G JAVA CHIP FRAPP", price: 105000, row: 1, col: 4 },
  ],

  cream_frapp: [
    { id: "g_vanilla_cf", categoryId: "cream_frapp", name: "G VANILLA CREAM", price: 90000, row: 1, col: 1 },
    { id: "g_green_tea_cf", categoryId: "cream_frapp", name: "G GREEN TEA CREAM", price: 100000, row: 1, col: 2 },
    { id: "g_caramel_cf", categoryId: "cream_frapp", name: "G CARAMEL CREAM", price: 100000, row: 1, col: 3 },
  ],

  blended_juice: [
    { id: "g_mango_passion", categoryId: "blended_juice", name: "G MANGO PASSION", price: 85000, row: 1, col: 1 },
    { id: "g_raspberry_black", categoryId: "blended_juice", name: "G RASPBERRY BLACK", price: 85000, row: 1, col: 2 },
  ],

  brewed: [
    { id: "t_brewed_today", categoryId: "brewed", name: "T BREWED TODAY", price: 55000, row: 1, col: 1 },
    { id: "t_mistoo", categoryId: "brewed", name: "T CAFE MISTO", price: 65000, row: 1, col: 2 },
  ],

  tea: [
    { id: "g_iced_btg", categoryId: "tea", name: "G ICED BTG", price: 70000, row: 1, col: 1 },
    { id: "g_iced_gtg", categoryId: "tea", name: "G ICED GTG", price: 70000, row: 1, col: 2 },
    { id: "g_iced_ptg", categoryId: "tea", name: "G ICED PTG", price: 70000, row: 1, col: 3 },
    { id: "t_hot_tea", categoryId: "tea", name: "T HOT TEA", price: 60000, row: 1, col: 4 },
  ],

  summer_3: [
    { id: "g_summer_special_1", categoryId: "summer_3", name: "G YUZU BLACK TEA", price: 95000, row: 1, col: 1 },
    { id: "g_summer_special_2", categoryId: "summer_3", name: "G COCONUT LATTE", price: 95000, row: 1, col: 2 },
  ],
};

export const MODIFIER_COLUMN_BUTTONS = [
  { id: "modifier_btn", name: "Modifier", row: 1 },
  { id: "x1_btn", name: "X 1", row: 2, multiplier: 1 },
  { id: "x2_btn", name: "X 2", row: 3, multiplier: 2 },
  { id: "x3_btn", name: "X 3", row: 4, multiplier: 3 },
  { id: "x4_btn", name: "X 4", row: 5, multiplier: 4 },
  { id: "qty_btn", name: "QTY", row: 6 },
];

export const SIZE_COLUMN_BUTTONS = [
  { id: "size_short", name: "Short", row: 1 },
  { id: "size_tall", name: "Tall", row: 2 },
  { id: "size_grande", name: "Grande", row: 3 },
  { id: "size_venti", name: "Venti", row: 4 },
  { id: "size_change", name: "Change Size", row: 5 },
  { id: "size_sets", name: "Sets order", row: 6 },
];

export const TENDER_ROW_BUTTONS = [
  { id: "tender_sbux_card", name: "SBUX CARD", col: 2, variant: "tender-cyan" as const },
  { id: "tender_foody", name: "FOODY/AIRPAY", col: 3, variant: "tender-grey" as const },
  { id: "tender_grab", name: "GRAB", col: 4, variant: "tender-grey" as const },
  { id: "tender_payoo_promo", name: "PAYOO PROMO", col: 5, variant: "tender-grey" as const },
  { id: "tender_payoo_qr", name: "PAYOO QR", col: 6, variant: "tender-grey" as const },
];
