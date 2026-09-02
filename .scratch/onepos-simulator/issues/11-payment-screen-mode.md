# 11: Payment Screen Mode (Normal Payment, COUPON, and Overseas Discount)

**What to build:** Implement the full payment screen mode. Tapping the large amount display in Section IV when at least 1 item is in the order switches the UI into Payment Mode (`isPaymentMode: true`). In this mode: Section I displays payment categories (`Normal Payment`, `COUPON`, `Overseas Discount`); Section II renders authentic payment tender matrices matching reference photos; Section IV renders red `BACK`, `CLEAR ALL`, `DELETE`, and enquiry buttons. Tapping `BACK` returns to order mode. Tapping `Complete Payment` finalizes payment and increments order number.

**Blocked by:** 10: Expanded Menu Ingestion

**Status:** closed

- [x] Tapping Section IV total amount display when `orderItems.length > 0` transitions into Payment Screen Mode
- [x] Section I displays 3 payment tabs on Row 1: `Normal Payment`, `COUPON`, `Overseas Discount`
- [x] Section II Col 1 renders multipliers `X 1`–`X 4` on Rows 1–4 and `QTY` on Row 5 (no Modifier button)
- [x] Section II Col 7 renders coral red `Complete Payment` on Row 6
- [x] Section II Center 5x6 renders tender options for active payment tab:
  - `Normal Payment`: `CASH` (yellow/lime), `SBUX CARD` (cyan), `ON HOUSE`, `FOODY/AIRPAY`, `GRAB`, `CREDIT CARD MANUAL`, `SBUX_CARD_COUPON`, `ZALOPAY`, `MOMO`, `PAYOO NO PROMO`, `PAYOO QR`, `E-Voucher 16401`, `PAYOO PROMO`
  - `Overseas Discount`: `OVSEMP HK SBSDISC`, `OVSEMP CN SBSDISC`, `OVSEMP TH SBSDISC`, `OVSEMP SG SBSDISC`, `OVSEMP KH SBSDISC`, `OVSEMP MACAU SBSDISC`, `OVSEMP LAO SBSDISC`
  - `COUPON`: `STAFF DISCOUNT`
- [x] Section IV renders Row 1 buttons: `BACK` (red), `CLEAR ALL` (red), `DELETE` (red), `Balance Enquiry`; Row 2: `Rewards Enquiry`
- [x] Tapping `BACK` restores standard ordering interface
- [x] Tapping `Complete Payment` clears order, increments order sequence, and returns to ordering mode
- [x] Unit & integration tests in `tests/paymentScreen.test.tsx`

