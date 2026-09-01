# Starbucks OnePOS Simulator

A browser-based training simulator replicating Starbucks OnePOS layout, item navigation hierarchy, and ordering state behaviors.

## Language

### UI Layout
**Header Bar**:
The top status line showing terminal ID (`M17015 - 17015`), current system timestamp, and register number (`0001`).
_Avoid_: App bar, top nav

**Category Section (Section I)**:
The top-right 7x3 grid displaying top-level menu categories (e.g. `HOT ESP`, `ICED ESP`, `Food HN HY BNI`, `SUMMER 3`).
_Avoid_: Header menu, main category bar

**Breadcrumb Banner**:
The dividing banner between Category and Item sections showing the active menu path (e.g. `DS BLACK TEA > V Iced BTG > Sauce/Topping`) and current multiplier badge (`X1`).
_Avoid_: Title bar, category header

**Item Section (Section II)**:
The bottom-right 7x7 grid containing:
- **Modifier & Multiplier Column** (Col 1): `Modifier`, `X 1`, `X 2`, `X 3`, `X 4`, `QTY`.
- **Center Item Matrix** (Cols 2–6, Rows 1–6): Dynamic 5x6 area for items, subcategories, or modifier ingredients, including navigation arrows (`◀`, `▶`).
- **Size & Sets Column** (Col 7): `Short`, `Tall`, `Grande`, `Venti`, `Change Size`, and `Sets order`.
- **Tender Row** (Row 7): Quick payment and integration buttons (`SBUX CARD`, `FOODY/AIRPAY`, `GRAB`, `PAYOO PROMO`, `PAYOO QR`).
_Avoid_: Product grid, main panel

**Order Display Section (Section III)**:
The top-left panel displaying order type status (`Not Set`, `To Go`, `For Here`), `Order No`, selected line items with modifiers and active selection highlight, and quantity/tax/total amounts.
_Avoid_: Cart, ticket view

**Finalize Section (Section IV)**:
The bottom-left panel containing order scrolling, total amount display, line modifications (`CLEAR ALL`, `Void`), serve type selectors (`Serve type/All`, `Serve type/item`), and inquiry actions (`Rewards Enquiry`, `TRANS. INQ.`).
_Avoid_: Footer, action bar

**Footer Status Bar**:
The bottom system strip showing software version (`OnePOS [2.0.10.0]`), active serve type, business date (`Business Date20260829`), and cashier name.
_Avoid_: App footer, copyright bar

### Menu & State Concepts
**Serve Type**:
The consumption method (`Not Set`, `To Go`, `For Here`, `BYO`, `B2BTS`) applied globally or per line item.
_Avoid_: Dining option, order mode

**Serve Type Suffix**:
A single-character code (`B` for BYO, `T` for To Go, `H` for For Here) appended to the item sequence number in Section III when its serve type differs from the order's global serve type.
_Avoid_: Order tag, type badge

**Active Line Highlight**:
The visual selection state in Section III (highlight color ~`#a2c374` vs unselected row ~`#c5c4c7`), targeting either a base beverage or a specific modifier line.
_Avoid_: Cart focus, item cursor

**Modifier Sub-line**:
An indented entry with a `>` prefix displayed underneath its parent beverage in Section III, having its own price and voidable state.
_Avoid_: Item add-on, sub-item

**Size Prefix**:
The single-letter code (`S`, `T`, `G`, `V`) prepended to beverage item buttons and line items.
_Avoid_: Volume, cup size

**Stock Badge**:
A small green number in the top-right corner of an item button indicating available inventory.
_Avoid_: Quantity tag, stock count

**Sold Out Overlay**:
A red "X" drawn across an item button indicating zero stock availability.
_Avoid_: Disabled button, grayed out

