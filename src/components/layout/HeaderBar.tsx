import { usePosStore } from "@/store/usePosStore";
import { Calendar, Monitor, Store } from "lucide-react";
import React, { useEffect, useState } from "react";

export const HeaderBar: React.FC = () => {
  const terminalId = usePosStore((state) => state.terminalId);
  const registerNumber = usePosStore((state) => state.registerNumber);

  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header
      data-testid="header-bar"
      className="h-[36px] bg-[#f1f3f6] border-b border-[#cbd5e1] flex items-center justify-between px-3 text-[#1e293b] text-xs font-semibold select-none shrink-0"
    >
      {/* Left: Terminal Info */}
      <div className="flex items-center gap-1.5">
        <Store className="w-4 h-4 text-[#ea580c]" />
        <span className="tracking-tight text-neutral-800 font-bold">{terminalId}</span>
      </div>

      {/* Center: Live Date & Time */}
      <div className="flex items-center gap-1.5 font-medium text-neutral-700">
        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
        <span data-testid="live-timestamp">{currentTime || "2026/08/29 12:00:00"}</span>
      </div>

      {/* Right: Register Number */}
      <div className="flex items-center gap-1.5">
        <Monitor className="w-4 h-4 text-blue-600" />
        <span className="font-bold text-neutral-800 tracking-wider">{registerNumber}</span>
      </div>
    </header>
  );
};
