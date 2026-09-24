import { ItemGrid } from "@/components/section-2-items/ItemGrid";
import { usePosStore } from "@/store/usePosStore";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Ticket 10: Expanded Menu Ingestion", () => {
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
        currentServeType: "Not Set",
        isRefreshing: false,
        enableRefreshTransition: false,
      });
    });
  });

  it("renders iced espresso items with authentic grid positions", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "iced_esp",
        breadcrumb: [{ label: "ICED ESP", id: "iced_esp" }],
      });
    });

    render(<ItemGrid />);

    expect(screen.getByRole("button", { name: "T Iced LATTE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced AMERICANO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T BOISE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T CDE" })).toBeInTheDocument();
  });

  it("renders coffee and cream frappuccinos", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "coffee_frapp",
        breadcrumb: [{ label: "COFFEE FRAPP", id: "coffee_frapp" }],
      });
    });

    const { rerender } = render(<ItemGrid />);
    expect(screen.getByRole("button", { name: "T COFFEE FRAP" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T JAVA CHIP FRAP" })).toBeInTheDocument();

    act(() => {
      usePosStore.setState({
        activeCategoryId: "cream_frapp",
        breadcrumb: [{ label: "CREAM FRAPP", id: "cream_frapp" }],
      });
      rerender(<ItemGrid />);
    });
    expect(screen.getByRole("button", { name: "T VANILLA CREAM" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T GREEN TEA CREAM" })).toBeInTheDocument();
  });

  it("renders blended juice items", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "blended_juice",
        breadcrumb: [{ label: "BLENDED JUICE", id: "blended_juice" }],
      });
    });

    render(<ItemGrid />);
    expect(screen.getByRole("button", { name: "T MJ" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T RJ" })).toBeInTheDocument();
  });

  it("navigates through tea subcategories dynamically", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "tea",
        breadcrumb: [{ label: "TEA", id: "tea" }],
      });
    });

    render(<ItemGrid />);

    // Click on DS BLACK TEA subcategory
    const dsBlackBtn = screen.getByRole("button", { name: "DS BLACK TEA" });
    expect(dsBlackBtn).toBeInTheDocument();
    fireEvent.click(dsBlackBtn);

    expect(usePosStore.getState().activeSubcategoryId).toBe("tea_ds_black_tea");
    expect(screen.getByRole("button", { name: "T BT" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T BTL" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Iced BLACK Tea" })).toBeInTheDocument();
  });

  it("navigates through other H/I subcategories dynamically", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "other_hi",
        breadcrumb: [{ label: "OTHER H/I", id: "other_hi" }],
      });
    });

    render(<ItemGrid />);

    // Click on SIGNATURE subcategory
    fireEvent.click(screen.getByRole("button", { name: "SIGNATURE" }));
    expect(usePosStore.getState().activeSubcategoryId).toBe("other_hi_signature");
    expect(screen.getByRole("button", { name: "T HOT CHOCOLATE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T ICED CHOCOLATE" })).toBeInTheDocument();
  });

  it("renders food subcategories with stock badges and sold-out states", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "food_hn_hy_bni",
        breadcrumb: [{ label: "Food HN HY BNI", id: "food_hn_hy_bni" }],
      });
    });

    render(<ItemGrid />);

    // Click on BAKERY HN
    fireEvent.click(screen.getByRole("button", { name: "BAKERY HN" }));
    expect(usePosStore.getState().activeSubcategoryId).toBe("food_bakery_hn");

    const butterCroissant = screen.getByRole("button", { name: /Butter Croissant FZ/i });
    expect(butterCroissant).toBeInTheDocument();
    expect(butterCroissant.textContent).toContain("6");

    const appleStrudel = screen.getByRole("button", { name: /Apple Strudel/i });
    expect(appleStrudel).toBeInTheDocument();
    expect(appleStrudel.textContent).toContain("5");
  });

  it("renders seasonal items in FY26-27 AUTUMN with size prefixes", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "autumn_26_27",
        breadcrumb: [{ label: "FY26-27 AUTUMN", id: "autumn_26_27" }],
        activeSize: "T",
      });
    });

    const { rerender } = render(<ItemGrid />);
    expect(screen.getByRole("button", { name: /T Pumpkin Latte/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T Black Cat Frap" })).toBeInTheDocument();

    act(() => {
      usePosStore.setState({ activeSize: "G" });
      rerender(<ItemGrid />);
    });
    expect(screen.getByRole("button", { name: "G Black Cat Frap" })).toBeInTheDocument();
  });

  it("renders packaging, discounts and retail items correctly", () => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "pk_hn",
        breadcrumb: [{ label: "PK HN", id: "pk_hn" }],
      });
    });

    const { rerender } = render(<ItemGrid />);
    expect(screen.getByRole("button", { name: "Oatmeal Cookie" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Box 4PCS Mooncake" })).toBeInTheDocument();

    act(() => {
      usePosStore.setState({
        activeCategoryId: "packaging",
        breadcrumb: [{ label: "PACKAGING", id: "packaging" }],
      });
      rerender(<ItemGrid />);
    });
    expect(screen.getByRole("button", { name: "GIFT SET SINGLE BAG" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Paper Bag" })).toBeInTheDocument();

    act(() => {
      usePosStore.setState({
        activeCategoryId: "discount",
        breadcrumb: [{ label: "DISCOUNT", id: "discount" }],
      });
      rerender(<ItemGrid />);
    });
    expect(screen.getByRole("button", { name: "Personal Cup" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Parking 10k" })).toBeInTheDocument();
  });
});
