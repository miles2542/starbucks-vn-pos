import App from "@/App";
import { usePosStore } from "@/store/usePosStore";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Ticket 05: Sticky Modifier Matrix and Sub-Page Navigation", () => {
  beforeEach(() => {
    usePosStore.setState({
      activeCategoryId: "hot_esp",
      activeSubcategoryId: null,
      isModifierMode: false,
      activeModifierPage: null,
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

  it("switches Section II to modifier root menu when Modifier in Col 1 is tapped", () => {
    render(<App />);

    // Click Modifier button in Col 1
    const modifierColBtn = screen.getByRole("button", { name: "Modifier" });
    fireEvent.click(modifierColBtn);

    // Verify root modifier buttons appear
    expect(screen.getByRole("button", { name: "Syrup" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sauce/Topping" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Milk" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Shot" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Alcohol" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Others_Modifier" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "LESS Ice" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "NO Ice" })).toBeInTheDocument();

    // Verify breadcrumb includes Modifier
    expect(screen.getByTestId("breadcrumb-banner")).toHaveTextContent("Modifier");
  });

  it("navigates to Sauce/Topping Page 1 and navigates between Page 1 and Page 2 with arrows", () => {
    render(<App />);

    // Open Modifier menu and tap Sauce/Topping
    fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
    fireEvent.click(screen.getByRole("button", { name: "Sauce/Topping" }));

    // Page 1 items should be present
    expect(screen.getByRole("button", { name: "NO Mocha Sauce" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX Mocha Sauce 10K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX Pure Matcha 7K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "NO Whipped Cream" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX Chai Tea" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX Caramel Sauce 10K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX HRG 20K" })).toBeInTheDocument();

    // Forward navigation button ▶ to Page 2
    const forwardBtn = screen.getByRole("button", { name: "▶" });
    expect(forwardBtn).toBeInTheDocument();
    fireEvent.click(forwardBtn);

    // Page 2 items should now be present
    expect(screen.getByRole("button", { name: "EX Pomegranate" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX Pomegranate20K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX Strawberry" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX Strawberry 10K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX CF Jelly 20K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX Tea Pearl 10K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX White Pearl 10K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX EGJ 15K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX Blood Orange 20K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX SC Cold Foam 10K" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EX PM Cream Foam 10K" })).toBeInTheDocument();

    // Backward navigation button ◀ to Page 1
    const backBtn = screen.getByRole("button", { name: "◀" });
    expect(backBtn).toBeInTheDocument();
    fireEvent.click(backBtn);

    // Should be back on Page 1
    expect(screen.getByRole("button", { name: "NO Mocha Sauce" })).toBeInTheDocument();
  });

  it("appends indented modifier sub-lines under active beverage with sticky navigation", () => {
    render(<App />);

    // 1. Order a T LATTE (75,000 VND)
    fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
    expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("75,000");

    // 2. Open Modifier > Sauce/Topping > Page 2
    fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
    fireEvent.click(screen.getByRole("button", { name: "Sauce/Topping" }));
    fireEvent.click(screen.getByRole("button", { name: "▶" }));

    // 3. Tap EX Pomegranate20K (20,000 VND)
    fireEvent.click(screen.getByRole("button", { name: "EX Pomegranate20K" }));

    // Verify indented sub-line in Section III
    expect(screen.getByText("> EX Pomegranate20K")).toBeInTheDocument();
    expect(screen.getByText("20,000")).toBeInTheDocument();

    // 4. Verify sticky behavior: still on Page 2, tap EX SC Cold Foam 10K (10,000 VND)
    expect(screen.getByRole("button", { name: "EX SC Cold Foam 10K" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "EX SC Cold Foam 10K" }));

    expect(screen.getByText("> EX SC Cold Foam 10K")).toBeInTheDocument();
    expect(screen.getByText("10,000")).toBeInTheDocument();

    // 5. Verify total recalculation: 75,000 + 20,000 + 10,000 = 105,000 VND
    expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("105,000");
    // Tax = Math.round((105000 * 8) / 108) = 7,778 VND
    expect(screen.getByTestId("summary-tax-amount")).toHaveTextContent("7,778");
    // Quantity remains 1
    expect(screen.getByTestId("summary-total-quantity")).toHaveTextContent("1");
  });

  it("allows individual selection of parent drinks and modifier lines", () => {
    render(<App />);

    // Add drink and modifier
    fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
    fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
    fireEvent.click(screen.getByRole("button", { name: "LESS Ice" }));

    // Verify LESS Ice sub-line exists
    const modLine = screen.getByText("> LESS Ice").closest("div");
    expect(modLine).toBeInTheDocument();
    expect(modLine).toHaveClass("bg-[#a2c374]"); // Newly added modifier is highlighted

    // Click parent drink
    const drinkLine = screen.getByText("T LATTE").closest("div");
    fireEvent.click(drinkLine!);

    // Drink is now highlighted, modifier is not
    expect(drinkLine).toHaveClass("bg-[#a2c374]");
    expect(modLine).not.toHaveClass("bg-[#a2c374]");
  });

  it("defaults to last item when no line is selected", () => {
    render(<App />);

    // Add 2 drinks
    fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
    fireEvent.click(screen.getByRole("button", { name: "T CAPPUCCINO" }));

    // Unselect
    act(() => {
      usePosStore.getState().selectLine(null);
    });

    // Open Modifier and add NO Ice
    fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
    fireEvent.click(screen.getByRole("button", { name: "NO Ice" }));

    // NO Ice should be added to the last drink (T CAPPUCCINO)
    const items = usePosStore.getState().orderItems;
    expect(items[1].name).toBe("T CAPPUCCINO");
    expect(items[1].modifiers).toHaveLength(1);
    expect(items[1].modifiers[0].name).toBe("NO Ice");
  });
});
