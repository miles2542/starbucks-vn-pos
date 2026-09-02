# 10: Expanded Menu Ingestion from Renamed Reference Photos

**What to build:** Ingest the newly organized category and subcategory photos from `assets/Unorganized pictures/` into the menu database: populate items and routing for `ICED ESP`, `COFFEE FRAPP`, `CREAM FRAPP`, `BLENDED JUICE`, `BREWED`, `TEA` (with subcategories `DS BLACK TEA`, `DS GREEN TEA`, `TEA LATTE`, etc.), `OTHER HI` (with subcategories `SIGNATURE`, `MILK`, `Refreshers`), and food submenus (`DESSERTS HN`, `SANDWICHES HN`).

**Blocked by:** 08: QTY Keypad Modal and Expanded Refresh Transition Engine

**Status:** done

- [x] Ingest `ICED ESP.jpg` items with size prefix and pricing into `MENU_ITEMS_BY_CATEGORY`
- [x] Ingest `COFFEE FRAPP.jpg`, `CREAM FRAPP.jpg`, `BLENDED JUICE.jpg`, `BREWED.jpg` into menu definitions
- [x] Ingest `TEA.jpg` and its 10 subcategories (`DS BLACK TEA`, `DS GREEN TEA`, `TEA LATTE`, `ENG BREAKFAST`, `EARL GREY`, etc.) with subcategory drilldown
- [x] Ingest `OTHER HI.jpg` and its submenus (`SIGNATURE`, `MILK`, `Refreshers`)
- [x] Ingest `Food HN HY BNI` subcategories `DESSERTS HN` and `SANDWICHES HN` with stock counts and sold-out flags
- [x] Wire dynamic grid navigation so tapping any category/subcategory in Section I & II loads the authentic items
- [x] Unit & integration tests in `tests/expandedMenus.test.tsx`
