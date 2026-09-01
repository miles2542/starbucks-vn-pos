# 04: Food Subcategories, Stock Badges, and Sold-Out Overlays

**What to build:** The `Food HN HY BNI` menu and subcategory drilldown into `BAKERY HN`, rendering item buttons with green inventory count badges and red sold-out diagonal crosses, appending food items to Section III order list upon tap.

**Blocked by:** 02: Category Navigation and Grid Engine

**Status:** ready-for-agent

- [ ] `Food HN HY BNI` renders 4 subcategory buttons (`BAKERY HN`, `DESSERTS HN`, `SANDWICHES HN`, `Snack Mixology HN`)
- [ ] Tapping `BAKERY HN` transitions Breadcrumb Banner to `BAKERY HN` and loads the bakery items matrix
- [ ] Bakery item buttons display top-right green stock badges (`4`, `2`, `5`, `3`)
- [ ] Sold-out bakery items display authentic red diagonal cross overlays
- [ ] In-stock bakery item taps append to Section III order list; sold-out item taps are blocked or handled accurately
- [ ] Unit & integration tests for subcategory transitions and stock badge rendering
