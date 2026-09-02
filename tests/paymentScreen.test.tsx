import { CategoryGrid } from "@/components/section-1-categories/CategoryGrid";
import { ItemGrid } from "@/components/section-2-items/ItemGrid";
import { FinalizeShell } from "@/components/section-4-finalize/FinalizeShell";
import { usePosStore } from "@/store/usePosStore";
import type { OrderItem } from "@/types/pos";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Ticket 11: Payment Screen Mode", () => {
  const dummyItem: OrderItem = {
    id: "item-1",
    menuItemId: "t_latte",
    name: "T LATTE",
    quantity: 1,
    unitPrice: 70000,
    totalPrice: 70000,
    modifiers: [],
  };

  beforeEach(() => {
    act(() => {
      usePosStore.setState({
        activeCategoryId: "hot_esp",
        activeSubcategoryId: null,
        breadcrumb: [{ label: "HOT ESP", id: "hot_esp" }],
        activeSize: "T",
        multiplier: 1,
        orderItems: [dummyItem],
        selectedOrderItemId: dummyItem.id,
        selectedLineId: dummyItem.id,
        currentServeType: "For Here",
        isRefreshing: false,
        enableRefreshTransition: false,
        isPaymentMode: false,
        activePaymentTab: "normal_payment",
      });
    });
  });

  it("enters payment mode when tapping total amount display if orderItems > 0", () => {
    render(<FinalizeShell />);
    const totalDisplay = screen.getByTestId("total-amount-display");
    expect(totalDisplay).toHaveTextContent("70,000");

    fireEvent.click(totalDisplay);

    const state = usePosStore.getState();
    expect(state.isPaymentMode).toBe(true);
    expect(state.activePaymentTab).toBe("normal_payment");
    expect(state.breadcrumb).toEqual([{ label: "Normal Payment", id: "normal_payment" }]);
  });

  it("does not enter payment mode when order is empty", () => {
    act(() => {
      usePosStore.setState({
        orderItems: [],
        selectedOrderItemId: null,
        selectedLineId: null,
      });
    });

    render(<FinalizeShell />);
    const totalDisplay = screen.getByTestId("total-amount-display");
    expect(totalDisplay).toHaveTextContent("0");

    fireEvent.click(totalDisplay);

    const state = usePosStore.getState();
    expect(state.isPaymentMode).toBe(false);
  });

  it("renders payment tabs in Section I when in payment mode", () => {
    act(() => {
      usePosStore.setState({ isPaymentMode: true, activePaymentTab: "normal_payment" });
    });

    render(<CategoryGrid />);
    expect(screen.getByRole("button", { name: "Normal Payment" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "COUPON" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Overseas Discount" })).toBeInTheDocument();

    // Switching tabs
    fireEvent.click(screen.getByRole("button", { name: "Overseas Discount" }));
    expect(usePosStore.getState().activePaymentTab).toBe("overseas_discount");
    expect(usePosStore.getState().breadcrumb).toEqual([
      { label: "Overseas Discount", id: "overseas_discount" },
    ]);

    fireEvent.click(screen.getByRole("button", { name: "COUPON" }));
    expect(usePosStore.getState().activePaymentTab).toBe("coupon");
    expect(usePosStore.getState().breadcrumb).toEqual([{ label: "COUPON", id: "coupon" }]);
  });

  it("renders Section II Col 1 with X 1 - X 4 and QTY (no Modifier button), and Col 7 with Complete Payment", () => {
    act(() => {
      usePosStore.setState({ isPaymentMode: true, activePaymentTab: "normal_payment" });
    });

    render(<ItemGrid />);

    // Col 1
    expect(screen.queryByRole("button", { name: "Modifier" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X 2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X 3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X 4" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "QTY" })).toBeInTheDocument();

    // Col 7
    expect(screen.getByRole("button", { name: "Complete Payment" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Short" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Tall" })).not.toBeInTheDocument();
  });

  it("renders authentic payment tender matrices in Section II for each tab", () => {
    act(() => {
      usePosStore.setState({ isPaymentMode: true, activePaymentTab: "normal_payment" });
    });

    const { rerender } = render(<ItemGrid />);
    expect(screen.getByRole("button", { name: "CASH" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ON HOUSE" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CREDIT CARD MANUAL" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SBUX_CARD_COUPON" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ZALOPAY" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "MOMO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PAYOO NO PROMO" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "E-Voucher 16401" })).toBeInTheDocument();

    // Overseas Discount tab
    act(() => {
      usePosStore.setState({ activePaymentTab: "overseas_discount" });
      rerender(<ItemGrid />);
    });
    expect(screen.getByRole("button", { name: "OVSEMP HK SBSDISC" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "OVSEMP CN SBSDISC" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "OVSEMP TH SBSDISC" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "OVSEMP SG SBSDISC" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "OVSEMP KH SBSDISC" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "OVSEMP MACAU SBSDISC" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "OVSEMP LAO SBSDISC" })).toBeInTheDocument();

    // COUPON tab
    act(() => {
      usePosStore.setState({ activePaymentTab: "coupon" });
      rerender(<ItemGrid />);
    });
    expect(screen.getByRole("button", { name: "STAFF DISCOUNT" })).toBeInTheDocument();
  });

  it("renders Section IV payment buttons (BACK, CLEAR ALL, DELETE, Balance/Rewards Enquiry) and BACK exits payment mode", () => {
    act(() => {
      usePosStore.setState({ isPaymentMode: true });
    });

    render(<FinalizeShell />);
    const backBtn = screen.getByRole("button", { name: "BACK" });
    const clearAllBtn = screen.getByRole("button", { name: "CLEAR ALL" });
    const deleteBtn = screen.getByRole("button", { name: "DELETE" });
    const balEnquiry = screen.getByRole("button", { name: "Balance Enquiry" });
    const rewEnquiry = screen.getByRole("button", { name: "Rewards Enquiry" });

    expect(backBtn).toBeInTheDocument();
    expect(clearAllBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
    expect(balEnquiry).toBeInTheDocument();
    expect(rewEnquiry).toBeInTheDocument();

    // Void button should not be present in payment mode (replaced by DELETE)
    expect(screen.queryByRole("button", { name: "Void" })).not.toBeInTheDocument();

    // Click BACK
    fireEvent.click(backBtn);
    expect(usePosStore.getState().isPaymentMode).toBe(false);
    expect(usePosStore.getState().breadcrumb).toEqual([{ label: "HOT ESP", id: "hot_esp" }]);
  });

  it("completes payment on Complete Payment click: clears order, increments sequence, and exits payment mode", () => {
    act(() => {
      usePosStore.setState({ isPaymentMode: true, orderSequence: 2787 });
    });

    render(<ItemGrid />);
    const completeBtn = screen.getByRole("button", { name: "Complete Payment" });
    fireEvent.click(completeBtn);

    const state = usePosStore.getState();
    expect(state.isPaymentMode).toBe(false);
    expect(state.orderItems).toHaveLength(0);
    expect(state.orderSequence).toBe(2788);
    expect(state.orderNumber).toBe("0100002788");
  });
});
