# 06: Order Finalization, Serve Type Modals, and Line Operations

**What to build:** Complete Section IV controls and modal dialogues: `Serve type/All` modal (`For Here`, `To Go`, `BYO`, `B2BTS`), per-item serve type overrides with sequence suffixes (`2B`), `Change Size` modal, line item reordering (Up/Down/Top/Bottom), `Void` (individual modifier or entire drink), and `CLEAR ALL`.

**Blocked by:** 03: Beverage Ordering, Size Switching, and Order Display, 05: Sticky Modifier Matrix and Sub-Page Navigation

**Status:** ready-for-agent

- [ ] `Serve type/All` modal opens with 4 options, sets global order serve type, updates top banner and footer
- [ ] `Serve type/item` disabled when global is `Not Set`; when set, updates selected drink and displays suffix (`2B`) if differing from global
- [ ] `Change Size` modal allows size reassignment on the selected beverage
- [ ] Line item reorder buttons (Up, Down, Top, Bottom) reposition selected lines in Section III
- [ ] `Void` button deletes selected modifier line or selected beverage with all its modifiers
- [ ] `CLEAR ALL` clears entire order and resets state
- [ ] Unit & integration tests for all Section IV actions, modals, and line mutation logic
