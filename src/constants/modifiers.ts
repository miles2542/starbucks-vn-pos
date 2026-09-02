import type { ButtonVariant } from '@/types/pos';

export interface ModifierItem {
  id: string;
  name: string;
  price: number;
  row: number; // 1-6 (in center 5x6 matrix)
  col: number; // 1-5 (in center 5x6 matrix)
  isNav?: boolean;
  navTarget?: string;
  navDirection?: 'prev' | 'next' | 'back';
  variant?: ButtonVariant;
}

export const MODIFIER_PAGES: Record<string, ModifierItem[]> = {
  root: [
    // Row 1
    { id: 'mod_cat_syrup', name: 'Syrup', price: 0, row: 1, col: 1, isNav: true, navTarget: 'syrup' },
    {
      id: 'mod_cat_sauce_topping',
      name: 'Sauce/Topping',
      price: 0,
      row: 1,
      col: 2,
      isNav: true,
      navTarget: 'sauce_topping_p1',
    },
    { id: 'mod_cat_milk', name: 'Milk', price: 0, row: 1, col: 3, isNav: true, navTarget: 'milk' },
    { id: 'mod_cat_shot', name: 'Shot', price: 0, row: 1, col: 4, isNav: true, navTarget: 'shot' },
    { id: 'mod_cat_alcohol', name: 'Alcohol', price: 0, row: 1, col: 5, isNav: true, navTarget: 'alcohol' },

    // Row 2
    {
      id: 'mod_cat_others',
      name: 'Others_Modifier',
      price: 0,
      row: 2,
      col: 1,
      isNav: true,
      navTarget: 'others_modifier',
    },
    { id: 'mod_less_ice', name: 'LESS Ice', price: 0, row: 2, col: 2 },
    { id: 'mod_no_ice', name: 'NO Ice', price: 0, row: 2, col: 3 },
  ],

  sauce_topping_p1: [
    // Row 1
    { id: 'mod_no_mocha', name: 'NO Mocha Sauce', price: 0, row: 1, col: 1 },
    { id: 'mod_ex_mocha_10k', name: 'EX Mocha Sauce 10K', price: 10000, row: 1, col: 2 },
    { id: 'mod_ex_mocha', name: 'EX Mocha Sauce', price: 0, row: 1, col: 3 },
    { id: 'mod_ex_green_tea_10k', name: 'EX Green Tea 10K', price: 10000, row: 1, col: 4 },
    { id: 'mod_ex_green_tea', name: 'EX Green Tea', price: 0, row: 1, col: 5 },

    // Row 2
    { id: 'mod_ex_pure_matcha_7k', name: 'EX Pure Matcha 7K', price: 7000, row: 2, col: 1 },
    { id: 'mod_ex_ad_sauce', name: 'EX AD Sauce', price: 0, row: 2, col: 2 },
    { id: 'mod_ex_ad_sauce_10k', name: 'EX AD Sauce 10K', price: 10000, row: 2, col: 3 },
    { id: 'mod_ex_java_chip', name: 'EX Java Chip', price: 0, row: 2, col: 4 },
    { id: 'mod_ex_java_chip_10k', name: 'EX Java Chip 10K', price: 10000, row: 2, col: 5 },

    // Row 3
    { id: 'mod_no_whipped_cream', name: 'NO Whipped Cream', price: 0, row: 3, col: 1 },
    { id: 'mod_ex_whipped_cream_10k', name: 'EX Whipped Cream 10K', price: 10000, row: 3, col: 2 },
    { id: 'mod_ex_whipped_cream', name: 'EX Whipped Cream', price: 0, row: 3, col: 3 },
    { id: 'mod_ex_esp_wc', name: 'EX ESP WC', price: 0, row: 3, col: 4 },
    { id: 'mod_ex_esp_wc_15k', name: 'EX ESP WC 15K', price: 15000, row: 3, col: 5 },

    // Row 4
    { id: 'mod_ex_chai_tea', name: 'EX Chai Tea', price: 0, row: 4, col: 1 },
    { id: 'mod_less_chai', name: 'LESS Chai', price: 0, row: 4, col: 2 },
    { id: 'mod_ex_lemonade', name: 'EX Lemonade', price: 0, row: 4, col: 3 },
    { id: 'mod_less_lemonade', name: 'LESS Lemonade', price: 0, row: 4, col: 4 },
    { id: 'mod_no_caramel_sauce', name: 'NO Caramel Sauce', price: 0, row: 4, col: 5 },

    // Row 5
    { id: 'mod_ex_caramel_sauce', name: 'EX Caramel Sauce', price: 0, row: 5, col: 1 },
    { id: 'mod_ex_caramel_sauce_10k', name: 'EX Caramel Sauce 10K', price: 10000, row: 5, col: 2 },
    { id: 'mod_no_topping', name: 'NO Topping', price: 0, row: 5, col: 3 },
    { id: 'mod_no_cinamon', name: 'NO Cinamon', price: 0, row: 5, col: 4 },
    { id: 'mod_no_chocolate', name: 'NO Chocolate', price: 0, row: 5, col: 5 },

    // Row 6
    { id: 'mod_ex_lychee_sauce', name: 'EX Lychee Sauce', price: 0, row: 6, col: 1 },
    { id: 'mod_ex_lychee_sauce_10k', name: 'EX Lychee Sauce 10K', price: 10000, row: 6, col: 2 },
    { id: 'mod_ex_hrg', name: 'EX HRG', price: 0, row: 6, col: 3 },
    { id: 'mod_ex_hrg_20k', name: 'EX HRG 20K', price: 20000, row: 6, col: 4 },
    {
      id: 'nav_sauce_p2',
      name: '▶',
      price: 0,
      row: 6,
      col: 5,
      isNav: true,
      navTarget: 'sauce_topping_p2',
      navDirection: 'next',
      variant: 'nav-blue',
    },
  ],

  sauce_topping_p2: [
    // Row 1
    {
      id: 'nav_sauce_p1',
      name: '◀',
      price: 0,
      row: 1,
      col: 1,
      isNav: true,
      navTarget: 'sauce_topping_p1',
      navDirection: 'prev',
      variant: 'nav-blue',
    },
    { id: 'mod_ex_pomegranate', name: 'EX Pomegranate', price: 0, row: 1, col: 2 },
    { id: 'mod_ex_pomegranate_20k', name: 'EX Pomegranate20K', price: 20000, row: 1, col: 3 },
    { id: 'mod_ex_strawberry', name: 'EX Strawberry', price: 0, row: 1, col: 4 },
    { id: 'mod_ex_strawberry_10k', name: 'EX Strawberry 10K', price: 10000, row: 1, col: 5 },

    // Row 2
    { id: 'mod_ex_cf_jelly_20k', name: 'EX CF Jelly 20K', price: 20000, row: 2, col: 1 },
    { id: 'mod_ex_tea_pearl_10k', name: 'EX Tea Pearl 10K', price: 10000, row: 2, col: 2 },
    { id: 'mod_ex_white_pearl_10k', name: 'EX White Pearl 10K', price: 10000, row: 2, col: 3 },
    { id: 'mod_ex_egj_15k', name: 'EX EGJ 15K', price: 15000, row: 2, col: 4 },
    { id: 'mod_ex_blood_orange_20k', name: 'EX Blood Orange 20K', price: 20000, row: 2, col: 5 },

    // Row 3
    { id: 'mod_ex_sc_cold_foam_10k', name: 'EX SC Cold Foam 10K', price: 10000, row: 3, col: 1 },
    { id: 'mod_ex_pm_cream_foam_10k', name: 'EX PM Cream Foam 10K', price: 10000, row: 3, col: 2 },
  ],

  syrup: [
    // Row 1
    { id: 'mod_ex_caramel_syrup', name: 'EX Caramel Syrup', price: 0, row: 1, col: 1 },
    { id: 'mod_ex_caramel_syrup_10k', name: 'EX Caramel Syrup 10K', price: 10000, row: 1, col: 2 },
    { id: 'mod_ex_salted_caramel', name: 'EX Salted Caramel', price: 0, row: 1, col: 3 },
    { id: 'mod_ex_salted_caramel_10k', name: 'EX Salted Caramel10K', price: 10000, row: 1, col: 4 },
    { id: 'mod_ex_brown_sugar', name: 'EX Brown Sugar', price: 0, row: 1, col: 5 },

    // Row 2
    { id: 'mod_ex_brown_sugar_10k', name: 'EX Brown Sugar 10K', price: 10000, row: 2, col: 1 },
    { id: 'mod_ex_vanilla', name: 'EX Vanilla', price: 0, row: 2, col: 2 },
    { id: 'mod_ex_vanilla_10k', name: 'EX Vanilla 10K', price: 10000, row: 2, col: 3 },
    { id: 'mod_ex_hazelnut', name: 'EX Hazelnut', price: 0, row: 2, col: 4 },
    { id: 'mod_ex_hazelnut_10k', name: 'EX Hazelnut 10K', price: 10000, row: 2, col: 5 },

    // Row 3
    { id: 'mod_light_cf_base', name: 'LIGHT - CF Base', price: 0, row: 3, col: 1 },
    { id: 'mod_ex_cf_base', name: 'EX CF Base', price: 0, row: 3, col: 2 },
    { id: 'mod_light_cream_base', name: 'LIGHT Cream Base', price: 0, row: 3, col: 3 },
    { id: 'mod_ex_cream_base', name: 'EX Cream Base', price: 0, row: 3, col: 4 },
    { id: 'mod_less_frapproast', name: 'LESS FrappRoast', price: 0, row: 3, col: 5 },

    // Row 4
    { id: 'mod_replace_esp_shot', name: 'REPLACE Esp Shot', price: 0, row: 4, col: 1 },
    { id: 'mod_no_sweet', name: 'NO Sweet', price: 0, row: 4, col: 2 },
    { id: 'mod_less_sweet', name: 'LESS Sweet', price: 0, row: 4, col: 3 },
    { id: 'mod_ex_sweet', name: 'EX Sweet', price: 0, row: 4, col: 4 },
  ],

  milk: [
    // Row 1
    { id: 'mod_replace_almond_5k', name: 'REPLACE Almond 5K', price: 5000, row: 1, col: 1 },
    { id: 'mod_replace_soy_2k', name: 'REPLACE Soy 2K', price: 2000, row: 1, col: 2 },
    { id: 'mod_replace_low_fat_2k', name: 'REPLACE Low Fat 2K', price: 2000, row: 1, col: 3 },
    { id: 'mod_replace_whole_milk', name: 'REPLACE Whole Milk', price: 0, row: 1, col: 4 },
    { id: 'mod_replace_half_half_5k', name: 'REPLACE Half Half 5K', price: 5000, row: 1, col: 5 },

    // Row 2
    { id: 'mod_replace_oatmilk_5k', name: 'REPLACE Oatmilk 5K', price: 5000, row: 2, col: 1 },
    { id: 'mod_replace_pistachio_10k', name: 'REPLACE Pistachio10K', price: 10000, row: 2, col: 2 },
    { id: 'mod_replace_cocomilk_2k', name: 'REPLACE CocoMilk 2K', price: 2000, row: 2, col: 3 },
    { id: 'mod_ex_milk_7k', name: 'EX Milk 7K', price: 7000, row: 2, col: 4 },
    { id: 'mod_ex_half_half_7k', name: 'EX Half Half 7K', price: 7000, row: 2, col: 5 },
  ],

  shot: [
    // Row 1
    { id: 'mod_ex_esp_15k', name: 'EX ESP 15K', price: 15000, row: 1, col: 1 },
    { id: 'mod_ex_decaf_15k', name: 'EX Decaf 15K', price: 15000, row: 1, col: 2 },
    { id: 'mod_replace_decaf', name: 'REPLACE Decaf', price: 0, row: 1, col: 3 },
    { id: 'mod_replace_half_decaf', name: 'REPLACE Half Decaf', price: 0, row: 1, col: 4 },
    { id: 'mod_ex_r_mb21_20k', name: 'EX R MB21 20K', price: 20000, row: 1, col: 5 },

    // Row 2
    { id: 'mod_replace_ec_no_frapp', name: 'REPLACE EC. NO FRAPP', price: 0, row: 2, col: 1 },
    { id: 'mod_replace_r_ec_10k', name: 'REPLACE R EC 10K', price: 10000, row: 2, col: 2 },
    { id: 'mod_replace_ristretto', name: 'REPLACE Ristretto', price: 0, row: 2, col: 3 },
    { id: 'mod_rep_long_shot', name: 'REP Long Shot', price: 0, row: 2, col: 4 },
    { id: 'mod_brown_sugar_stick', name: 'Brown Sugar stick', price: 0, row: 2, col: 5 },

    // Row 3
    { id: 'mod_white_sugar', name: 'White sugar', price: 0, row: 3, col: 1 },
    { id: 'mod_equals_diet_sugar', name: 'EQUALS (diet sugar)', price: 0, row: 3, col: 2 },
    { id: 'mod_kid', name: 'KID', price: 0, row: 3, col: 3 },
    { id: 'mod_ex_hot', name: 'EX Hot', price: 0, row: 3, col: 4 },
    { id: 'mod_no_water', name: 'NO Water', price: 0, row: 3, col: 5 },
  ],

  alcohol: [
    {
      id: 'nav_back_alcohol',
      name: '◀',
      price: 0,
      row: 1,
      col: 1,
      isNav: true,
      navTarget: 'root',
      navDirection: 'back',
      variant: 'nav-blue',
    },
    { id: 'mod_whiskey', name: 'Whiskey 30ml', price: 50000, row: 1, col: 2 },
    { id: 'mod_rum', name: 'Rum 30ml', price: 50000, row: 1, col: 3 },
    { id: 'mod_baileys', name: 'Baileys 30ml', price: 50000, row: 1, col: 4 },
    { id: 'mod_gin', name: 'Gin 30ml', price: 50000, row: 1, col: 5 },
  ],

  others_modifier: [],
};
