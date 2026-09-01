import { usePosStore } from "@/store/usePosStore";
import type { ZoomMode } from "@/types/pos";
import { ChevronDown, ChevronUp, Eye, RefreshCw, ZoomIn } from "lucide-react";
import React, { useState } from "react";

export const ViewControls: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const zoomMode = usePosStore((state) => state.zoomMode);
  const scale = usePosStore((state) => state.scale);
  const enableRefreshTransition = usePosStore((state) => state.enableRefreshTransition);

  const setZoomMode = usePosStore((state) => state.setZoomMode);
  const setEnableRefreshTransition = usePosStore((state) => state.setEnableRefreshTransition);

  const zoomOptions: { label: string; mode: ZoomMode }[] = [
    { label: "Fit", mode: "fit" },
    { label: "100%", mode: "100%" },
    { label: "75%", mode: "75%" },
    { label: "50%", mode: "50%" },
  ];

  return (
    <div
      data-testid="view-controls"
      className="fixed bottom-4 right-4 z-50 bg-neutral-900/90 backdrop-blur border border-neutral-700 text-neutral-100 rounded-lg shadow-2xl p-2.5 transition-all text-xs select-none"
    >
      {/* Header bar of floating controls */}
      <div className="flex items-center justify-between gap-3 pb-1 border-b border-neutral-700/60 font-semibold">
        <div className="flex items-center gap-1.5 text-neutral-300">
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span>Viewport & Debug</span>
        </div>
        <button
          type="button"
          aria-label={isCollapsed ? "Expand debug controls" : "Collapse debug controls"}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200"
        >
          {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {!isCollapsed && (
        <div className="mt-2 flex flex-col gap-2.5">
          {/* Zoom Modes */}
          <div>
            <div className="flex items-center justify-between mb-1.5 text-neutral-400">
              <span className="flex items-center gap-1">
                <ZoomIn className="w-3 h-3" /> Zoom Scale:
              </span>
              <span className="font-mono text-sky-400 font-bold">{Math.round(scale * 100)}%</span>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {zoomOptions.map((opt) => (
                <button
                  key={opt.mode}
                  type="button"
                  onClick={() => setZoomMode(opt.mode)}
                  className={`px-2 py-1 rounded text-center font-bold text-xs transition-colors ${
                    zoomMode === opt.mode
                      ? "bg-sky-600 text-white shadow"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 60ms Transition Toggle */}
          <div className="flex items-center justify-between gap-3 pt-1 border-t border-neutral-800">
            <span className="flex items-center gap-1 text-neutral-300">
              <RefreshCw className="w-3 h-3 text-amber-400" />
              <span>~60ms Cell Refresh</span>
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={enableRefreshTransition}
              onClick={() => setEnableRefreshTransition(!enableRefreshTransition)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                enableRefreshTransition ? "bg-emerald-600" : "bg-neutral-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  enableRefreshTransition ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
