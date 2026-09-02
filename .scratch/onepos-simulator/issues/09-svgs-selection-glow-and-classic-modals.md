# 09: Pixel-Accurate SVGs, Selection Glow Removal, and Classic Dialog Reskin

**What to build:** Replace basic web icons with custom inline SVGs to match the physical POS reference photos (cyan/yellow reorder arrows, blue nav arrow, header/footer status icons); eliminate artificial selected-state outlines/glows on Section I & II grid buttons; reskin modals (`ServeTypeModal`, `ChangeSizeModal`, `QtyModal`) into authentic classic OnePOS dialogs; and minimize the floating viewport control to a compact, low-opacity resting pill.

**Blocked by:** 08: QTY Keypad Modal and Expanded Refresh Transition Engine

**Status:** done

- [x] 4 Section IV reorder arrow buttons rendered with custom inline SVGs (bright cyan background, thick golden-yellow arrows: Up, Up-double, Down-double, Down)
- [x] Section IV bottom-right action button rendered with custom deep blue right-pointing arrow SVG
- [x] Header bar icons (store house, Wi-Fi/network signal, register battery/drawer) and footer cashier icon match reference photos
- [x] Remove active selection outline/glow from Section I categories and Section II modifier buttons
- [x] Reskin modals to authentic legacy style: white container, black text, blue rectangular highlight bar for selected row, beveled OK/Cancel buttons
- [x] Minimized floating viewport control: defaults to a compact pill icon with 25% resting opacity, expanding/restoring opacity on hover
- [x] Unit & visual regression tests in `tests/svgsAndModalReskin.test.tsx`
