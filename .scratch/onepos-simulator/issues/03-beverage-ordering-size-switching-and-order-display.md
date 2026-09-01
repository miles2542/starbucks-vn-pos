# 03: Beverage Ordering, Size Switching, and Order Display

**What to build:** The complete `HOT ESP` menu containing all 15 hot espresso drink buttons, Column 7 size modifier buttons (`Short`, `Tall`, `Grande`, `Venti`) dynamically updating drink button labels, beverage taps adding line items to Section III with active line highlighting (`#a2c374`), and running total/tax arithmetic.

**Blocked by:** 02: Category Navigation and Grid Engine

**Status:** ready-for-agent

- [ ] `HOT ESP` 5x6 drink matrix populated with exact buttons from reference photos (`T LATTE`, `T CAPPUCCINO`, `T MOCHA`, `T CM`, `T AMERICANO`, `T ADL`, `SOLO ESPRESSO`, `DOPPIO ESPRESSO`, `SOLO MACCHIATO`, `DOPPIO MACCHIATO`, `DOPPIO CON PANNA`, `SOLO CON PANNA`, `T FLAT WHITE`, `T AHL`, `T CCRL`)
- [ ] Size buttons on Column 7 dynamically update drink button labels with corresponding size prefix (`S`, `T`, `G`, `V`)
- [ ] Tapping a drink appends a line item to Section III with active size and price
- [ ] Switching Section I categories resets the size buffer back to default `Tall` (`T`)
- [ ] Section III displays purple order header, item lines, selection highlight (`#a2c374`), and running summary (Total Quantity, Tax Amount, Total Amount)
- [ ] Unit & integration tests for beverage addition, size switching, and totals calculation
