# 12: Complete Tea Subcategories and 100% Exact Capitalization Audit

**What to build:** Complete missing tea subcategories (`TEA LATTE`, `Zen Oolong Tea`, `CHAMOMILE`) matching their exact reference photos, fix routing IDs in `MENU_ITEMS_BY_CATEGORY`, and audit capitalization across all menus against reference photos to ensure 100% authentic casing.

**Blocked by:** 10: Expanded Menu Ingestion

**Status:** closed

- [x] Complete `TEA LATTE` subcategory items matching `TEA - TEA LATTE.jpg` (`T CH`, `T Iced CH`, `T EARL GREY LATTE`, `T Iced BLACK T LATTE`, `T ENG BREAKFAST L`, `T PMTL`, `T Iced PMTL`, `T PMEF`, `T Iced PMEF`, `T PM Coco water`)
- [x] Implement `Zen Oolong Tea` subcategory items matching `TEA - Zen Oolong Tea.jpg` (`T Zen Oolong`, `T Iced Zen Oolong`)
- [x] Implement `CHAMOMILE` subcategory items matching `TEA - CHAMOMILE.jpg` (`T CHAMOMILE`, `T Iced CHAMOMILE`)
- [x] Ensure `MENU_ITEMS_BY_CATEGORY` accurately maps `tea_tea_latte` / `tea_latte`, `tea_zen_oolong_tea`, `tea_chamomile`
- [x] Audit and normalize item names, prefixes, and casing across all category files to mirror the physical screens exactly (e.g. `T Iced BLACK Tea`, `T Iced BLACK T LATTE`, `T PM Coco water`, `DOPPIO CON PANNA`)
- [x] Unit & integration tests in `tests/teaSubcategoriesAndCasing.test.tsx`
