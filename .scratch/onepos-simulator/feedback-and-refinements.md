# Refinement Notes & Aesthetic Overhaul (Post-User Testing)

Status: needs-triage

## Recorded Feedback Items

1. **Aesthetic Overhaul & Authentic Old-School POS Styling**:
   - Change colors of all UI components to strictly match physical screen photos.
   - Apply a global retro/POS CRT/matte LCD touch-panel filter or shader (less modern flat web look, more authentic hardware register look).
   - Replace basic web icons with custom pixel-accurate inline SVGs matching the photos:
     - 4 reorder arrow buttons in Section IV: bright cyan background, thick golden-yellow arrows (Up single, Up double, Down double, Down single).
     - Section IV bottom-right action button: big deep blue arrow pointing right.
     - Header bar store icon, network signal, and battery/cash drawer.
     - Footer cashier user icon.
   - Remove active selection highlight / outline / color change on category and modifier buttons (OnePOS has no persistent selected-state outline on tapped grid buttons).

2. **Re-render Refresh Transition Timing & Scope**:
   - Increase cell clear-and-render transition delay from 60ms to 100ms.
   - Expand trigger scope: apply the 100ms cell refresh whenever changing size modifier (`Short`, `Tall`, etc.), multiplier, or anything triggering a grid repopulation.

3. **Section IV Arrow Buttons Behavior (Line Reordering)**:
   - The 4 arrow buttons to the left of the amount display reorder parent drinks (move selected parent drink up, down, to top, or to bottom within the order list), rather than merely moving line selection cursor.
   - Child modifiers travel attached to their parent drink during reordering.

4. **Order Number Auto-Increment**:
   - Whenever an order is completely emptied (via `CLEAR ALL` or voiding the final remaining item), auto-increment the `Order No` sequence by 1 (e.g., `0100002787` -> `0100002788`).
   - Persisted locally in localStorage / store state (no remote backend needed).

5. **Serve Type / Item Gating**:
   - `Serve type/item` button must never appear visually disabled/grayed out.
   - If tapped while global serve type is `Not Set`, it does nothing (no popup, no change).
   - Workflow rule: Cashier must select `Serve type/All` first. Once global serve type is chosen, `Serve type/item` can be tapped to customize individual drink overrides.

6. **Button Selected-State Cleanup**:
   - Eliminate persistent active/selected state color shifts on Section I categories and Section II modifier cells to mirror physical OnePOS.

7. **Classic Modal Styling (Serve Type & Change Size)**:
   - Reskin modals to authentic legacy POS style: classic dialog box, white background, black bold typography, blue rectangular row highlight on the active choice, classic beveled OK and Cancel buttons.
   - Serve type options formatted as a single-column vertical list:
     1. For Here
     2. To Go
     3. BYO
     4. B2BTS

8. **Minimal Floating Viewport & Debug Widget**:
   - Default state must be minimized.
   - When minimized: compact pill with icon only (no text), low resting opacity (e.g. 20-30%).
   - Expands or increases opacity to 100% on mouse hover / tap to consume minimal screen space.

9. **Photo Library Renaming Delegation**:
   - Inspect unorganized photos in `assets/Unorganized pictures/` with vision subagent.
   - Identify Breadcrumb Banner text matching top-level Section I categories and subcategories.
   - Rename only when 100% certain; leave ambiguous images untouched.

10. **QTY Modifier Modal / Numeric Input Flow**:
    - Col 1 `QTY` button functions like `Change Size`: if a line item (drink or modifier) is highlighted, tapping `QTY` opens a quantity input modal to change its quantity to any entered number.
    - If nothing is selected in Section III, tapping `QTY` does nothing.
