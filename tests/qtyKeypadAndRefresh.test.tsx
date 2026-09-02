import App from "@/App";
import { usePosStore } from "@/store/usePosStore";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Ticket 08: QTY Keypad Modal and Expanded Refresh Transition Engine", () => {
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

  describe("QTY Keypad Modal", () => {
    it("is a no-op when QTY is clicked with no line item selected", () => {
      render(<App />);

      const qtyBtn = screen.getByRole("button", { name: "QTY" });
      fireEvent.click(qtyBtn);

      expect(screen.queryByTestId("modal-qty")).not.toBeInTheDocument();
      expect(usePosStore.getState().activeModal).toBeNull();
    });

    it("opens 3x4 numeric keypad modal when drink is selected and allows quantity change", () => {
      render(<App />);

      // Order Tall Latte (75,000 VND)
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("75,000");
      expect(screen.getByTestId("summary-total-quantity")).toHaveTextContent("1");

      // Tap QTY button in Col 1
      const qtyBtn = screen.getByRole("button", { name: "QTY" });
      fireEvent.click(qtyBtn);

      // Modal is displayed
      expect(screen.getByTestId("modal-qty")).toBeInTheDocument();
      expect(screen.getByTestId("qty-target-name")).toHaveTextContent("T LATTE");
      expect(screen.getByTestId("qty-current-value")).toHaveTextContent("1");
      expect(screen.getByTestId("qty-buffer-display")).toHaveTextContent("0");

      // Enter quantity 3 using keypad
      fireEvent.click(screen.getByTestId("keypad-btn-3"));
      expect(screen.getByTestId("qty-buffer-display")).toHaveTextContent("3");

      // Tap Enter
      fireEvent.click(screen.getByTestId("keypad-btn-enter"));

      // Modal closes, quantity is updated to 3
      expect(screen.queryByTestId("modal-qty")).not.toBeInTheDocument();
      expect(screen.getByTestId("summary-total-quantity")).toHaveTextContent("3");
      expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("225,000"); // 75,000 * 3
    });

    it("supports multi-digit input and Clear button", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "QTY" }));

      // Type 1 then 2 = 12
      fireEvent.click(screen.getByTestId("keypad-btn-1"));
      fireEvent.click(screen.getByTestId("keypad-btn-2"));
      expect(screen.getByTestId("qty-buffer-display")).toHaveTextContent("12");

      // Clear input
      fireEvent.click(screen.getByTestId("keypad-btn-clear"));
      expect(screen.getByTestId("qty-buffer-display")).toHaveTextContent("0");

      // Type 5 and confirm via OK footer button
      fireEvent.click(screen.getByTestId("keypad-btn-5"));
      fireEvent.click(screen.getByRole("button", { name: "OK" }));

      expect(screen.queryByTestId("modal-qty")).not.toBeInTheDocument();
      expect(screen.getByTestId("summary-total-quantity")).toHaveTextContent("5");
      expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("375,000"); // 75,000 * 5
    });

    it("updates quantity for a selected child modifier", () => {
      render(<App />);

      // Order Tall Latte (75,000 VND) with Vanilla Syrup modifier (10,000 VND)
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
      fireEvent.click(screen.getByRole("button", { name: "LESS Ice" }));

      const modId = usePosStore.getState().orderItems[0].modifiers[0].id;
      const modRow = screen.getByTestId(`order-modifier-row-${modId}`);
      fireEvent.click(modRow);

      // Tap QTY
      fireEvent.click(screen.getByRole("button", { name: "QTY" }));
      expect(screen.getByTestId("modal-qty")).toBeInTheDocument();
      expect(screen.getByTestId("qty-target-name")).toHaveTextContent("LESS Ice");

      // Enter 2
      fireEvent.click(screen.getByTestId("keypad-btn-2"));
      fireEvent.click(screen.getByTestId("keypad-btn-enter"));

      expect(screen.queryByTestId("modal-qty")).not.toBeInTheDocument();
      expect(usePosStore.getState().orderItems[0].modifiers[0].quantity).toBe(2);
      expect(within(modRow).getByText("2")).toBeInTheDocument();
    });

    it("cancels without updating quantity when Cancel or Close is tapped", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "QTY" }));

      fireEvent.click(screen.getByTestId("keypad-btn-9"));
      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

      expect(screen.queryByTestId("modal-qty")).not.toBeInTheDocument();
      expect(screen.getByTestId("summary-total-quantity")).toHaveTextContent("1");
      expect(screen.getByTestId("summary-total-amount")).toHaveTextContent("75,000");
    });
  });

  describe("100ms Refresh Transition Scope", () => {
    beforeEach(() => {
      vi.useFakeTimers();
      usePosStore.setState({
        enableRefreshTransition: true,
        isRefreshing: false,
      });
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("triggers 100ms cell refresh when changing size modifiers", () => {
      render(<App />);

      // Click Grande size button
      fireEvent.click(screen.getByRole("button", { name: "Grande" }));

      // Refresh is triggered
      expect(usePosStore.getState().isRefreshing).toBe(true);

      // Fast-forward 50ms (still refreshing)
      act(() => {
        vi.advanceTimersByTime(50);
      });
      expect(usePosStore.getState().isRefreshing).toBe(true);

      // Fast-forward remaining 50ms (total 100ms)
      act(() => {
        vi.advanceTimersByTime(50);
      });
      expect(usePosStore.getState().isRefreshing).toBe(false);
    });

    it("triggers 100ms cell refresh when selecting multiplier buttons", () => {
      render(<App />);

      // Click X 2 button
      fireEvent.click(screen.getByRole("button", { name: "X 2" }));
      expect(usePosStore.getState().isRefreshing).toBe(true);

      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(usePosStore.getState().isRefreshing).toBe(false);
    });

    it("triggers 100ms cell refresh when opening modifier menu", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "Modifier" }));
      expect(usePosStore.getState().isRefreshing).toBe(true);

      act(() => {
        vi.advanceTimersByTime(100);
      });
      expect(usePosStore.getState().isRefreshing).toBe(false);
    });
  });
});
