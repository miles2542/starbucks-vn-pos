import type { MenuItem } from '@/types/pos';

export const BLENDED_JUICE_ITEMS: MenuItem[] = [
  // Row 1
  {
    id: 't_mj',
    categoryId: 'blended_juice',
    name: 'T MJ',
    baseName: 'MJ',
    hasSizes: true,
    price: 85000,
    prices: { S: 80000, T: 85000, G: 95000, V: 105000 },
    row: 1,
    col: 1,
  },
  {
    id: 't_rj',
    categoryId: 'blended_juice',
    name: 'T RJ',
    baseName: 'RJ',
    hasSizes: true,
    price: 85000,
    prices: { S: 80000, T: 85000, G: 95000, V: 105000 },
    row: 1,
    col: 2,
  },
];
