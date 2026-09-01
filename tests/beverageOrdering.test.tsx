import { CategoryGrid } from "@/components/section-1-categories/CategoryGrid";
import { ItemGrid } from "@/components/section-2-items/ItemGrid";
import { OrderDisplayShell } from "@/components/section-3-order/OrderDisplayShell";
import { FinalizeShell } from "@/components/section-4-finalize/FinalizeShell";
import { usePosStore } from "@/store/usePosStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Ticket 03: Beverage Ordering, Size Switching & Order Display", () => {
  beforeEach(() => {
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

  it("renders all 15 hot espresso drink buttons from the reference image", () => {
    render(<ItemGrid />);

    const expectedDrinks = [
      "T LATTE",
      "T CAPPUCCINO",
      "T MOCHA",
      "T CM",
      "T AMERICANO",
      "T ADL",
      "SOLO ESPRESSO",
      "DOPPIO ESPRESSO",
      "SOLO MACCHIATO",
      "DOPPIO MACCHIATO",
      "DOPPIO CON PANNA",
      "SOLO CON PANNA",
      "T FLAT WHITE",
      "T AHL",
      "T CCRL",
    ];

    for (const drinkName of expectedDrinks) {
      expect(screen.getByRole("button", { name: drinkName })).toBeInTheDocument();
    }
  });

  it("dynamically updates drink button labels when size buttons are tapped", () => {
    render(<ItemGrid />);

    // Default is Tall (T)
    expect(screen.getByRole("button", { name: "T LATTE" })).toBeInTheDocument();

    // Tap Grande (G)
    fireEvent.click(screen.getByRole("button", { name: "Grande" }));
    expect(usePosStore.getState().activeSize).toBe("G");
    expect(screen.getByRole("button", { name: "G LATTE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "G CAPPUCCINO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "G MOCHA" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "G CM" })).toBeInTheDocument();
    // Fixed size drinks remain unchanged
    expect(screen.getByRole("button", { name: "SOLO ESPRESSO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "DOPPIO ESPRESSO" })).toBeInTheDocument();

    // Tap Venti (V)
    fireEvent.click(screen.getByRole("button", { name: "Venti" }));
    expect(usePosStore.getState().activeSize).toBe("V");
    expect(screen.getByRole("button", { name: "V LATTE" })).toBeInTheDocument();

    // Tap Short (S)
    fireEvent.click(screen.getByRole("button", { name: "Short" }));
    expect(usePosStore.getState().activeSize).toBe("S");
    expect(screen.getByRole("button", { name: "S LATTE" })).toBeInTheDocument();
  });

  it("resets activeSize buffer back to Tall (T) when category changes", () => {
    render(
      <>
        <CategoryGrid />
        <ItemGrid />
      </>
    );

    // Change size to Venti
    fireEvent.click(screen.getByRole("button", { name: "Venti" }));
    expect(usePosStore.getState().activeSize).toBe("V");
    expect(screen.getByRole("button", { name: "V LATTE" })).toBeInTheDocument();

    // Switch to another category
    fireEvent.click(screen.getByRole("button", { name: "ICED ESP" }));
    expect(usePosStore.getState().activeCategoryId).toBe("iced_esp");
    expect(usePosStore.getState().activeSize).toBe("T");

    // Switch back to HOT ESP
    fireEvent.click(screen.getByRole("button", { name: "HOT ESP" }));
    expect(usePosStore.getState().activeCategoryId).toBe("hot_esp");
    expect(usePosStore.getState().activeSize).toBe("T");
    expect(screen.getByRole("button", { name: "T LATTE" })).toBeInTheDocument();
  });

  it("appends drink items to Section III with active size, quantity, and correct prices", () => {
    render(
      <>
        <ItemGrid />
        <OrderDisplayShell />
        <FinalizeShell />
      </>
    );

    // 1. Tap T LATTE (75,000)
    fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));

    const storeState = usePosStore.getState();
    expect(storeState.orderItems).toHaveLength(1);
    expect(storeState.orderItems[0]).toMatchObject({
      name: "T LATTE",
      size: "T",
      quantity: 1,
      unitPrice: 75000,
      totalPrice: 75000,
    });

    // Check Order Display
    expect(screen.getByTestId("summary-total-quantity")).toHaveTextContent("1");
    expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("75,000");
    // Tax Amount: 75,000 * 8 / 108 = 5,556
    expect(screen.getByTestId("summary-tax-amount")).toHaveTextContent("5,556");
    // Total Amount Display in Section IV
    expect(screen.getByTestId("total-amount-display")).toHaveTextContent("75,000");

    // 2. Select multiplier X2 and Grande, then tap G MOCHA (95,000 * 2 = 190,000)
    fireEvent.click(screen.getByRole("button", { name: "X 2" }));
    fireEvent.click(screen.getByRole("button", { name: "Grande" }));
    fireEvent.click(screen.getByRole("button", { name: "G MOCHA" }));

    const updatedState = usePosStore.getState();
    expect(updatedState.orderItems).toHaveLength(2);
    expect(updatedState.orderItems[1]).toMatchObject({
      name: "G MOCHA",
      size: "G",
      quantity: 2,
      unitPrice: 95000,
      totalPrice: 190000,
    });

    // Running totals: total qty = 3, total amount = 265,000, tax = 265000 * 8 / 108 = 19,630
    expect(screen.getByTestId("summary-total-quantity")).toHaveTextContent("3");
    expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("265,000");
    expect(screen.getByTestId("summary-tax-amount")).toHaveTextContent("19,630");
    expect(screen.getByTestId("total-amount-display")).toHaveTextContent("265,000");
  });

  it("supports order item line selection and highlights active item", () => {
    render(
      <>
        <ItemGrid />
        <OrderDisplayShell />
      </>
    );

    fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
    fireEvent.click(screen.getByRole("button", { name: "T CAPPUCCINO" }));

    const items = usePosStore.getState().orderItems;
    expect(items).toHaveLength(2);

    // Newly added item (T CAPPUCCINO) is selected by default
    expect(usePosStore.getState().selectedOrderItemId).toBe(items[1].id);

    const row1 = screen.getByTestId(`order-item-row-${items[0].id}`);
    const row2 = screen.getByTestId(`order-item-row-${items[1].id}`);

    expect(row2).toHaveClass("bg-[#a2c374]");

    // Click row 1 to select T LATTE
    fireEvent.click(row1);
    expect(usePosStore.getState().selectedOrderItemId).toBe(items[0].id);
    expect(row1).toHaveClass("bg-[#a2c374]");
  });

  it("clears order when CLEAR ALL is clicked", () => {
    render(
      <>
        <ItemGrid />
        <OrderDisplayShell />
        <FinalizeShell />
      </>
    );

    fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
    expect(usePosStore.getState().orderItems).toHaveLength(1);

    fireEvent.click(screen.getByRole("button", { name: "CLEAR ALL" }));
    expect(usePosStore.getState().orderItems).toHaveLength(0);
    expect(screen.getByTestId("summary-total-quantity")).toHaveTextContent("0");
    expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("0");
    expect(screen.getByTestId("total-amount-display")).toHaveTextContent("0");
  });
});
