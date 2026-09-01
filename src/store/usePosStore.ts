import { CATEGORIES } from "@/constants/categories";
import type { BreadcrumbNode, Multiplier, PosState, ServeType, SizeCode, ZoomMode } from "@/types/pos";
import { create } from "zustand";

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

export const usePosStore = create<PosState>((set, get) => ({
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
  activeSubcategoryId: null,
  breadcrumb: [{ label: "HOT ESP", id: "hot_esp" }],
  activeSize: "T",
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

    set({
      isRefreshing: enableRefreshTransition,
      activeCategoryId: categoryId,
      activeSubcategoryId: null,
      breadcrumb: newBreadcrumb,
      activeSize: "T", // Reset size to Tall default on category change
    });

    if (enableRefreshTransition) {
      refreshTimer = setTimeout(() => {
        set({ isRefreshing: false });
        refreshTimer = null;
      }, 60);
    }
  },

  setActiveSubcategory: (subcategoryId: string | null, label?: string) => {
    const { activeCategoryId, breadcrumb } = get();
    if (!subcategoryId) {
      const root = breadcrumb[0] || { label: activeCategoryId, id: activeCategoryId };
      set({ activeSubcategoryId: null, breadcrumb: [root] });
      return;
    }

    const subBreadcrumb: BreadcrumbNode[] = [
      breadcrumb[0] || { label: activeCategoryId, id: activeCategoryId },
      { label: label || subcategoryId, id: subcategoryId },
    ];
    set({ activeSubcategoryId: subcategoryId, breadcrumb: subBreadcrumb });
  },

  setActiveSize: (size: SizeCode) => set({ activeSize: size }),
  setMultiplier: (multiplier: Multiplier) => set({ multiplier }),
  setServeType: (serveType: ServeType) => set({ currentServeType: serveType }),
}));
