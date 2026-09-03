import App from "@/App";
import { usePosStore } from "@/store/usePosStore";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("Missing Menus, Subcategories, and Authentic Modal Styling", () => {
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

  describe("Part 1: Menus & Subcategories Navigation", () => {
    it("navigates into BREWED -> Cold Brew subcategory and shows authentic items", () => {
      render(<App />);

      // Tap BREWED category
      fireEvent.click(screen.getByRole("button", { name: "BREWED" }));
      expect(screen.getByTestId("breadcrumb-banner")).toHaveTextContent("BREWED");

      // Tap Cold Brew subcategory button
      const coldBrewBtn = screen.getByRole("button", { name: "Cold Brew" });
      expect(coldBrewBtn).toBeInTheDocument();
      fireEvent.click(coldBrewBtn);

      // Verify subcategory breadcrumb and items
      expect(screen.getByTestId("breadcrumb-banner")).toHaveTextContent("Cold Brew");
      expect(screen.getByRole("button", { name: "T Iced Cold Brew" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "T Iced VSCCB" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "T HRCB" })).toBeInTheDocument();
    });

    it("navigates into DISCOUNT -> NSO Promo subcategory and shows authentic items", () => {
      render(<App />);

      // Tap DISCOUNT category
      fireEvent.click(screen.getByRole("button", { name: "DISCOUNT" }));
      expect(screen.getByTestId("breadcrumb-banner")).toHaveTextContent("DISCOUNT");

      // Tap NSO Promo subcategory button
      const nsoPromoBtn = screen.getByRole("button", { name: "NSO Promo" });
      expect(nsoPromoBtn).toBeInTheDocument();
      fireEvent.click(nsoPromoBtn);

      // Verify breadcrumb and items
      expect(screen.getByTestId("breadcrumb-banner")).toHaveTextContent("NSO Promo");
      expect(screen.getByRole("button", { name: "NSO - SR_Enamel Pin" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "NSO - SR_Reusable Cu" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "800110444 SR REUSE C" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Pin Tet Bearista" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "16476 NSO GWP" })).toBeInTheDocument();
    });

    it("navigates into TEA -> DS HIBISCUS and shows items including sold-out overlay", () => {
      render(<App />);

      // Tap TEA category
      fireEvent.click(screen.getByRole("button", { name: "TEA" }));

      // Tap DS HIBISCUS subcategory button
      const dsHibiscusBtn = screen.getByRole("button", { name: "DS HIBISCUS" });
      expect(dsHibiscusBtn).toBeInTheDocument();
      fireEvent.click(dsHibiscusBtn);

      // Verify items
      expect(screen.getByRole("button", { name: "T HTL" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "T HT" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "T Iced HTP" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "T LRHL" })).toBeInTheDocument();

      // B Iced HTP (MBRO) sold-out item
      const mbroBtn = screen.getByRole("button", { name: /B Iced HTP \(MBRO\)/i });
      expect(mbroBtn).toBeInTheDocument();
      expect(mbroBtn).toBeDisabled();
      expect(within(mbroBtn).getByTestId("sold-out-cross")).toBeInTheDocument();
    });

    it("renders DELIVERY ITEM, SBUX CARD, and SBApp Merchandise items", () => {
      render(<App />);

      // 1. DELIVERY ITEM
      fireEvent.click(screen.getByRole("button", { name: "DELIVERY ITEM" }));
      expect(screen.getByRole("button", { name: "Deli WB (NO COUNT)" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Deli Merch" })).toBeInTheDocument();

      // 2. SBUX CARD category
      const catGrid = screen.getByTestId("section-1-category-grid");
      fireEvent.click(within(catGrid).getByRole("button", { name: "SBUX CARD" }));
      expect(screen.getByRole("button", { name: "Starbucks Card" })).toBeInTheDocument();

      // 3. SBApp Merchandise
      fireEvent.click(screen.getByRole("button", { name: "SBApp Merchandise" }));
      expect(screen.getByRole("button", { name: "FY26WIN-COFFEE CRAFT" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "FY26SPR-HARRY POTTER" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "FY27AUT-WINNIE POOH" })).toBeInTheDocument();
    });
  });

  describe("Part 2: Rewards Enquiry Modal", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("opens Rewards Enquiry modal, fills progress bar to 25%, and auto-closes", () => {
      render(<App />);

      // Click Rewards Enquiry button in Section IV
      fireEvent.click(screen.getByRole("button", { name: "Rewards Enquiry" }));

      // Modal is visible
      const modal = screen.getByTestId("modal-rewards-enquiry");
      expect(modal).toBeInTheDocument();
      expect(screen.getByText("SBUX Card")).toBeInTheDocument();
      expect(screen.getByText("Please swipe SBUX card")).toBeInTheDocument();

      const progressBar = screen.getByTestId("rewards-enquiry-progress");
      expect(progressBar.style.width).toBe("0%");

      // Advance 500ms -> progress starts filling to 25%
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(progressBar.style.width).toBe("25%");

      // Advance another 1000ms (1500ms total) -> modal closes
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(screen.queryByTestId("modal-rewards-enquiry")).not.toBeInTheDocument();
    });

    it("immediately closes and aborts timer when Cancel button is clicked", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "Rewards Enquiry" }));
      expect(screen.getByTestId("modal-rewards-enquiry")).toBeInTheDocument();

      // Click Cancel button
      fireEvent.click(screen.getByTestId("rewards-enquiry-cancel"));
      expect(screen.queryByTestId("modal-rewards-enquiry")).not.toBeInTheDocument();
    });
  });

  describe("Part 3: QTY Modifier Modal Restyling", () => {
    it("renders authentic 4-column keypad with Prev, Reset, and Enter", () => {
      render(<App />);

      // Add a beverage and select QTY
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "QTY" }));

      const modal = screen.getByTestId("modal-qty");
      expect(modal).toBeInTheDocument();
      expect(screen.getByText("Quantity")).toBeInTheDocument();

      // Input display box
      const display = screen.getByTestId("qty-buffer-display");
      expect(display).toHaveTextContent("0");

      // Keypad buttons
      const btn7 = screen.getByTestId("keypad-btn-7");
      const btnDot = screen.getByTestId("keypad-btn-dot");
      const btnBackspace = screen.getByTestId("keypad-btn-backspace");
      const btnReset = screen.getByTestId("keypad-btn-clear");
      const btnPrev = screen.getByTestId("keypad-btn-prev");
      const btnEnter = screen.getByTestId("keypad-btn-enter");

      expect(btn7).toBeInTheDocument();
      expect(btnDot).toBeInTheDocument();
      expect(btnBackspace).toBeInTheDocument();
      expect(btnReset).toHaveTextContent("Reset");
      expect(btnPrev).toHaveTextContent("Prev");
      expect(btnEnter).toHaveTextContent("Enter");

      // Enter digits '5' then backspace
      fireEvent.click(screen.getByTestId("keypad-btn-5"));
      expect(display).toHaveTextContent("5");
      fireEvent.click(btnBackspace);
      expect(display).toHaveTextContent("0");

      // Enter digits '1', '2'
      fireEvent.click(screen.getByTestId("keypad-btn-1"));
      fireEvent.click(screen.getByTestId("keypad-btn-2"));
      expect(display).toHaveTextContent("12");

      // Click Reset -> clears back to '0'
      fireEvent.click(btnReset);
      expect(display).toHaveTextContent("0");

      // Enter '3' and submit with Enter
      fireEvent.click(screen.getByTestId("keypad-btn-3"));
      fireEvent.click(btnEnter);

      // Modal closed and quantity updated to 3
      expect(screen.queryByTestId("modal-qty")).not.toBeInTheDocument();
      expect(usePosStore.getState().orderItems[0].quantity).toBe(3);
    });

    it("closes modal on Prev button click without changing quantity", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "QTY" }));

      expect(screen.getByTestId("modal-qty")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("keypad-btn-prev"));
      expect(screen.queryByTestId("modal-qty")).not.toBeInTheDocument();
      expect(usePosStore.getState().orderItems[0].quantity).toBe(1);
    });
  });

  describe("Part 4: Serve Type and Change Size Modals", () => {
    it("handles Serve type/Item with Reset option clearing override", () => {
      render(<App />);

      // Set global serve type to 'To Go'
      fireEvent.click(screen.getByRole("button", { name: "Serve type/All" }));
      fireEvent.click(screen.getByRole("button", { name: "To Go" }));
      fireEvent.click(screen.getByRole("button", { name: "OK" }));

      // Add a drink and set item serve type to 'BYO'
      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Serve type/item" }));

      // Mode Item shows: For Here, Reset, To Go, BYO, B2BS
      expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "B2BS" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "BYO" }));
      fireEvent.click(screen.getByRole("button", { name: "OK" }));
      expect(usePosStore.getState().orderItems[0].serveType).toBe("BYO");

      // Re-open Serve type/item and select Reset
      fireEvent.click(screen.getByRole("button", { name: "Serve type/item" }));
      fireEvent.click(screen.getByRole("button", { name: "Reset" }));
      fireEvent.click(screen.getByRole("button", { name: "OK" }));

      // Item-level serveType override is now cleared back to undefined
      expect(usePosStore.getState().orderItems[0].serveType).toBeUndefined();
    });

    it("renders Change Size modal with authentic options Short, Tall, Grande, Venti", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Change Size" }));

      const modal = screen.getByTestId("modal-change-size");
      expect(screen.getByText("Please choose the size")).toBeInTheDocument();
      expect(within(modal).getByRole("button", { name: "Short" })).toBeInTheDocument();
      expect(within(modal).getByRole("button", { name: "Tall" })).toBeInTheDocument();
      expect(within(modal).getByRole("button", { name: "Grande" })).toBeInTheDocument();
      expect(within(modal).getByRole("button", { name: "Venti" })).toBeInTheDocument();

      fireEvent.click(within(modal).getByRole("button", { name: "Grande" }));
      fireEvent.click(within(modal).getByRole("button", { name: "OK" }));

      expect(screen.queryByTestId("modal-change-size")).not.toBeInTheDocument();
      expect(usePosStore.getState().orderItems[0].size).toBe("G");
      expect(usePosStore.getState().orderItems[0].name).toBe("G LATTE");
    });
  });
});
