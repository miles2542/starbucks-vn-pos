import type { MenuItem } from '@/types/pos';

// Top-level OTHER H/I menu
export const OTHER_HI_ITEMS: MenuItem[] = [
  {
    id: 'other_hi_signature',
    categoryId: 'other_hi',
    name: 'SIGNATURE',
    isSubcategory: true,
    row: 1,
    col: 1,
  },
  {
    id: 'other_hi_milk',
    categoryId: 'other_hi',
    name: 'MILK',
    isSubcategory: true,
    row: 1,
    col: 2,
  },
  {
    id: 'other_hi_refreshers',
    categoryId: 'other_hi',
    name: 'Refreshers',
    isSubcategory: true,
    row: 1,
    col: 3,
  },
];

// Subcategory: SIGNATURE
export const OTHER_HI_SIGNATURE_ITEMS: MenuItem[] = [
  {
    id: 't_hot_chocolate',
    categoryId: 'other_hi',
    name: 'T HOT CHOCOLATE',
    baseName: 'HOT CHOCOLATE',
    hasSizes: true,
    price: 70000,
    prices: { S: 65000, T: 70000, G: 80000, V: 90000 },
    row: 1,
    col: 1,
  },
  {
    id: 't_iced_chocolate',
    categoryId: 'other_hi',
    name: 'T ICED CHOCOLATE',
    baseName: 'ICED CHOCOLATE',
    hasSizes: true,
    price: 70000,
    prices: { S: 65000, T: 70000, G: 80000, V: 90000 },
    row: 1,
    col: 2,
  },
];

// Subcategory: MILK
export const OTHER_HI_MILK_ITEMS: MenuItem[] = [
  {
    id: 't_cold_milk',
    categoryId: 'other_hi',
    name: 'T COLD MILK',
    baseName: 'COLD MILK',
    hasSizes: true,
    price: 50000,
    prices: { S: 45000, T: 50000, G: 60000, V: 70000 },
    row: 1,
    col: 1,
  },
  {
    id: 't_steamed_milk',
    categoryId: 'other_hi',
    name: 'T STEAMED MILK',
    baseName: 'STEAMED MILK',
    hasSizes: true,
    price: 50000,
    prices: { S: 45000, T: 50000, G: 60000, V: 70000 },
    row: 1,
    col: 2,
  },
  {
    id: 'soy_milk_t',
    categoryId: 'other_hi',
    name: 'SOY MILK T',
    baseName: 'SOY MILK',
    hasSizes: true,
    price: 55000,
    prices: { S: 50000, T: 55000, G: 65000, V: 75000 },
    row: 1,
    col: 3,
  },
  {
    id: 'iced_soy_milk_t',
    categoryId: 'other_hi',
    name: 'Iced Soy Milk T',
    baseName: 'Iced Soy Milk',
    hasSizes: true,
    price: 55000,
    prices: { S: 50000, T: 55000, G: 65000, V: 75000 },
    row: 1,
    col: 4,
  },
];

// Subcategory: Refreshers
export const OTHER_HI_REFRESHERS_ITEMS: MenuItem[] = [
  {
    id: 't_sar',
    categoryId: 'other_hi',
    name: 'T SAR',
    baseName: 'SAR',
    hasSizes: true,
    price: 75000,
    prices: { S: 70000, T: 75000, G: 85000, V: 95000 },
    row: 1,
    col: 1,
  },
  {
    id: 't_pdr',
    categoryId: 'other_hi',
    name: 'T PDR',
    baseName: 'PDR',
    hasSizes: true,
    price: 75000,
    prices: { S: 70000, T: 75000, G: 85000, V: 95000 },
    row: 1,
    col: 2,
  },
  {
    id: 't_mdr',
    categoryId: 'other_hi',
    name: 'T MDR',
    baseName: 'MDR',
    hasSizes: true,
    price: 75000,
    prices: { S: 70000, T: 75000, G: 85000, V: 95000 },
    row: 1,
    col: 3,
  },
  {
    id: 't_dmdr',
    categoryId: 'other_hi',
    name: 'T DMDR',
    baseName: 'DMDR',
    hasSizes: true,
    price: 80000,
    prices: { S: 75000, T: 80000, G: 90000, V: 100000 },
    row: 1,
    col: 4,
  },
];
