import { CATEGORIES } from "@/constants/categories";
import type { BreadcrumbNode, MenuItem, Multiplier, PosState, ServeType, SizeCode, ZoomMode } from "@/types/pos";
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

  // Order List & State
  orderItems: [],
  selectedOrderItemId: null,

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
    const { activeCategoryId, breadcrumb, enableRefreshTransition } = get();

    if (refreshTimer) {
      clearTimeout(refreshTimer);
      refreshTimer = null;
    }

    if (!subcategoryId) {
      const root = breadcrumb[0] || { label: activeCategoryId, id: activeCategoryId };
      set({
        activeSubcategoryId: null,
        breadcrumb: [root],
        isRefreshing: enableRefreshTransition,
      });
    } else {
      const subBreadcrumb: BreadcrumbNode[] = [
        breadcrumb[0] || { label: activeCategoryId, id: activeCategoryId },
        { label: label || subcategoryId, id: subcategoryId },
      ];
      set({
        activeSubcategoryId: subcategoryId,
        breadcrumb: subBreadcrumb,
        isRefreshing: enableRefreshTransition,
      });
    }

    if (enableRefreshTransition) {
      refreshTimer = setTimeout(() => {
        set({ isRefreshing: false });
        refreshTimer = null;
      }, 60);
    }
  },

  setActiveSize: (size: SizeCode) => set({ activeSize: size }),
  setMultiplier: (multiplier: Multiplier) => set({ multiplier }),
  setServeType: (serveType: ServeType) => set({ currentServeType: serveType }),

  addOrderItem: (item: MenuItem, size?: SizeCode, quantity?: number) => {
    const currentSize = size || get().activeSize;
    const currentMultiplier = quantity !== undefined ? quantity : get().multiplier;
    const qty = Math.max(1, currentMultiplier);

    const displayName =
      item.hasSizes || /^[STGV]\s+/.test(item.name)
        ? `${currentSize} ${item.baseName || item.name.replace(/^[STGV]\s+/, "")}`
        : item.name;

    const unitPrice =
      item.hasSizes && item.prices?.[currentSize] !== undefined
        ? item.prices[currentSize]!
        : item.price ?? 0;

    const newItemId = `order-item-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newOrderItem = {
      id: newItemId,
      menuItemId: item.id,
      name: displayName,
      size: item.hasSizes ? currentSize : undefined,
      quantity: qty,
      unitPrice,
      totalPrice: unitPrice * qty,
    };

    set((state) => ({
      orderItems: [...state.orderItems, newOrderItem],
      selectedOrderItemId: newItemId,
      multiplier: 1, // Reset multiplier after item addition
    }));
  },

  selectOrderItem: (id: string | null) => set({ selectedOrderItemId: id }),
  clearOrder: () => set({ orderItems: [], selectedOrderItemId: null }),
}));

