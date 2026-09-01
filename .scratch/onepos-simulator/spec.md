# Specification: Starbucks OnePOS Simulator Core Shell & Base Ordering

Status: ready-for-agent

## Problem Statement
The user needs to train rapid memorization and muscle memory for the Starbucks OnePOS touchscreen register interface (which category contains which item, modifier paths, subcategory navigation, size changing, and order finalization flows). Because real OnePOS systems are restricted to store hardware, the user captured physical register screen photographs to replicate the interface, layout geometry, color styling, and state behaviors as a high-fidelity web simulator.

## Solution
A pixel-accurate web simulator built with React, TypeScript, Tailwind CSS, and Zustand. It implements a fixed-aspect 4-panel POS grid matching the physical POS screen layout, supporting touch and desktop with uniform scale-to-fit and zoom controls. The initial milestone implements the complete chrome, the Section I category grid, dynamic Section II menus (`HOT ESP`, `Food HN HY BNI` with `BAKERY HN`, and `Modifier` with `Sauce/Topping`), Section III line item tracking with individual line highlights and modifier indentation, and Section IV order controls (line reordering, Serve Type modal, Void, Clear All).

## User Stories

1. As a trainee barista, I want to see the exact 4-panel OnePOS touchscreen layout rendered with correct colors, borders, and proportions so that my muscle memory transfers directly to the real register.
2. As a trainee, I want the web interface to scale cleanly to fit my mobile phone, tablet, or PC screen without breaking or reflowing button coordinates.
3. As a PC user, I want a manual scale slider to adjust the canvas display size so I can replicate physical POS dimensions on large monitors.
4. As a trainee, I want to tap any category in Section I (top-right 7x3 grid) and see Section II (bottom-right 7x7 grid) switch to that category's items with the authentic ~60ms refresh transition.
5. As a trainee, I want to see the active navigation breadcrumb displayed in the yellow dividing banner (e.g. `HOT ESP` or `Food HN HY BNI > BAKERY HN`) with the active multiplier badge `X1`.
6. As a trainee viewing `HOT ESP`, I want to see drink items (`T LATTE`, `T CAPPUCCINO`, `T MOCHA`, `T CM`, `T AMERICANO`, `T ADL`, `SOLO ESPRESSO`, `DOPPIO ESPRESSO`, `SOLO MACCHIATO`, `DOPPIO MACCHIATO`, `DOPPIO CON PANNA`, `SOLO CON PANNA`, `T FLAT WHITE`, `T AHL`, `T CCRL`) positioned in their exact grid slots.
7. As a trainee viewing a drink menu, I want tapping `Short`, `Tall`, `Grande`, or `Venti` on Column 7 to change all drink labels in Section II to that size prefix (`S`, `T`, `G`, `V`).
8. As a trainee, I want tapping a drink button in Section II to append a new line item to Section III in the currently selected size with a default price (e.g. 75,000 VND).
9. As a trainee, I want changing category in Section I to reset the active size buffer back to default `Tall` (`T`).
10. As a trainee viewing `Food HN HY BNI`, I want to see 4 subcategory buttons (`BAKERY HN`, `DESSERTS HN`, `SANDWICHES HN`, `Snack Mixology HN`).
11. As a trainee, I want tapping `BAKERY HN` to display bakery items with their stock badges (e.g. `4`, `2`, `5`, `3`) and sold-out red `X` overlays on out-of-stock items.
12. As a trainee, I want tapping `Modifier` on Column 1 to switch Section II to the modifier category showing `Syrup`, `Sauce/Topping`, `Milk`, `Shot`, `Alcohol`, `Others_Modifier`, `LESS Ice`, `NO Ice`.
13. As a trainee, I want tapping `Sauce/Topping` to view topping options with page navigation (`◀` / `▶`) across multi-page grids.
14. As a trainee, I want tapping any modifier button to append an indented modifier line (`> Modifier Name`) under the currently highlighted line in Section III and remain on the modifier screen for compound additions.
15. As a trainee, I want to tap any individual drink line or modifier line in Section III to highlight it (`#a2c374` vs unhighlighted `#c5c4c7`).
16. As a trainee, I want tapping `Void` in Section IV to delete the currently highlighted modifier line, or delete the drink along with all its attached modifiers if the drink line is highlighted.
17. As a trainee, I want tapping `CLEAR ALL` to clear the entire order after confirmation and reset the order total to 0.
18. As a trainee, I want tapping the blue arrow buttons in Section IV to move the highlighted line up, down, to top, or to bottom.
19. As a trainee, I want tapping `Serve type/All` to open a modal with options `For Here`, `To Go`, `BYO`, and `B2BTS` (defaulting to `For Here`).
20. As a trainee, I want confirming `Serve type/All` to update the global order serve type from `Not Set` to the selected type in both the top banner and footer status bar.
21. As a trainee, I want `Serve type/item` to be disabled while the global serve type is `Not Set`, and enabled once a global serve type is chosen.
22. As a trainee, I want setting `Serve type/item` on a specific drink to append the corresponding suffix (`B` for BYO, `T` for To Go, `H` for For Here) to that line's sequence number (e.g. `2B`) if it differs from the global serve type.
23. As a trainee, I want tapping `Change Size` on Column 7 when a drink is highlighted to open a modal allowing size reassignment (`Short`, `Tall`, `Grande`, `Venti`).
24. As a trainee, I want Section III to continuously calculate and display accurate `Total Quantity`, `Tax Amount`, and `Total Amount` with thousands separators.

## Implementation Decisions

1. **SPA Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide icons, and Zustand for state management.
2. **Fixed Virtual Coordinate System**:
   - POS viewport rendered inside a canonical virtual box (e.g. 1920x1080 / 16:9 ratio) centered with CSS `transform: scale(...)`.
   - Floating tool overlay providing zoom controls (Fit, 100%, 75%, 50%) and toggle for cell refresh flicker.
3. **Menu Grid Engine & Declarative Schema**:
   - Screen definitions stored in modular TypeScript data structures indexing 7x3 and 7x7 matrices.
   - Dynamic button types: `drink`, `subcategory`, `modifier_group`, `modifier_item`, `navigation_back`, `empty`.
   - Buttons define exact row/col positions, background gradients, text colors, stock counts, and sold-out flags.
4. **Order State Model**:
   - Zustand store holding `orders`, `activeLineId` (drink or modifier ID), `globalServeType`, `sizeBuffer`, `quantityMultiplier`, `activeScreenId`, `breadcrumbStack`.
   - Modifiers modeled as sub-entities belonging to parent line items, with independent IDs for single-line selection and voiding.
5. **Serve Type Logic**:
   - Global serve type enum: `Not Set`, `For Here`, `To Go`, `BYO`, `B2BTS`.
   - Per-item override enum: `Default`, `For Here`, `To Go`, `BYO`, `B2BTS`.
   - Line number formatter derives suffix dynamically (`${index + 1}${itemServeType !== globalServeType ? suffixMap[itemServeType] : ''}`).

## Testing Decisions

1. **High Seam Testing**: Single unified test suite testing the POS state store and UI dispatch harness:
   - Category navigation and Section II grid rendering.
   - Size buffer application and category reset behavior.
   - Item addition, modifier chaining, line selection, and line-specific voiding.
   - Serve type modal workflows (global assignment and line-item suffix generation).
   - Order total, quantity, and tax arithmetic.
2. **Framework**: Vitest + React Testing Library.

## Out of Scope
- Backend database or cloud synchronization (Milestone 1 is pure client-side training simulator).
- Payment gateway integration / real card processing (Tender buttons record simulated mock payment).
- Full OCR automated extraction of all 45 photos (Milestone 1 implements the 4 reference menus: `HOT ESP`, `Food HN HY BNI`, `BAKERY HN`, `Modifier` / `Sauce/Topping`).
- Timed drill / scoring game mode (deferred to Milestone 2).

## Further Notes
- Color palette strictly derived from the reference photos (Purple `#6C6FB5`, Highlight green `#A2C374`, Unselected line `#C5C4C7`, Yellow action `#F1C232`, Cyan promo `#46BDC6`, Green loyalty `#93C47D`, Red modifier gradients `#E06666`).
