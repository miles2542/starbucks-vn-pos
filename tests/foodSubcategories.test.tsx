import { BreadcrumbBanner } from "@/components/layout/BreadcrumbBanner";
import { ItemGrid } from "@/components/section-2-items/ItemGrid";
import { OrderDisplayShell } from "@/components/section-3-order/OrderDisplayShell";
import { usePosStore } from "@/store/usePosStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Ticket 04: Food Subcategories, Stock Badges & Sold-Out Overlays", () => {
  beforeEach(() => {
    usePosStore.setState({
      activeCategoryId: "food_hn_hy_bni",
      activeSubcategoryId: null,
      breadcrumb: [{ label: "Food HN HY BNI", id: "food_hn_hy_bni" }],
      activeSize: "T",
      multiplier: 1,
      orderItems: [],
      selectedOrderItemId: null,
      isRefreshing: false,
      enableRefreshTransition: false,
    });
  });

  it("renders 4 food subcategory buttons in Food HN HY BNI", () => {
    render(<ItemGrid />);

    expect(screen.getByRole("button", { name: "BAKERY HN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "DESSERTS HN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SANDWICHES HN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Snack Mixology HN" })).toBeInTheDocument();
  });

  it("transitions breadcrumb and loads BAKERY HN items when BAKERY HN is clicked", () => {
    render(
      <>
        <BreadcrumbBanner />
        <ItemGrid />
      </>
    );

    // Initial breadcrumb
    expect(screen.getByTestId("breadcrumb-banner")).toHaveTextContent("Food HN HY BNI");

    // Click BAKERY HN subcategory button
    fireEvent.click(screen.getByRole("button", { name: "BAKERY HN" }));

    // Breadcrumb transitions to include subcategory
    expect(screen.getByTestId("breadcrumb-banner")).toHaveTextContent("Food HN HY BNI > BAKERY HN");

    // In-stock bakery items are visible
    expect(screen.getByRole("button", { name: /Butter Croissant FZ/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Chocolate Croissant/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Mini Donuts/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Banana Chocolate Muf/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Skinny Blueberry Muf/i })).toBeInTheDocument();

    // Sold-out bakery items are visible
    expect(screen.getByRole("button", { name: /Mon Chocolate Donut/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Apple Strudel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Pistachio Croissant/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Banana Loaf/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Apple Turnover/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Matcha Croissant/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Almond Croissant VN/i })).toBeInTheDocument();
  });

  it("displays green stock count badges on in-stock items", () => {
    usePosStore.setState({
      activeCategoryId: "food_hn_hy_bni",
      activeSubcategoryId: "bakery_hn",
      breadcrumb: [
        { label: "Food HN HY BNI", id: "food_hn_hy_bni" },
        { label: "BAKERY HN", id: "bakery_hn" },
      ],
    });

    render(<ItemGrid />);

    const stockBadges = screen.getAllByTestId("stock-badge");
    expect(stockBadges.length).toBe(5);

    const badgeTexts = stockBadges.map((b) => b.textContent);
    expect(badgeTexts).toContain("4"); // Butter Croissant FZ
    expect(badgeTexts).toContain("2"); // Chocolate Croissant
    expect(badgeTexts).toContain("5"); // Mini Donuts & Banana Chocolate Muf
    expect(badgeTexts).toContain("3"); // Skinny Blueberry Muf
  });

  it("displays authentic red diagonal crosses on sold-out items", () => {
    usePosStore.setState({
      activeCategoryId: "food_hn_hy_bni",
      activeSubcategoryId: "bakery_hn",
      breadcrumb: [
        { label: "Food HN HY BNI", id: "food_hn_hy_bni" },
        { label: "BAKERY HN", id: "bakery_hn" },
      ],
    });

    render(<ItemGrid />);

    const soldOutCrosses = screen.getAllByTestId("sold-out-cross");
    expect(soldOutCrosses.length).toBe(7);
  });

  it("appends in-stock food items to Section III and ignores clicks on sold-out items", () => {
    usePosStore.setState({
      activeCategoryId: "food_hn_hy_bni",
      activeSubcategoryId: "bakery_hn",
      breadcrumb: [
        { label: "Food HN HY BNI", id: "food_hn_hy_bni" },
        { label: "BAKERY HN", id: "bakery_hn" },
      ],
    });

    render(
      <>
        <ItemGrid />
        <OrderDisplayShell />
      </>
    );

    // Click sold out item (Mon Chocolate Donut) - should NOT be added
    const soldOutBtn = screen.getByRole("button", { name: /Mon Chocolate Donut/i });
    fireEvent.click(soldOutBtn);
    expect(usePosStore.getState().orderItems).toHaveLength(0);

    // Click in-stock item (Butter Croissant FZ - 45,000)
    const inStockBtn = screen.getByRole("button", { name: /Butter Croissant FZ/i });
    fireEvent.click(inStockBtn);

    const store = usePosStore.getState();
    expect(store.orderItems).toHaveLength(1);
    expect(store.orderItems[0]).toMatchObject({
      name: "Butter Croissant FZ",
      quantity: 1,
      unitPrice: 45000,
      totalPrice: 45000,
    });

    expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("45,000");
  });
});
