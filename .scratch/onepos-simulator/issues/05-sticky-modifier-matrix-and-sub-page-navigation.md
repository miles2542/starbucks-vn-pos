# 05: Sticky Modifier Matrix and Sub-Page Navigation

**What to build:** The sticky `Modifier` menu with modifier category buttons (`Syrup`, `Sauce/Topping`, `Milk`, `Shot`, `Alcohol`, `Others_Modifier`, `LESS Ice`, `NO Ice`), multi-page navigation (`◀` / `▶`), and direct attachment of indented modifier sub-lines (`> Modifier Name`) to the currently highlighted item in Section III.

**Blocked by:** 03: Beverage Ordering, Size Switching, and Order Display

**Status:** done

- [x] Tapping `Modifier` in Col 1 opens the modifier root menu in Section II
- [x] Tapping `Sauce/Topping` navigates to topping options with multi-page navigation controls
- [x] Tapping any modifier button appends an indented sub-line (`> Modifier Name`) under the active line item in Section III
- [x] Section II remains sticky on the modifier page for continuous multiple modifier taps
- [x] Modifier lines display their additional cost and update Section III order totals
- [x] Unit & integration tests for modifier hierarchy, multi-page routing, and indented sub-line appending
