import { BreadcrumbBanner } from "@/components/layout/BreadcrumbBanner";
import { CategoryGrid } from "@/components/section-1-categories/CategoryGrid";
import { usePosStore } from "@/store/usePosStore";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Category Grid & Navigation", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    usePosStore.setState({
      activeCategoryId: "hot_esp",
      breadcrumb: [{ label: "HOT ESP", id: "hot_esp" }],
      enableRefreshTransition: true,
      isRefreshing: false,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders all authentic categories in the 7x3 grid", () => {
    render(<CategoryGrid />);

    expect(screen.getByRole("button", { name: "HOT ESP" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ICED ESP" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "COFFEE FRAPP" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CREAM FRAPP" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "BLENDED JUICE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "BREWED" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "TEA" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "OTHER H/I" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Food HN HY BNI" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PK HN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "DISCOUNT" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SBUX CARD" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "DELIVERY ITEM" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SBApp Merchandise" })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "PACKAGING" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SUMMER 3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "FY26-27 AUTUMN" })).toBeInTheDocument();
  });

  it("highlights the currently active category", () => {
    render(<CategoryGrid />);

    const hotEspBtn = screen.getByRole("button", { name: "HOT ESP" });
    expect(hotEspBtn.className).toContain("pos-btn-category-active");
  });

  it("switches category, triggers refresh animation, and updates breadcrumb banner", () => {
    render(
      <>
        <CategoryGrid />
        <BreadcrumbBanner />
      </>,
    );

    const foodBtn = screen.getByRole("button", { name: "Food HN HY BNI" });
    fireEvent.click(foodBtn);

    // Immediately after click, isRefreshing is true
    expect(usePosStore.getState().isRefreshing).toBe(true);
    expect(usePosStore.getState().activeCategoryId).toBe("food_hn_hy_bni");
    expect(screen.getByText("Food HN HY BNI", { selector: ".truncate" })).toBeInTheDocument();

    // Fast-forward 100ms
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(usePosStore.getState().isRefreshing).toBe(false);
  });
});
