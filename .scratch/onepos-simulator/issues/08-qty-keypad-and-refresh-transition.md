# 08: QTY Keypad Modal and Expanded Refresh Transition Engine

**What to build:** Implement the classic touchscreen 3x4 numeric keypad dialog for the Col 1 `QTY` button to change line item quantities, and expand the cell refresh transition to 100ms across all grid mutations (category, size modifiers, multiplier, subcategories).

**Blocked by:** 07: Order State Refinements

**Status:** done

- [x] Tapping `QTY` on Col 1 when a drink or modifier is selected opens a classic 3x4 numeric keypad dialog (0–9, Clear, Enter)
- [x] Dialog displays the target item name, current quantity, and interactive numeric keypad
- [x] Confirming updates the target item's quantity, price calculations, and Section III totals
- [x] Tapping `QTY` when no line item is selected is a no-op
- [x] Grid refresh transition duration increased from 60ms to 100ms
- [x] 100ms cell refresh animation triggered when changing size buttons (`Short`, `Tall`, `Grande`, `Venti`), multipliers (`X 1`–`X 4`), categories, and subcategories
- [x] Unit & integration tests in `tests/qtyKeypadAndRefresh.test.tsx`
