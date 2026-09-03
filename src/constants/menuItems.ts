import type { MenuItem, SizeCode } from '@/types/pos';
import { HOT_ESP_ITEMS, ICED_ESP_ITEMS } from './menus/espresso';
import { COFFEE_FRAPP_ITEMS, CREAM_FRAPP_ITEMS } from './menus/frappuccino';
import { BLENDED_JUICE_ITEMS } from './menus/blendedJuice';
import { BREWED_ITEMS } from './menus/brewed';
import { COLD_BREW_ITEMS } from './menus/brewedSubcategories';
import {
  TEA_ITEMS,
  TEA_DS_BLACK_TEA_ITEMS,
  TEA_DS_GREEN_TEA_ITEMS,
  TEA_DS_HIBISCUS_ITEMS,
} from './menus/tea';
import {
  TEA_LATTE_ITEMS,
  TEA_ENG_BREAKFAST_ITEMS,
  TEA_EARL_GREY_ITEMS,
  TEA_EMP_ITEMS,
  TEA_MINT_CITRUS_ITEMS,
  TEA_HIBICUS_ITEMS,
  TEA_ZEN_OOLONG_ITEMS,
  TEA_CHAMOMILE_ITEMS,
} from './menus/teaSubcategories';
import {
  OTHER_HI_ITEMS,
  OTHER_HI_SIGNATURE_ITEMS,
  OTHER_HI_MILK_ITEMS,
  OTHER_HI_REFRESHERS_ITEMS,
} from './menus/otherHi';
import { FOOD_ITEMS, FOOD_BAKERY_ITEMS } from './menus/food';
import { FOOD_DESSERTS_ITEMS, FOOD_SANDWICHES_ITEMS } from './menus/foodSubcategories';
import { SUMMER_3_ITEMS, AUTUMN_ITEMS } from './menus/seasonal';
import { PK_HN_ITEMS, PACKAGING_ITEMS, DISCOUNT_ITEMS } from './menus/retail';
import { DELIVERY_ITEMS, SBUX_CARD_ITEMS, SBAPP_MERCHANDISE_ITEMS } from './menus/merchandise';
import { NSO_PROMO_ITEMS } from './menus/nsoPromo';

export const MENU_ITEMS_BY_CATEGORY: Record<string, MenuItem[]> = {
  // Hot & Iced Espresso
  hot_esp: HOT_ESP_ITEMS,
  iced_esp: ICED_ESP_ITEMS,

  // Frappuccinos
  coffee_frapp: COFFEE_FRAPP_ITEMS,
  cream_frapp: CREAM_FRAPP_ITEMS,

  // Blended Juice
  blended_juice: BLENDED_JUICE_ITEMS,

  // Brewed Coffee
  brewed: BREWED_ITEMS,
  cold_brew: COLD_BREW_ITEMS,
  brewed_cold_brew: COLD_BREW_ITEMS,

  // Tea & Subcategories
  tea: TEA_ITEMS,
  tea_ds_black_tea: TEA_DS_BLACK_TEA_ITEMS,
  tea_ds_green_tea: TEA_DS_GREEN_TEA_ITEMS,
  tea_ds_hibiscus: TEA_DS_HIBISCUS_ITEMS,
  ds_hibiscus: TEA_DS_HIBISCUS_ITEMS,
  tea_latte: TEA_LATTE_ITEMS,
  tea_tea_latte: TEA_LATTE_ITEMS,
  tea_eng_breakfast: TEA_ENG_BREAKFAST_ITEMS,
  tea_earl_grey: TEA_EARL_GREY_ITEMS,
  tea_emp: TEA_EMP_ITEMS,
  tea_mint_citrus: TEA_MINT_CITRUS_ITEMS,
  tea_hibicus: TEA_HIBICUS_ITEMS,
  tea_zen_oolong_tea: TEA_ZEN_OOLONG_ITEMS,
  zen_oolong_tea: TEA_ZEN_OOLONG_ITEMS,
  tea_chamomile: TEA_CHAMOMILE_ITEMS,
  chamomile: TEA_CHAMOMILE_ITEMS,

  // Other H/I & Subcategories
  other_hi: OTHER_HI_ITEMS,
  other_hi_signature: OTHER_HI_SIGNATURE_ITEMS,
  other_hi_milk: OTHER_HI_MILK_ITEMS,
  other_hi_refreshers: OTHER_HI_REFRESHERS_ITEMS,

  // Food HN HY BNI & Subcategories
  food_hn_hy_bni: FOOD_ITEMS,
  food: FOOD_ITEMS,
  food_bakery_hn: FOOD_BAKERY_ITEMS,
  bakery_hn: FOOD_BAKERY_ITEMS,
  food_desserts_hn: FOOD_DESSERTS_ITEMS,
  desserts_hn: FOOD_DESSERTS_ITEMS,
  food_sandwiches_hn: FOOD_SANDWICHES_ITEMS,
  sandwiches_hn: FOOD_SANDWICHES_ITEMS,
  food_snack_mixology_hn: [],

  // Seasonal
  summer_3: SUMMER_3_ITEMS,
  autumn_26_27: AUTUMN_ITEMS,
  autumn: AUTUMN_ITEMS,

  // Retail, Packaging & Discounts
  pk_hn: PK_HN_ITEMS,
  packaging: PACKAGING_ITEMS,
  discount: DISCOUNT_ITEMS,
  nso_promo: NSO_PROMO_ITEMS,
  discount_nso_promo: NSO_PROMO_ITEMS,

  // Merchandise, Delivery & Sbux Card
  sbux_card: SBUX_CARD_ITEMS,
  delivery_item: DELIVERY_ITEMS,
  sbapp_merchandise: SBAPP_MERCHANDISE_ITEMS,
};

export const MODIFIER_COLUMN_BUTTONS = [
  { id: 'modifier_btn', name: 'Modifier', row: 1 },
  { id: 'x1_btn', name: 'X 1', row: 2, multiplier: 1 },
  { id: 'x2_btn', name: 'X 2', row: 3, multiplier: 2 },
  { id: 'x3_btn', name: 'X 3', row: 4, multiplier: 3 },
  { id: 'x4_btn', name: 'X 4', row: 5, multiplier: 4 },
  { id: 'qty_btn', name: 'QTY', row: 6 },
];

export const SIZE_COLUMN_BUTTONS = [
  { id: 'size_short', name: 'Short', size: 'S' as SizeCode, row: 1 },
  { id: 'size_tall', name: 'Tall', size: 'T' as SizeCode, row: 2 },
  { id: 'size_grande', name: 'Grande', size: 'G' as SizeCode, row: 3 },
  { id: 'size_venti', name: 'Venti', size: 'V' as SizeCode, row: 4 },
  { id: 'size_change', name: 'Change Size', row: 5 },
  { id: 'size_sets', name: 'Sets order', row: 6 },
];

export const TENDER_ROW_BUTTONS = [
  { id: 'tender_sbux_card', name: 'SBUX CARD', col: 2, variant: 'tender-cyan' as const },
  { id: 'tender_foody', name: 'FOODY/AIRPAY', col: 3, variant: 'tender-grey' as const },
  { id: 'tender_grab', name: 'GRAB', col: 4, variant: 'tender-grey' as const },
  { id: 'tender_payoo_promo', name: 'PAYOO PROMO', col: 5, variant: 'tender-grey' as const },
  { id: 'tender_payoo_qr', name: 'PAYOO QR', col: 6, variant: 'tender-grey' as const },
];
