import { CategoryGrid } from "@/components/section-1-categories/CategoryGrid";
import { ItemGrid } from "@/components/section-2-items/ItemGrid";
import { HOLIDAY_ITEMS } from "@/constants/menus/seasonal";
import { usePosStore } from "@/store/usePosStore";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("FY2027 Holiday Menu", () => {
  beforeEach(() => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "hot_esp",
        activeSubcategoryId: null,
        breadcrumb: [{ label: "HOT ESP", id: "hot_esp" }],
        activeSize: "T",
        multiplier: 1,
        orderItems: [],
        selectedOrderItemId: null,
        selectedLineId: null,
        currentServeType: "Not Set",
        isRefreshing: false,
        enableRefreshTransition: false,
      });
    });
  });

  it("renders FY27 HOLIDAY button in Section I CategoryGrid with authentic holiday green styling", () => {
    render(<CategoryGrid />);
    const holidayCategoryBtn = screen.getByRole("button", {
      name: "FY27 HOLIDAY",
    });
    expect(holidayCategoryBtn).toBeInTheDocument();
    expect(holidayCategoryBtn.className).toContain("pos-btn-holiday-green");
  });

  it("switches category and breadcrumb when FY27 HOLIDAY is clicked", () => {
    render(<CategoryGrid />);
    const holidayCategoryBtn = screen.getByRole("button", {
      name: "FY27 HOLIDAY",
    });
    fireEvent.click(holidayCategoryBtn);

    const state = usePosStore.getState();
    expect(state.activeCategoryId).toBe("fy27_holiday");
    expect(state.breadcrumb[0].label).toBe("FY27 HOLIDAY");
  });

  it("renders all 19 holiday drink items in ItemGrid with default Tall size prefix", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "fy27_holiday",
        breadcrumb: [{ label: "FY27 HOLIDAY", id: "fy27_holiday" }],
        activeSize: "T",
      });
    });

    render(<ItemGrid />);

    // Row 1 drinks
    expect(screen.getByRole("button", { name: "T Pep Mocha L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Pep Mocha L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Pep Mocha F" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Pep Mocha CF" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Jolly B.A L" })).toBeInTheDocument();

    // Row 2 drinks
    expect(screen.getByRole("button", { name: "T Iced Jolly B.A L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Jolly B.A F" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Jolly B.A CF" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Choco BT L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Choco BT L" })).toBeInTheDocument();

    // Row 3 drinks
    expect(screen.getByRole("button", { name: "T Toffee L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Toffee L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Toffee F" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Toffee CF" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Toffee NutCB" })).toBeInTheDocument();

    // Row 4 drinks
    expect(screen.getByRole("button", { name: "T Iced Toffee NCB" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Toffee CBNSS" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Pistachio L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced Pistachio L" })).toBeInTheDocument();
  });

  it("updates drink size prefix dynamically when activeSize changes to Grande", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "fy27_holiday",
        breadcrumb: [{ label: "FY27 HOLIDAY", id: "fy27_holiday" }],
        activeSize: "T",
      });
    });

    const { rerender } = render(<ItemGrid />);
    expect(screen.getByRole("button", { name: "T Pep Mocha L" })).toBeInTheDocument();

    act(() => {
      usePosStore.setState({ activeSize: "G" });
      rerender(<ItemGrid />);
    });

    expect(screen.getByRole("button", { name: "G Pep Mocha L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "G Pistachio L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "G Iced Toffee NutCB" })).toBeInTheDocument();
  });

  it("verifies all drinks have hasSizes true and define prices for all 4 sizes (S, T, G, V)", () => {
    expect(HOLIDAY_ITEMS.length).toBe(19);

    for (const item of HOLIDAY_ITEMS) {
      expect(item.hasSizes).toBe(true);
      expect(item.prices).toBeDefined();
      expect(item.prices?.S).toBeGreaterThan(0);
      expect(item.prices?.T).toBeGreaterThan(0);
      expect(item.prices?.G).toBeGreaterThan(0);
      expect(item.prices?.V).toBeGreaterThan(0);
    }
  });

  it("adds holiday item to order with correct pricing for selected size", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "fy27_holiday",
        breadcrumb: [{ label: "FY27 HOLIDAY", id: "fy27_holiday" }],
        activeSize: "V",
      });
    });

    render(<ItemGrid />);
    const ventiPepMocha = screen.getByRole("button", { name: "V Pep Mocha L" });
    fireEvent.click(ventiPepMocha);

    const state = usePosStore.getState();
    expect(state.orderItems.length).toBe(1);
    expect(state.orderItems[0].name).toBe("V Pep Mocha L");
    expect(state.orderItems[0].size).toBe("V");
    expect(state.orderItems[0].unitPrice).toBe(105000);
  });
});
