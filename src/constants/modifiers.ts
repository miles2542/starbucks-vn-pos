import type { ButtonVariant } from "@/types/pos";

export interface ModifierItem {
  id: string;
  name: string;
  price: number;
  row: number; // 1-6 (in center 5x6 matrix)
  col: number; // 1-5 (in center 5x6 matrix)
  isNav?: boolean;
  navTarget?: string;
  navDirection?: "prev" | "next" | "back";
  variant?: ButtonVariant;
}

export const MODIFIER_PAGES: Record<string, ModifierItem[]> = {
  root: [
    // Row 1
    { id: "mod_cat_syrup", name: "Syrup", price: 0, row: 1, col: 1, isNav: true, navTarget: "syrup" },
    {
      id: "mod_cat_sauce_topping",
      name: "Sauce/Topping",
      price: 0,
      row: 1,
      col: 2,
      isNav: true,
      navTarget: "sauce_topping_p1",
    },
    { id: "mod_cat_milk", name: "Milk", price: 0, row: 1, col: 3, isNav: true, navTarget: "milk" },
    { id: "mod_cat_shot", name: "Shot", price: 0, row: 1, col: 4, isNav: true, navTarget: "shot" },
    { id: "mod_cat_alcohol", name: "Alcohol", price: 0, row: 1, col: 5, isNav: true, navTarget: "alcohol" },

    // Row 2
    {
      id: "mod_cat_others",
      name: "Others_Modifier",
      price: 0,
      row: 2,
      col: 1,
      isNav: true,
      navTarget: "others_modifier",
    },
    { id: "mod_less_ice", name: "LESS Ice", price: 0, row: 2, col: 2 },
    { id: "mod_no_ice", name: "NO Ice", price: 0, row: 2, col: 3 },
  ],

  sauce_topping_p1: [
    // Row 1
    { id: "mod_no_mocha", name: "NO Mocha Sauce", price: 0, row: 1, col: 1 },
    { id: "mod_ex_mocha_10k", name: "EX Mocha Sauce 10K", price: 10000, row: 1, col: 2 },
    { id: "mod_ex_mocha", name: "EX Mocha Sauce", price: 0, row: 1, col: 3 },
    { id: "mod_ex_green_tea_10k", name: "EX Green Tea 10K", price: 10000, row: 1, col: 4 },
    { id: "mod_ex_green_tea", name: "EX Green Tea", price: 0, row: 1, col: 5 },

    // Row 2
    { id: "mod_ex_pure_matcha_7k", name: "EX Pure Matcha 7K", price: 7000, row: 2, col: 1 },
    { id: "mod_ex_ad_sauce", name: "EX AD Sauce", price: 0, row: 2, col: 2 },
    { id: "mod_ex_ad_sauce_10k", name: "EX AD Sauce 10K", price: 10000, row: 2, col: 3 },
    { id: "mod_ex_java_chip", name: "EX Java Chip", price: 0, row: 2, col: 4 },
    { id: "mod_ex_java_chip_10k", name: "EX Java Chip 10K", price: 10000, row: 2, col: 5 },

    // Row 3
    { id: "mod_no_whipped_cream", name: "NO Whipped Cream", price: 0, row: 3, col: 1 },
    { id: "mod_ex_whipped_cream_10k", name: "EX Whipped Cream 10K", price: 10000, row: 3, col: 2 },
    { id: "mod_ex_whipped_cream", name: "EX Whipped Cream", price: 0, row: 3, col: 3 },
    { id: "mod_ex_esp_wc", name: "EX ESP WC", price: 0, row: 3, col: 4 },
    { id: "mod_ex_esp_wc_15k", name: "EX ESP WC 15K", price: 15000, row: 3, col: 5 },

    // Row 4
    { id: "mod_ex_chai_tea", name: "EX Chai Tea", price: 0, row: 4, col: 1 },
    { id: "mod_less_chai", name: "LESS Chai", price: 0, row: 4, col: 2 },
    { id: "mod_ex_lemonade", name: "EX Lemonade", price: 0, row: 4, col: 3 },
    { id: "mod_less_lemonade", name: "LESS Lemonade", price: 0, row: 4, col: 4 },
    { id: "mod_no_caramel_sauce", name: "NO Caramel Sauce", price: 0, row: 4, col: 5 },

    // Row 5
    { id: "mod_ex_caramel_sauce", name: "EX Caramel Sauce", price: 0, row: 5, col: 1 },
    { id: "mod_ex_caramel_sauce_10k", name: "EX Caramel Sauce 10K", price: 10000, row: 5, col: 2 },
    { id: "mod_no_topping", name: "NO Topping", price: 0, row: 5, col: 3 },
    { id: "mod_no_cinamon", name: "NO Cinamon", price: 0, row: 5, col: 4 },
    { id: "mod_no_chocolate", name: "NO Chocolate", price: 0, row: 5, col: 5 },

    // Row 6
    { id: "mod_ex_lychee_sauce", name: "EX Lychee Sauce", price: 0, row: 6, col: 1 },
    { id: "mod_ex_lychee_sauce_10k", name: "EX Lychee Sauce 10K", price: 10000, row: 6, col: 2 },
    { id: "mod_ex_hrg", name: "EX HRG", price: 0, row: 6, col: 3 },
    { id: "mod_ex_hrg_20k", name: "EX HRG 20K", price: 20000, row: 6, col: 4 },
    {
      id: "nav_sauce_p2",
      name: "▶",
      price: 0,
      row: 6,
      col: 5,
      isNav: true,
      navTarget: "sauce_topping_p2",
      navDirection: "next",
      variant: "nav-blue",
    },
  ],

  sauce_topping_p2: [
    // Row 1
    {
      id: "nav_sauce_p1",
      name: "◀",
      price: 0,
      row: 1,
      col: 1,
      isNav: true,
      navTarget: "sauce_topping_p1",
      navDirection: "prev",
      variant: "nav-blue",
    },
    { id: "mod_ex_pomegranate", name: "EX Pomegranate", price: 0, row: 1, col: 2 },
    { id: "mod_ex_pomegranate_20k", name: "EX Pomegranate20K", price: 20000, row: 1, col: 3 },
    { id: "mod_ex_strawberry", name: "EX Strawberry", price: 0, row: 1, col: 4 },
    { id: "mod_ex_strawberry_10k", name: "EX Strawberry 10K", price: 10000, row: 1, col: 5 },

    // Row 2
    { id: "mod_ex_cf_jelly_20k", name: "EX CF Jelly 20K", price: 20000, row: 2, col: 1 },
    { id: "mod_ex_tea_pearl_10k", name: "EX Tea Pearl 10K", price: 10000, row: 2, col: 2 },
    { id: "mod_ex_white_pearl_10k", name: "EX White Pearl 10K", price: 10000, row: 2, col: 3 },
    { id: "mod_ex_egj_15k", name: "EX EGJ 15K", price: 15000, row: 2, col: 4 },
    { id: "mod_ex_blood_orange_20k", name: "EX Blood Orange 20K", price: 20000, row: 2, col: 5 },

    // Row 3
    { id: "mod_ex_sc_cold_foam_10k", name: "EX SC Cold Foam 10K", price: 10000, row: 3, col: 1 },
    { id: "mod_ex_pm_cream_foam_10k", name: "EX PM Cream Foam 10K", price: 10000, row: 3, col: 2 },
  ],

  syrup: [
    {
      id: "nav_back_syrup",
      name: "◀",
      price: 0,
      row: 1,
      col: 1,
      isNav: true,
      navTarget: "root",
      navDirection: "back",
      variant: "nav-blue",
    },
    { id: "mod_vanilla_syrup", name: "Vanilla Syrup", price: 10000, row: 1, col: 2 },
    { id: "mod_caramel_syrup", name: "Caramel Syrup", price: 10000, row: 1, col: 3 },
    { id: "mod_hazelnut_syrup", name: "Hazelnut Syrup", price: 10000, row: 1, col: 4 },
    { id: "mod_classic_syrup", name: "Classic Syrup", price: 10000, row: 1, col: 5 },
    { id: "mod_sf_vanilla", name: "Sugar Free Vanilla", price: 10000, row: 2, col: 1 },
    { id: "mod_peppermint_syrup", name: "Peppermint Syrup", price: 10000, row: 2, col: 2 },
    { id: "mod_chai_syrup", name: "Chai Syrup", price: 10000, row: 2, col: 3 },
    { id: "mod_brown_sugar", name: "Brown Sugar Syrup", price: 10000, row: 2, col: 4 },
  ],

  milk: [
    {
      id: "nav_back_milk",
      name: "◀",
      price: 0,
      row: 1,
      col: 1,
      isNav: true,
      navTarget: "root",
      navDirection: "back",
      variant: "nav-blue",
    },
    { id: "mod_soy_milk", name: "Soy Milk", price: 10000, row: 1, col: 2 },
    { id: "mod_oat_milk", name: "Oat Milk", price: 15000, row: 1, col: 3 },
    { id: "mod_almond_milk", name: "Almond Milk", price: 15000, row: 1, col: 4 },
    { id: "mod_non_fat_milk", name: "Non-Fat Milk", price: 0, row: 1, col: 5 },
    { id: "mod_breve", name: "Breve", price: 15000, row: 2, col: 1 },
    { id: "mod_heavy_cream", name: "Heavy Cream", price: 15000, row: 2, col: 2 },
    { id: "mod_coconut_milk", name: "Coconut Milk", price: 15000, row: 2, col: 3 },
    { id: "mod_warm_milk", name: "Warm Milk", price: 0, row: 2, col: 4 },
  ],

  shot: [
    {
      id: "nav_back_shot",
      name: "◀",
      price: 0,
      row: 1,
      col: 1,
      isNav: true,
      navTarget: "root",
      navDirection: "back",
      variant: "nav-blue",
    },
    { id: "mod_add_shot", name: "Add Shot", price: 15000, row: 1, col: 2 },
    { id: "mod_decaf_shot", name: "Decaf Shot", price: 10000, row: 1, col: 3 },
    { id: "mod_blonde_shot", name: "Blonde Shot", price: 10000, row: 1, col: 4 },
    { id: "mod_half_decaf", name: "1/2 Decaf", price: 10000, row: 1, col: 5 },
    { id: "mod_extra_shot", name: "Extra Shot", price: 15000, row: 2, col: 1 },
    { id: "mod_ristretto", name: "Ristretto", price: 0, row: 2, col: 2 },
    { id: "mod_long_shot", name: "Long Shot", price: 0, row: 2, col: 3 },
  ],

  alcohol: [
    {
      id: "nav_back_alcohol",
      name: "◀",
      price: 0,
      row: 1,
      col: 1,
      isNav: true,
      navTarget: "root",
      navDirection: "back",
      variant: "nav-blue",
    },
    { id: "mod_whiskey", name: "Whiskey 30ml", price: 50000, row: 1, col: 2 },
    { id: "mod_rum", name: "Rum 30ml", price: 50000, row: 1, col: 3 },
    { id: "mod_baileys", name: "Baileys 30ml", price: 50000, row: 1, col: 4 },
    { id: "mod_gin", name: "Gin 30ml", price: 50000, row: 1, col: 5 },
  ],

  others_modifier: [
    {
      id: "nav_back_others",
      name: "◀",
      price: 0,
      row: 1,
      col: 1,
      isNav: true,
      navTarget: "root",
      navDirection: "back",
      variant: "nav-blue",
    },
    { id: "mod_extra_hot", name: "Extra Hot", price: 0, row: 1, col: 2 },
    { id: "mod_warm", name: "Warm", price: 0, row: 1, col: 3 },
    { id: "mod_upside_down", name: "Upside Down", price: 0, row: 1, col: 4 },
    { id: "mod_double_cup", name: "Double Cup", price: 0, row: 1, col: 5 },
    { id: "mod_sweetened", name: "Sweetened", price: 0, row: 2, col: 1 },
    { id: "mod_unsweetened", name: "Unsweetened", price: 0, row: 2, col: 2 },
    { id: "mod_add_water", name: "Add Water", price: 0, row: 2, col: 3 },
    { id: "mod_no_water", name: "No Water", price: 0, row: 2, col: 4 },
  ],
};
