import { BreadcrumbBanner } from "@/components/layout/BreadcrumbBanner";
import { ItemGrid } from "@/components/section-2-items/ItemGrid";
import { usePosStore } from "@/store/usePosStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Item Grid 7x7 Engine", () => {
  beforeEach(() => {
    usePosStore.setState({
      activeCategoryId: "hot_esp",
      breadcrumb: [{ label: "HOT ESP", id: "hot_esp" }],
      multiplier: 1,
      isRefreshing: false,
    });
  });

  it("renders Column 1 modifier and multiplier buttons", () => {
    render(<ItemGrid />);

    expect(screen.getByRole("button", { name: "Modifier" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X 3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X 4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "QTY" })).toBeInTheDocument();
  });

  it("updates active multiplier and reflects on breadcrumb badge", () => {
    render(
      <>
        <BreadcrumbBanner />
        <ItemGrid />
      </>
    );

    const x2Btn = screen.getByRole("button", { name: "X 2" });
    fireEvent.click(x2Btn);

    expect(usePosStore.getState().multiplier).toBe(2);
    expect(screen.getByTestId("multiplier-badge")).toHaveTextContent("X2");

    const x4Btn = screen.getByRole("button", { name: "X 4" });
    fireEvent.click(x4Btn);

    expect(usePosStore.getState().multiplier).toBe(4);
    expect(screen.getByTestId("multiplier-badge")).toHaveTextContent("X4");
  });

  it("renders Column 7 size buttons", () => {
    render(<ItemGrid />);

    expect(screen.getByRole("button", { name: "Short" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tall" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Grande" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Venti" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Change Size" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sets order" })).toBeInTheDocument();
  });

  it("renders Row 7 tender buttons", () => {
    render(<ItemGrid />);

    expect(screen.getByRole("button", { name: "SBUX CARD" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "FOODY/AIRPAY" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "GRAB" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PAYOO PROMO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PAYOO QR" })).toBeInTheDocument();
  });

  it("renders center 5x6 matrix items for HOT ESP", () => {
    render(<ItemGrid />);

    expect(screen.getByRole("button", { name: "T LATTE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T CAPPUCCINO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T MOCHA" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SOLO ESPRESSO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "DOPPIO ESPRESSO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "T FLAT WHITE" })).toBeInTheDocument();
  });

  it("renders food subcategories when switched to Food HN HY BNI", () => {
    usePosStore.setState({
      activeCategoryId: "food_hn_hy_bni",
      breadcrumb: [{ label: "Food HN HY BNI", id: "food_hn_hy_bni" }],
    });

    render(<ItemGrid />);

    expect(screen.getByRole("button", { name: "BAKERY HN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "DESSERTS HN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SANDWICHES HN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Snack Mixology HN" })).toBeInTheDocument();
  });
});
