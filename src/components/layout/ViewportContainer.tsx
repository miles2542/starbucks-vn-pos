import { usePosStore } from "@/store/usePosStore";
import React, { useEffect, useRef } from "react";

interface ViewportContainerProps {
  children: React.ReactNode;
}

const VIRTUAL_WIDTH = 1920;
const VIRTUAL_HEIGHT = 1080;

export const ViewportContainer: React.FC<ViewportContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const zoomMode = usePosStore((state) => state.zoomMode);
  const scale = usePosStore((state) => state.scale);
  const setScale = usePosStore((state) => state.setScale);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;

      const windowW = window.innerWidth;
      const windowH = window.innerHeight;

      let newScale = 1;

      if (zoomMode === "fit") {
        const scaleX = windowW / VIRTUAL_WIDTH;
        const scaleY = windowH / VIRTUAL_HEIGHT;
        newScale = Math.min(scaleX, scaleY);
      } else if (zoomMode === "100%") {
        newScale = 1;
      } else if (zoomMode === "75%") {
        newScale = 0.75;
      } else if (zoomMode === "50%") {
        newScale = 0.5;
      }

      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [zoomMode, setScale]);

  return (
    <div
      ref={containerRef}
      data-testid="viewport-outer-container"
      className="w-screen h-screen overflow-hidden bg-neutral-950 flex items-center justify-center relative"
    >
      <div
        data-testid="pos-viewport-canvas"
        style={{
          width: `${VIRTUAL_WIDTH}px`,
          height: `${VIRTUAL_HEIGHT}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
        className="shrink-0 bg-[#e2e8f0] flex flex-col justify-between overflow-hidden shadow-2xl relative"
      >
        {children}
      </div>
    </div>
  );
};
