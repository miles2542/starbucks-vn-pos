import App from "@/App";
import { ViewControls } from "@/components/debug/ViewControls";
import { usePosStore } from "@/store/usePosStore";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Ticket 09: Pixel-Accurate SVGs, Selection Glow Removal, and Classic Modals", () => {
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

  describe("Pixel-Accurate SVGs", () => {
    it("renders custom inline SVGs in Section IV reorder buttons and bottom-right action", () => {
      render(<App />);

      expect(screen.getByTestId("icon-arrow-up-single")).toBeInTheDocument();
      expect(screen.getByTestId("icon-arrow-up-double")).toBeInTheDocument();
      expect(screen.getByTestId("icon-arrow-down-double")).toBeInTheDocument();
      expect(screen.getByTestId("icon-arrow-down-single")).toBeInTheDocument();
      expect(screen.getByTestId("icon-nav-arrow-right")).toBeInTheDocument();
    });

    it("renders custom hardware status SVGs in header and footer", () => {
      render(<App />);

      expect(screen.getByTestId("icon-store-house")).toBeInTheDocument();
      expect(screen.getByTestId("icon-calendar")).toBeInTheDocument();
      expect(screen.getByTestId("icon-register-drawer")).toBeInTheDocument();
      expect(screen.getByTestId("icon-cashier-user")).toBeInTheDocument();
    });
  });

  describe("Removal of Artificial Selection Glows", () => {
    it("does not render artificial selection glow rings on Section I categories", () => {
      render(<App />);

      const activeCat = screen.getByRole("button", { name: "HOT ESP" });
      expect(activeCat.className).not.toContain("ring-");
      expect(activeCat.className).not.toContain("pos-btn-category-active");
    });

    it("does not render artificial selection glow rings on Section II modifier or size buttons", () => {
      render(<App />);

      const tallSizeBtn = screen.getByRole("button", { name: "Tall" });
      expect(tallSizeBtn.className).not.toContain("ring-");
      expect(tallSizeBtn.className).not.toContain("pos-btn-category-active");

      const x1Btn = screen.getByRole("button", { name: "X 1" });
      expect(x1Btn.className).not.toContain("ring-");
      expect(x1Btn.className).not.toContain("pos-btn-category-active");
    });
  });

  describe("Classic OnePOS Modal Reskin", () => {
    it("renders ServeTypeModal as a classic single-column list with blue rectangular highlight", () => {
      render(<App />);

      // Open Serve type/All modal
      fireEvent.click(screen.getByRole("button", { name: "Serve type/All" }));

      const modal = screen.getByTestId("modal-serve-type");
      expect(modal).toBeInTheDocument();

      // Check single-column list container
      const listContainer = screen.getByTestId("serve-type-options-list");
      expect(listContainer).toBeInTheDocument();

      // Default selection (For Here) has blue highlight
      const forHereBtn = screen.getByTestId("serve-option-for-here");
      expect(forHereBtn.className).toContain("bg-[#026bca]");
      expect(forHereBtn.className).toContain("text-[#fafafa]");

      // Click To Go
      const toGoBtn = screen.getByTestId("serve-option-to-go");
      fireEvent.click(toGoBtn);
      expect(toGoBtn.className).toContain("bg-[#026bca]");
      expect(toGoBtn.className).toContain("text-[#fafafa]");

      // Verify OK and Cancel buttons
      const okBtn = screen.getByRole("button", { name: "OK" });
      const cancelBtn = screen.getByRole("button", { name: "Cancel" });
      expect(okBtn).toBeInTheDocument();
      expect(cancelBtn).toBeInTheDocument();

      fireEvent.click(okBtn);
      expect(screen.queryByTestId("modal-serve-type")).not.toBeInTheDocument();
    });

    it("renders ChangeSizeModal with blue rectangular highlight on active size", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "Change Size" }));

      const modal = screen.getByTestId("modal-change-size");
      expect(modal).toBeInTheDocument();

      // Active size Tall has blue highlight
      const tallOption = screen.getByTestId("size-option-tall");
      expect(tallOption.className).toContain("bg-[#026bca]");
      expect(tallOption.className).toContain("text-[#fafafa]");

      // Switch to Grande
      const grandeOption = screen.getByTestId("size-option-grande");
      fireEvent.click(grandeOption);
      expect(grandeOption.className).toContain("bg-[#026bca]");
      expect(grandeOption.className).toContain("text-[#fafafa]");

      fireEvent.click(screen.getByRole("button", { name: "OK" }));
      expect(screen.queryByTestId("modal-change-size")).not.toBeInTheDocument();
    });

    it("renders QtyModal with classic window style and 3x4 keypad", () => {
      render(<App />);

      fireEvent.click(screen.getByRole("button", { name: "T LATTE" }));
      fireEvent.click(screen.getByRole("button", { name: "QTY" }));

      const modal = screen.getByTestId("modal-qty");
      expect(modal).toBeInTheDocument();

      // 3x4 Keypad grid
      const keypad = screen.getByTestId("qty-keypad-grid");
      expect(keypad).toBeInTheDocument();
      expect(within(keypad).getByText("Enter")).toBeInTheDocument();
      expect(within(keypad).getByText("Clear")).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
      expect(screen.queryByTestId("modal-qty")).not.toBeInTheDocument();
    });
  });

  describe("Minimized Floating Viewport Control", () => {
    it("defaults to a minimized rounded pill with low resting opacity and expands on toggle", () => {
      render(<ViewControls />);

      const controlsContainer = screen.getByTestId("view-controls");
      expect(controlsContainer.className).toContain("opacity-25");

      // Only eye toggle button is visible in collapsed state
      const toggleBtn = screen.getByTestId("view-controls-toggle");
      expect(toggleBtn).toBeInTheDocument();
      expect(screen.queryByText("Viewport & Debug")).not.toBeInTheDocument();

      // Click to expand
      fireEvent.click(toggleBtn);

      // Now full controls panel is visible
      expect(screen.getByText("Viewport & Debug")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Fit" })).toBeInTheDocument();

      // Click collapse button
      const collapseBtn = screen.getByTestId("view-controls-toggle");
      fireEvent.click(collapseBtn);

      // Returns to minimized pill
      expect(screen.queryByText("Viewport & Debug")).not.toBeInTheDocument();
    });
  });
});
