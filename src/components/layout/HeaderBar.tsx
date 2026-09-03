import {
  RegisterDrawerIcon,
  StoreHouseIcon,
  WifiSignalIcon,
} from "@/components/common/PosIcons";
import { usePosStore } from "@/store/usePosStore";
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
      className="h-[36px] bg-[#aeaeb0] border-b border-[#8e8e90] flex items-center justify-between px-3 text-[#000000] text-xs font-semibold select-none shrink-0"
    >
      {/* Left: Terminal Info */}
      <div className="flex items-center gap-1.5">
        <StoreHouseIcon className="w-4 h-4 text-[#ea580c]" />
        <span className="tracking-tight text-neutral-800 font-bold">{terminalId}</span>
      </div>

      {/* Center: Live Date & Time + Wi-Fi */}
      <div className="flex items-center gap-1.5 font-medium text-neutral-700">
        <WifiSignalIcon className="w-4 h-4" />
        <span data-testid="live-timestamp">{currentTime || "2026/08/29 12:00:00"}</span>
      </div>

      {/* Right: Register Number */}
      <div className="flex items-center gap-1.5">
        <RegisterDrawerIcon className="w-4 h-4 text-blue-600" />
        <span className="font-bold text-neutral-800 tracking-wider">{registerNumber}</span>
      </div>
    </header>
  );
};
