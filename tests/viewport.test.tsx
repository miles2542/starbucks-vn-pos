import { ViewControls } from "@/components/debug/ViewControls";
import { ViewportContainer } from "@/components/layout/ViewportContainer";
import { usePosStore } from "@/store/usePosStore";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("Viewport Container & View Controls", () => {
  beforeEach(() => {
    usePosStore.setState({
      zoomMode: "fit",
      scale: 1,
      enableRefreshTransition: true,
      isRefreshing: false,
    });
  });

  it("renders 1920x1080 canvas inside viewport container", () => {
    render(
      <ViewportContainer>
        <div data-testid="pos-inner-content">POS Content</div>
      </ViewportContainer>,
    );

    const canvas = screen.getByTestId("pos-viewport-canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveStyle({ width: "1920px", height: "1080px" });
  });

  it("updates scale and zoomMode when clicking zoom options", () => {
    render(
      <>
        <ViewportContainer>
          <div>Canvas</div>
        </ViewportContainer>
        <ViewControls />
      </>,
    );

    expect(screen.getByTestId("view-controls")).toBeInTheDocument();

    // Click 100%
    fireEvent.click(screen.getByRole("button", { name: "100%" }));
    expect(usePosStore.getState().zoomMode).toBe("100%");

    // Click 75%
    fireEvent.click(screen.getByRole("button", { name: "75%" }));
    expect(usePosStore.getState().zoomMode).toBe("75%");

    // Click 50%
    fireEvent.click(screen.getByRole("button", { name: "50%" }));
    expect(usePosStore.getState().zoomMode).toBe("50%");

    // Click Fit
    fireEvent.click(screen.getByRole("button", { name: "Fit" }));
    expect(usePosStore.getState().zoomMode).toBe("fit");
  });

  it("toggles the 60ms refresh transition switch", () => {
    render(<ViewControls />);

    const switchBtn = screen.getByRole("switch");
    expect(switchBtn).toHaveAttribute("aria-checked", "true");

    fireEvent.click(switchBtn);
    expect(usePosStore.getState().enableRefreshTransition).toBe(false);
    expect(switchBtn).toHaveAttribute("aria-checked", "false");

    fireEvent.click(switchBtn);
    expect(usePosStore.getState().enableRefreshTransition).toBe(true);
  });
});
