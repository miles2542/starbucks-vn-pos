import type { MenuItem } from "@/types/pos";

export type PaymentTabId = "normal_payment" | "coupon" | "overseas_discount";

export interface PaymentCategoryTab {
  id: PaymentTabId;
  name: string;
  row: number;
  col: number;
}

export const PAYMENT_CATEGORY_TABS: PaymentCategoryTab[] = [
  { id: "normal_payment", name: "Normal Payment", row: 1, col: 1 },
  { id: "coupon", name: "COUPON", row: 1, col: 2 },
  { id: "overseas_discount", name: "Overseas Discount", row: 1, col: 3 },
];

export const PAYMENT_NORMAL_ITEMS: MenuItem[] = [
  // Row 1
  {
    id: "pay_cash",
    categoryId: "normal_payment",
    name: "CASH",
    variant: "tender-yellow",
    row: 1,
    col: 1,
  },
  {
    id: "pay_sbux_card",
    categoryId: "normal_payment",
    name: "SBUX CARD",
    variant: "tender-cyan",
    row: 1,
    col: 2,
  },
  {
    id: "pay_on_house",
    categoryId: "normal_payment",
    name: "ON HOUSE",
    variant: "default",
    row: 1,
    col: 3,
  },
  {
    id: "pay_foody_airpay",
    categoryId: "normal_payment",
    name: "FOODY/AIRPAY",
    variant: "default",
    row: 1,
    col: 4,
  },
  {
    id: "pay_grab",
    categoryId: "normal_payment",
    name: "GRAB",
    variant: "default",
    row: 1,
    col: 5,
  },

  // Row 2
  {
    id: "pay_credit_card_manual",
    categoryId: "normal_payment",
    name: "CREDIT CARD MANUAL",
    variant: "default",
    row: 2,
    col: 1,
  },
  {
    id: "pay_sbux_card_coupon",
    categoryId: "normal_payment",
    name: "SBUX_CARD_COUPON",
    variant: "default",
    row: 2,
    col: 2,
  },
  {
    id: "pay_zalopay",
    categoryId: "normal_payment",
    name: "ZALOPAY",
    variant: "default",
    row: 2,
    col: 3,
  },
  {
    id: "pay_momo",
    categoryId: "normal_payment",
    name: "MOMO",
    variant: "default",
    row: 2,
    col: 4,
  },
  {
    id: "pay_payoo_no_promo",
    categoryId: "normal_payment",
    name: "PAYOO NO PROMO",
    variant: "default",
    row: 2,
    col: 5,
  },

  // Row 3
  {
    id: "pay_payoo_qr",
    categoryId: "normal_payment",
    name: "PAYOO QR",
    variant: "default",
    row: 3,
    col: 1,
  },
  {
    id: "pay_e_voucher_16401",
    categoryId: "normal_payment",
    name: "E-Voucher 16401",
    variant: "default",
    row: 3,
    col: 2,
  },
  {
    id: "pay_payoo_promo",
    categoryId: "normal_payment",
    name: "PAYOO PROMO",
    variant: "default",
    row: 3,
    col: 3,
  },
];

export const PAYMENT_OVERSEAS_DISCOUNT_ITEMS: MenuItem[] = [
  // Row 1
  {
    id: "disc_ovsemp_hk",
    categoryId: "overseas_discount",
    name: "OVSEMP HK SBSDISC",
    variant: "default",
    row: 1,
    col: 1,
  },
  {
    id: "disc_ovsemp_cn",
    categoryId: "overseas_discount",
    name: "OVSEMP CN SBSDISC",
    variant: "default",
    row: 1,
    col: 2,
  },
  {
    id: "disc_ovsemp_th",
    categoryId: "overseas_discount",
    name: "OVSEMP TH SBSDISC",
    variant: "default",
    row: 1,
    col: 3,
  },
  {
    id: "disc_ovsemp_sg",
    categoryId: "overseas_discount",
    name: "OVSEMP SG SBSDISC",
    variant: "default",
    row: 1,
    col: 4,
  },
  {
    id: "disc_ovsemp_kh",
    categoryId: "overseas_discount",
    name: "OVSEMP KH SBSDISC",
    variant: "default",
    row: 1,
    col: 5,
  },

  // Row 2
  {
    id: "disc_ovsemp_macau",
    categoryId: "overseas_discount",
    name: "OVSEMP MACAU SBSDISC",
    variant: "default",
    row: 2,
    col: 1,
  },
  {
    id: "disc_ovsemp_lao",
    categoryId: "overseas_discount",
    name: "OVSEMP LAO SBSDISC",
    variant: "default",
    row: 2,
    col: 2,
  },
];

export const PAYMENT_COUPON_ITEMS: MenuItem[] = [
  // Row 1
  {
    id: "coupon_staff_discount",
    categoryId: "coupon",
    name: "STAFF DISCOUNT",
    variant: "default",
    row: 1,
    col: 1,
  },
];

export const PAYMENT_ITEMS_BY_TAB: Record<PaymentTabId, MenuItem[]> = {
  normal_payment: PAYMENT_NORMAL_ITEMS,
  overseas_discount: PAYMENT_OVERSEAS_DISCOUNT_ITEMS,
  coupon: PAYMENT_COUPON_ITEMS,
};
