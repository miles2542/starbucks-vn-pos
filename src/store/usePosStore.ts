import { CATEGORIES } from "@/constants/categories";
import type { BreadcrumbNode, POSState, ZoomMode } from "@/types/pos";
import { create } from "zustand";

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

export const usePosStore = create<POSState>((set, get) => ({
  // App Shell & Viewport
  zoomMode: "fit",
  scale: 1,
  enableRefreshTransition: true,
  isRefreshing: false,

  // Header & Footer info
  terminalId: "M17015 - 17015",
  registerNumber: "0001",
  businessDate: "20260829",
  cashierName: "HAN CHI KIEN",
  currentServeType: "Not Set",

  // Navigation & Category
  activeCategoryId: "hot_esp",
  breadcrumb: [{ label: "HOT ESP", id: "hot_esp" }],
  multiplier: 1,

  // Actions
  setZoomMode: (mode: ZoomMode) => set({ zoomMode: mode }),
  setScale: (scale: number) => set({ scale }),
  setEnableRefreshTransition: (enable: boolean) => set({ enableRefreshTransition: enable }),

  setActiveCategory: (categoryId: string) => {
    const category = CATEGORIES.find((c) => c.id === categoryId);
    const categoryName = category ? category.name : categoryId;
    const newBreadcrumb: BreadcrumbNode[] = [{ label: categoryName, id: categoryId }];

    const { enableRefreshTransition } = get();

    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }

    if (enableRefreshTransition) {
      set({
        isRefreshing: true,
        activeCategoryId: categoryId,
        breadcrumb: newBreadcrumb,
      });

      refreshTimer = setTimeout(() => {
        set({ isRefreshing: false });
        refreshTimer = null;
      }, 60);
    } else {
      set({
        isRefreshing: false,
        activeCategoryId: categoryId,
        breadcrumb: newBreadcrumb,
      });
    }
  },

  setBreadcrumb: (path: BreadcrumbNode[]) => set({ breadcrumb: path }),
  setMultiplier: (multiplier: number) => set({ multiplier }),
  setServeType: (serveType: string) => set({ currentServeType: serveType }),
}));
