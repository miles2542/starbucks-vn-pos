import App from "@/App";
import { usePosStore } from "@/store/usePosStore";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Ticket 06: Order Finalization, Serve Type Modals, and Line Operations", () => {
  beforeEach(() => {
    usePosStore.setState({
      activeCategoryId: "hot_esp",
      activeSubcategoryId: null,
      isModifierMode: false,
      activeModifierPage: null,
      activeModal: null,
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

  describe("Serve Type Modals", () => {
    it("opens Serve type/All modal, updates global serve type in banner and footer", () => {
      render(<App />);

      // Tap Serve type/All
      fireEvent.click(screen.getByRole("button", { name: "Serve type/All" }));

      // Modal should be open
      expect(screen.getByTestId("modal-serve-type")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "For Here" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "To Go" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "BYO" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "B2BS" })).toBeInTheDocument();

      // Select 'To Go' and confirm
      fireEvent.click(screen.getByRole("button", { name: "To Go" }));
      fireEvent.click(screen.getByRole("button", { name: "OK" }));

      // Modal closed
      expect(screen.queryByTestId("modal-serve-type")).not.toBeInTheDocument();

      // Banner and footer updated
      expect(screen.getByTestId("order-serve-type")).toHaveTextContent("To Go");
      expect(screen.getByTestId("footer-status-bar")).toHaveTextContent("To Go");
    });

    it("handles Serve type/item override and displays suffix when differing from global", () => {
      render(<App />);

      // 1. Visually enabled even when global is 'Not Set', but tapping is a no-op
      const itemServeBtn = screen.getByRole("button", { name: "Serve type/item" });
      expect(itemServeBtn).not.toBeDisabled();
      fireEvent.click(itemServeBtn);
      expect(screen.queryByTestId("modal-serve-type")).not.toBeInTheDocument();

      // 2. Set global serve type to 'To Go'
      fireEvent.click(screen.getByRole("button", { name: "Serve type/All" }));
      fireEvent.click(screen.getByRole("button", { name: "To Go" }));
      fireEvent.click(screen.getByRole("button", { name: "OK" }));

      // 3. Add 2 beverages
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "T CAPPUCCINO" }));

      // Item 2 (T CAPPUCCINO) is currently selected
      expect(itemServeBtn).not.toBeDisabled();
      fireEvent.click(itemServeBtn);

      // Modal opens for Item
      expect(screen.getByTestId("modal-serve-type")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "BYO" }));
      fireEvent.click(screen.getByRole("button", { name: "OK" }));

      // Suffix '2B' should be rendered on line 2 in Section III list
      const items = usePosStore.getState().orderItems;
      const row1 = screen.getByTestId(`order-item-row-${items[0].id}`);
      const row2 = screen.getByTestId(`order-item-row-${items[1].id}`);
      expect(within(row2).getByTestId("order-item-line-number")).toHaveTextContent("2B");
      // Line 1 should remain '1' without suffix
      expect(within(row1).getByTestId("order-item-line-number")).toHaveTextContent("1");
    });
  });

  describe("Change Size Modal", () => {
    it("opens Change Size modal, switches size, updates price and name prefix", () => {
      render(<App />);

      // Order Tall Latte (75,000 VND)
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      const orderList = screen.getByTestId("order-items-list");
      expect(within(orderList).getByText("T LATTE")).toBeInTheDocument();
      expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("75,000");

      // Tap Change Size in Col 7
      fireEvent.click(screen.getByRole("button", { name: "Change Size" }));

      // Modal opens
      expect(screen.getByTestId("modal-change-size")).toBeInTheDocument();

      // Select Grande (G)
      fireEvent.click(screen.getByTestId("size-option-grande"));
      fireEvent.click(screen.getByRole("button", { name: "OK" }));

      // Modal closes, item is updated to Grande Latte (85,000 VND)
      expect(screen.queryByTestId("modal-change-size")).not.toBeInTheDocument();
      expect(within(orderList).getByText("G LATTE")).toBeInTheDocument();
      expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("85,000");
    });
  });

  describe("Section IV Line Operations", () => {
    it("reorders drinks up, down, top, and bottom with arrow buttons", () => {
      render(<App />);

      // Add 2 drinks with modifiers
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
      fireEvent.click(screen.getByRole("button", { name: "LESS Ice" }));

      fireEvent.click(screen.getByRole("button", { name: "HOT ESP" }));
      fireEvent.click(screen.getByRole("button", { name: "T CAPPUCCINO" }));

      // Cappuccino is at index 1, Latte is at index 0
      expect(usePosStore.getState().orderItems[0].name).toBe("T LATTE");
      expect(usePosStore.getState().orderItems[1].name).toBe("T CAPPUCCINO");

      // Move Cappuccino up -> Cappuccino index 0, Latte index 1
      fireEvent.click(screen.getByRole("button", { name: "Move line up" }));
      expect(usePosStore.getState().orderItems[0].name).toBe("T CAPPUCCINO");
      expect(usePosStore.getState().orderItems[1].name).toBe("T LATTE");

      // Move Cappuccino down -> Cappuccino index 1, Latte index 0
      fireEvent.click(screen.getByRole("button", { name: "Move line down" }));
      expect(usePosStore.getState().orderItems[0].name).toBe("T LATTE");
      expect(usePosStore.getState().orderItems[1].name).toBe("T CAPPUCCINO");

      // Move to top
      fireEvent.click(screen.getByRole("button", { name: "Move line to top" }));
      expect(usePosStore.getState().orderItems[0].name).toBe("T CAPPUCCINO");
      expect(usePosStore.getState().orderItems[1].name).toBe("T LATTE");

      // Move to bottom
      fireEvent.click(screen.getByRole("button", { name: "Move line to bottom" }));
      expect(usePosStore.getState().orderItems[0].name).toBe("T LATTE");
      expect(usePosStore.getState().orderItems[1].name).toBe("T CAPPUCCINO");
    });

    it("voids individual modifier line without deleting parent drink", () => {
      render(<App />);

      // Add T LATTE with LESS Ice
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
      fireEvent.click(screen.getByRole("button", { name: "LESS Ice" }));

      const orderList = screen.getByTestId("order-items-list");
      expect(within(orderList).getByText("> LESS Ice")).toBeInTheDocument();

      // Void the modifier line (which is currently selected)
      fireEvent.click(screen.getByRole("button", { name: "Void" }));

      // Modifier line removed, parent drink remains intact
      expect(within(orderList).queryByText("> LESS Ice")).not.toBeInTheDocument();
      expect(within(orderList).getByText("T LATTE")).toBeInTheDocument();
    });

    it("voids parent drink with all attached modifiers", () => {
      render(<App />);

      // Add T LATTE with LESS Ice
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
      fireEvent.click(screen.getByRole("button", { name: "LESS Ice" }));

      const orderList = screen.getByTestId("order-items-list");

      // Select parent drink
      const drinkRow = within(orderList).getByText("T LATTE").closest("div");
      fireEvent.click(drinkRow!);

      // Tap Void
      fireEvent.click(screen.getByRole("button", { name: "Void" }));

      // Entire drink and modifier removed
      expect(within(orderList).queryByText("T LATTE")).not.toBeInTheDocument();
      expect(within(orderList).queryByText("> LESS Ice")).not.toBeInTheDocument();
      expect(screen.queryByTestId("summary-total-amount")).not.toBeInTheDocument();
      expect(screen.getByTestId("total-amount-display")).toHaveTextContent("0");
    });

    it("clears entire order with CLEAR ALL", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "T CAPPUCCINO" }));
      expect(screen.getByTestId("summary-total-quantity")).toHaveTextContent("2");

      fireEvent.click(screen.getByRole("button", { name: "CLEAR ALL" }));

      const orderList = screen.getByTestId("order-items-list");
      expect(within(orderList).queryByText("T LATTE")).not.toBeInTheDocument();
      expect(within(orderList).queryByText("T CAPPUCCINO")).not.toBeInTheDocument();
      expect(screen.queryByTestId("summary-total-quantity")).not.toBeInTheDocument();
      expect(screen.queryByTestId("summary-total-amount")).not.toBeInTheDocument();
      expect(screen.getByTestId("total-amount-display")).toHaveTextContent("0");
    });
  });
});
