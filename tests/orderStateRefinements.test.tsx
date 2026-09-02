import App from "@/App";
import { formatOrderNumber, getInitialOrderSequence } from "@/store/orderSequence";
import { usePosStore } from "@/store/usePosStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Ticket 07: Order State Refinements", () => {
  beforeEach(() => {
    localStorage.clear();
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
      orderSequence: 2787,
      orderNumber: formatOrderNumber(2787),
    });
  });

  describe("Order Number Sequence & Reset", () => {
    it("initializes with 10-digit format 010000XXXX from localStorage or default", () => {
      expect(formatOrderNumber(2787)).toBe("0100002787");
      expect(getInitialOrderSequence()).toBe(2787);

      localStorage.setItem("onepos_order_seq", "5555");
      expect(getInitialOrderSequence()).toBe(5555);
      expect(formatOrderNumber(5555)).toBe("0100005555");
    });

    it("displays the current order number in Section III banner", () => {
      render(<App />);
      expect(screen.getByTestId("order-number")).toHaveTextContent("Order No:0100002787");
    });

    it("increments sequence and persists to localStorage when order is cleared via CLEAR ALL", () => {
      render(<App />);

      // Add item to make order non-empty
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      expect(usePosStore.getState().orderItems.length).toBe(1);
      expect(screen.getByTestId("order-number")).toHaveTextContent("Order No:0100002787");

      // Tap CLEAR ALL
      fireEvent.click(screen.getByRole("button", { name: "CLEAR ALL" }));

      // Order should be cleared and order sequence incremented
      expect(usePosStore.getState().orderItems.length).toBe(0);
      expect(usePosStore.getState().orderSequence).toBe(2788);
      expect(usePosStore.getState().orderNumber).toBe("0100002788");
      expect(screen.getByTestId("order-number")).toHaveTextContent("Order No:0100002788");
      expect(localStorage.getItem("onepos_order_seq")).toBe("2788");

      // Tapping CLEAR ALL again when already empty does NOT increment again
      fireEvent.click(screen.getByRole("button", { name: "CLEAR ALL" }));
      expect(usePosStore.getState().orderSequence).toBe(2788);
    });

    it("increments sequence when the final remaining line item is voided", () => {
      render(<App />);

      // Add single item
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      expect(usePosStore.getState().orderItems.length).toBe(1);

      // Void the item
      fireEvent.click(screen.getByRole("button", { name: "Void" }));

      // Order is now empty -> sequence incremented
      expect(usePosStore.getState().orderItems.length).toBe(0);
      expect(usePosStore.getState().orderSequence).toBe(2788);
      expect(usePosStore.getState().orderNumber).toBe("0100002788");
      expect(localStorage.getItem("onepos_order_seq")).toBe("2788");
    });

    it("does not increment sequence when voiding a child modifier while parent drink remains", () => {
      render(<App />);

      // Add drink with modifier
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
      fireEvent.click(screen.getByRole("button", { name: "LESS Ice" }));

      // Modifier line is selected; void it
      fireEvent.click(screen.getByRole("button", { name: "Void" }));

      // Parent drink still exists -> sequence stays 2787
      expect(usePosStore.getState().orderItems.length).toBe(1);
      expect(usePosStore.getState().orderSequence).toBe(2787);
      expect(usePosStore.getState().orderNumber).toBe("0100002787");
    });
  });

  describe("Drink Reordering via Section IV Arrows", () => {
    it("reorders drinks while keeping child modifiers attached", () => {
      render(<App />);

      // 1. Add Drink A (Latte) with modifier (LESS Ice)
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
      fireEvent.click(screen.getByRole("button", { name: "LESS Ice" }));

      // 2. Add Drink B (Cappuccino)
      fireEvent.click(screen.getByRole("button", { name: "HOT ESP" }));
      fireEvent.click(screen.getByRole("button", { name: "T CAPPUCCINO" }));

      // 3. Add Drink C (Mocha)
      fireEvent.click(screen.getByRole("button", { name: "T MOCHA" }));

      // Currently Drink C is selected at index 2
      const items = usePosStore.getState().orderItems;
      expect(items.map((i) => i.name)).toEqual(["T LATTE", "T CAPPUCCINO", "T MOCHA"]);
      expect(items[0].modifiers[0].name).toBe("LESS Ice");

      // Move C up -> [A, C, B]
      fireEvent.click(screen.getByRole("button", { name: "Move line up" }));
      expect(usePosStore.getState().orderItems.map((i) => i.name)).toEqual([
        "T LATTE",
        "T MOCHA",
        "T CAPPUCCINO",
      ]);

      // Move C to top -> [C, A, B]
      fireEvent.click(screen.getByRole("button", { name: "Move line to top" }));
      const topItems = usePosStore.getState().orderItems;
      expect(topItems.map((i) => i.name)).toEqual(["T MOCHA", "T LATTE", "T CAPPUCCINO"]);
      // Drink A (now index 1) still retains its modifier
      expect(topItems[1].modifiers[0].name).toBe("LESS Ice");

      // Move C to bottom -> [A, B, C]
      fireEvent.click(screen.getByRole("button", { name: "Move line to bottom" }));
      expect(usePosStore.getState().orderItems.map((i) => i.name)).toEqual([
        "T LATTE",
        "T CAPPUCCINO",
        "T MOCHA",
      ]);
    });

    it("reorders the parent drink when a child modifier row is selected", () => {
      render(<App />);

      // Add Drink A (Latte) with modifier (LESS Ice)
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
      fireEvent.click(screen.getByRole("button", { name: "LESS Ice" }));

      // Add Drink B (Cappuccino)
      fireEvent.click(screen.getByRole("button", { name: "HOT ESP" }));
      fireEvent.click(screen.getByRole("button", { name: "T CAPPUCCINO" }));

      // Select Drink A's modifier line in Section III
      const modRow = screen.getByTestId(
        `order-modifier-row-${usePosStore.getState().orderItems[0].modifiers[0].id}`,
      );
      fireEvent.click(modRow);

      // Now active selection is on the modifier of Drink A (index 0)
      // Moving down should move Drink A (and its modifier) below Drink B
      fireEvent.click(screen.getByRole("button", { name: "Move line down" }));

      const items = usePosStore.getState().orderItems;
      expect(items[0].name).toBe("T CAPPUCCINO");
      expect(items[1].name).toBe("T LATTE");
      expect(items[1].modifiers[0].name).toBe("LESS Ice");
    });
  });

  describe("Serve Type Gating", () => {
    it("ensures Serve type/item is always visually enabled", () => {
      render(<App />);

      const serveTypeItemBtn = screen.getByRole("button", { name: "Serve type/item" });
      expect(serveTypeItemBtn).not.toBeDisabled();
      expect(serveTypeItemBtn).not.toHaveClass("opacity-50");
      expect(serveTypeItemBtn).not.toHaveClass("cursor-not-allowed");
    });

    it("does nothing when Serve type/item is clicked while currentServeType is Not Set", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      const serveTypeItemBtn = screen.getByRole("button", { name: "Serve type/item" });

      // Click when Not Set
      fireEvent.click(serveTypeItemBtn);
      expect(screen.queryByTestId("modal-serve-type")).not.toBeInTheDocument();
      expect(usePosStore.getState().activeModal).toBeNull();
    });

    it("opens modal when Serve type/item is clicked after global serve type is set", () => {
      render(<App />);

      // Add item
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));

      // Set global serve type
      fireEvent.click(screen.getByRole("button", { name: "Serve type/All" }));
      fireEvent.click(screen.getByRole("button", { name: "For Here" }));
      fireEvent.click(screen.getByRole("button", { name: "OK" }));

      // Now click Serve type/item
      const serveTypeItemBtn = screen.getByRole("button", { name: "Serve type/item" });
      fireEvent.click(serveTypeItemBtn);

      expect(screen.getByTestId("modal-serve-type")).toBeInTheDocument();
      expect(usePosStore.getState().activeModal).toBe("serve_type_item");
    });
  });
});
