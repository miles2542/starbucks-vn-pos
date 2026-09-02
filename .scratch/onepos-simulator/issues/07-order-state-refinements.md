# 07: Order State Refinements (Order Number Auto-Increment, Drink Reordering, and Serve-Type Gating)

**What to build:** Refine core POS state behaviors: auto-increment the 10-digit order number (`0100002787` -> `0100002788`) upon clearing/voiding the last item with `localStorage` persistence; update Section IV arrow buttons to reorder parent drinks (and their attached child modifiers) up, down, top, and bottom in the order list; ensure `Serve type/item` is always visually enabled but only activates when a global serve type is already selected.

**Blocked by:** 06: Order Finalization, Serve Type Modals, and Line Operations

**Status:** done

- [x] Order number format `010000XXXX` stored in state and persisted in `localStorage`
- [x] Auto-increments sequence number when order becomes empty (via `clearOrder` or voiding last line)
- [x] Section IV arrow buttons (Up, Down, Top, Bottom) swap parent drink positions in `orderItems`, preserving attached child modifiers
- [x] Reordering triggered while a child modifier is highlighted cascades to move that modifier's parent drink
- [x] `Serve type/item` button is visually enabled at all times (never grayed out)
- [x] Tapping `Serve type/item` when global serve type is `Not Set` is a no-op (requires `Serve type/All` first)
- [x] Unit & integration tests in `tests/orderStateRefinements.test.tsx`
