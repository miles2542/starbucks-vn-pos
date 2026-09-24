import { ItemGrid } from "@/components/section-2-items/ItemGrid";
import { MENU_ITEMS_BY_CATEGORY } from "@/constants/menuItems";
import {
  TEA_CHAMOMILE_ITEMS,
  TEA_LATTE_ITEMS,
  TEA_ZEN_OOLONG_ITEMS,
} from "@/constants/menus/teaSubcategories";
import { HOT_ESP_ITEMS } from "@/constants/menus/espresso";
import { usePosStore } from "@/store/usePosStore";
import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Ticket 12: Complete Tea Subcategories and 100% Exact Capitalization Audit", () => {
  beforeEach(() => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "tea",
        activeSubcategoryId: null,
        breadcrumb: [{ label: "TEA", id: "tea" }],
        activeSize: "T",
        multiplier: 1,
        orderItems: [],
        selectedOrderItemId: null,
        currentServeType: "Not Set",
        isRefreshing: false,
        enableRefreshTransition: false,
      });
    });
  });

  it("completes TEA LATTE subcategory items matching reference photo exactly", () => {
    expect(TEA_LATTE_ITEMS).toHaveLength(12);
    const expectedNames = [
      "T CH",
      "T Iced CH",
      "T EARL GREY LATTE",
      "T Iced BLACK T LATTE",
      "T ENG BREAKFAST L",
      "T PMTL",
      "T Iced PMTL",
      "T PMEF",
      "T Iced PMEF",
      "T PM Coco water",
      "T HojichaLatte",
      "T Iced HojichaLatte",
    ];
    expectedNames.forEach((name) => {
      expect(TEA_LATTE_ITEMS.some((item) => item.name === name)).toBe(true);
    });

    const row1 = TEA_LATTE_ITEMS.filter((i) => i.row === 1).map((i) => i.name);
    expect(row1).toEqual([
      "T CH",
      "T Iced CH",
      "T EARL GREY LATTE",
      "T Iced BLACK T LATTE",
      "T ENG BREAKFAST L",
    ]);

    const row2 = TEA_LATTE_ITEMS.filter((i) => i.row === 2).map((i) => i.name);
    expect(row2).toEqual([
      "T PMTL",
      "T Iced PMTL",
      "T PMEF",
      "T Iced PMEF",
      "T PM Coco water",
    ]);

    const row3 = TEA_LATTE_ITEMS.filter((i) => i.row === 3).map((i) => i.name);
    expect(row3).toEqual([
      "T HojichaLatte",
      "T Iced HojichaLatte",
    ]);
  });

  it("implements Zen Oolong Tea subcategory items matching reference photo", () => {
    expect(TEA_ZEN_OOLONG_ITEMS).toHaveLength(2);
    expect(TEA_ZEN_OOLONG_ITEMS[0].name).toBe("T Zen Oolong");
    expect(TEA_ZEN_OOLONG_ITEMS[0].row).toBe(1);
    expect(TEA_ZEN_OOLONG_ITEMS[0].col).toBe(1);

    expect(TEA_ZEN_OOLONG_ITEMS[1].name).toBe("T Iced Zen Oolong");
    expect(TEA_ZEN_OOLONG_ITEMS[1].row).toBe(1);
    expect(TEA_ZEN_OOLONG_ITEMS[1].col).toBe(2);
  });

  it("implements CHAMOMILE subcategory items matching reference photo", () => {
    expect(TEA_CHAMOMILE_ITEMS).toHaveLength(2);
    expect(TEA_CHAMOMILE_ITEMS[0].name).toBe("T CHAMOMILE");
    expect(TEA_CHAMOMILE_ITEMS[0].row).toBe(1);
    expect(TEA_CHAMOMILE_ITEMS[0].col).toBe(1);

    expect(TEA_CHAMOMILE_ITEMS[1].name).toBe("T Iced CHAMOMILE");
    expect(TEA_CHAMOMILE_ITEMS[1].row).toBe(1);
    expect(TEA_CHAMOMILE_ITEMS[1].col).toBe(2);
  });

  it("correctly maps tea subcategory aliases in MENU_ITEMS_BY_CATEGORY", () => {
    expect(MENU_ITEMS_BY_CATEGORY.tea_tea_latte).toBe(TEA_LATTE_ITEMS);
    expect(MENU_ITEMS_BY_CATEGORY.tea_latte).toBe(TEA_LATTE_ITEMS);

    expect(MENU_ITEMS_BY_CATEGORY.tea_zen_oolong_tea).toBe(TEA_ZEN_OOLONG_ITEMS);
    expect(MENU_ITEMS_BY_CATEGORY.zen_oolong_tea).toBe(TEA_ZEN_OOLONG_ITEMS);

    expect(MENU_ITEMS_BY_CATEGORY.tea_chamomile).toBe(TEA_CHAMOMILE_ITEMS);
    expect(MENU_ITEMS_BY_CATEGORY.chamomile).toBe(TEA_CHAMOMILE_ITEMS);
  });

  it("renders Zen Oolong Tea and CHAMOMILE items in ItemGrid", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "tea",
        activeSubcategoryId: "tea_zen_oolong_tea",
        breadcrumb: [
          { label: "TEA", id: "tea" },
          { label: "Zen Oolong Tea", id: "tea_zen_oolong_tea" },
        ],
      });
    });

    const { rerender } = render(<ItemGrid />);
    expect(screen.getByRole("button", { name: "T Zen Oolong" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Zen Oolong" })).toBeInTheDocument();

    act(() => {
      usePosStore.setState({
        activeSubcategoryId: "tea_chamomile",
        breadcrumb: [
          { label: "TEA", id: "tea" },
          { label: "CHAMOMILE", id: "tea_chamomile" },
        ],
      });
      rerender(<ItemGrid />);
    });
    expect(screen.getByRole("button", { name: "T CHAMOMILE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced CHAMOMILE" })).toBeInTheDocument();
  });

  it("verifies exact capitalization audit (DOPPIO CON PANNA, T Iced BLACK Tea, T PM Coco water)", () => {
    const doppio = HOT_ESP_ITEMS.find((i) => i.id === "doppio_con_pana");
    expect(doppio?.name).toBe("DOPPIO CON PANNA");
    expect(doppio?.baseName).toBe("DOPPIO CON PANNA");

    const dsBlackTea = MENU_ITEMS_BY_CATEGORY.tea_ds_black_tea;
    const icedBlackTea = dsBlackTea.find((i) => i.id === "t_iced_black_tea");
    expect(icedBlackTea?.name).toBe("T Iced BLACK Tea");

    const icedBlackTLatte = TEA_LATTE_ITEMS.find((i) => i.id === "t_iced_black_t_latte");
    expect(icedBlackTLatte?.name).toBe("T Iced BLACK T LATTE");

    const cocoWater = TEA_LATTE_ITEMS.find((i) => i.id === "t_pm_coco_water");
    expect(cocoWater?.name).toBe("T PM Coco water");
  });
});
