import { FooterBar } from "@/components/layout/FooterBar";
import { HeaderBar } from "@/components/layout/HeaderBar";
import { usePosStore } from "@/store/usePosStore";
import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("App Shell Header & Footer", () => {
  beforeEach(() => {
    usePosStore.setState({
      terminalId: "M17015 - 17015",
      registerNumber: "0001",
      businessDate: "20260829",
      cashierName: "HAN CHI KIEN",
      currentServeType: "Not Set",
    });
  });

  it("renders authentic header bar with terminal ID, timestamp, and register number", () => {
    render(<HeaderBar />);

    expect(screen.getByTestId("header-bar")).toBeInTheDocument();
    expect(screen.getByText("M17015 - 17015")).toBeInTheDocument();
    expect(screen.getByText("0001")).toBeInTheDocument();
    expect(screen.getByTestId("icon-calendar")).toBeInTheDocument();
    expect(screen.getByTestId("live-timestamp")).toBeInTheDocument();
  });

  it("renders authentic footer bar with OnePOS version, business date, cashier, and serve type", () => {
    render(<FooterBar />);

    expect(screen.getByTestId("footer-status-bar")).toBeInTheDocument();
    expect(screen.getByText("OnePOS [2.0.15.0]")).toBeInTheDocument();
    expect(screen.getByText("Not Set")).toBeInTheDocument();
    expect(screen.getByText(/Business Date\d{8}/)).toBeInTheDocument();
    expect(screen.getByText("HAN CHI KIEN")).toBeInTheDocument();
  });

  it("updates footer when serve type changes in store", () => {
    render(<FooterBar />);

    act(() => {
      usePosStore.getState().setServeType("To Go");
    });
    expect(screen.getByText("To Go")).toBeInTheDocument();
  });
});
