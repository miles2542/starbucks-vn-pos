import { CATEGORIES } from "@/constants/categories";
import {
  formatOrderNumber,
  getInitialOrderSequence,
  incrementOrderSequence,
} from "@/store/orderSequence";
import {
  changeDrinkSizeInOrder,
  reorderDrinkInList,
  voidLineInOrder,
} from "@/store/orderOperations";
import type {
  BreadcrumbNode,
  MenuItem,
  ModalType,
  Multiplier,
  OrderModifier,
  OrderItem,
  PosState,
  ServeType,
  SizeCode,
  ZoomMode,
} from "@/types/pos";
import { create } from "zustand";

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

const initialSequence = getInitialOrderSequence();

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

  // Modifier state
  isModifierMode: false,
  activeModifierPage: null,

  // Modal state
  activeModal: null,

  // Order List & State
  orderItems: [],
  selectedOrderItemId: null,
  selectedLineId: null,

  // Order Number & Sequence
  orderSequence: initialSequence,
  orderNumber: formatOrderNumber(initialSequence),

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
      isModifierMode: false,
      activeModifierPage: null,
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
        isModifierMode: false,
        activeModifierPage: null,
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
        isModifierMode: false,
        activeModifierPage: null,
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
    const newOrderItem: OrderItem = {
      id: newItemId,
      menuItemId: item.id,
      name: displayName,
      size: item.hasSizes ? currentSize : undefined,
      quantity: qty,
      unitPrice,
      totalPrice: unitPrice * qty,
      modifiers: [],
    };

    set((state) => ({
      orderItems: [...state.orderItems, newOrderItem],
      selectedOrderItemId: newItemId,
      selectedLineId: newItemId,
      multiplier: 1, // Reset multiplier after item addition
    }));
  },

  selectOrderItem: (id: string | null) => {
    set({ selectedOrderItemId: id, selectedLineId: id });
  },

  selectLine: (id: string | null) => {
    if (!id) {
      set({ selectedLineId: null, selectedOrderItemId: null });
      return;
    }
    const { orderItems } = get();
    const parentItem = orderItems.find(
      (item) => item.id === id || item.modifiers.some((m) => m.id === id),
    );
    set({
      selectedLineId: id,
      selectedOrderItemId: parentItem ? parentItem.id : id,
    });
  },

  clearOrder: () => {
    const { orderItems, orderSequence } = get();
    if (orderItems.length > 0) {
      const next = incrementOrderSequence(orderSequence);
      set({
        orderItems: [],
        selectedOrderItemId: null,
        selectedLineId: null,
        orderSequence: next.orderSequence,
        orderNumber: next.orderNumber,
      });
    } else {
      set({
        orderItems: [],
        selectedOrderItemId: null,
        selectedLineId: null,
      });
    }
  },

  openModifierMode: (page = "root") => {
    const { orderItems, selectedLineId, breadcrumb } = get();
    const activeItem =
      orderItems.find(
        (item) => item.id === selectedLineId || item.modifiers.some((m) => m.id === selectedLineId),
      ) || (orderItems.length > 0 ? orderItems[orderItems.length - 1] : null);

    const baseBreadcrumb = activeItem
      ? [{ label: activeItem.name, id: activeItem.id }]
      : [breadcrumb[0] || { label: "HOT ESP", id: "hot_esp" }];

    set({
      isModifierMode: true,
      activeModifierPage: page,
      breadcrumb: [...baseBreadcrumb, { label: "Modifier", id: "modifier_root" }],
    });
  },

  closeModifierMode: () => {
    const { activeCategoryId } = get();
    const category = CATEGORIES.find((c) => c.id === activeCategoryId);
    const categoryName = category ? category.name : activeCategoryId;
    set({
      isModifierMode: false,
      activeModifierPage: null,
      breadcrumb: [{ label: categoryName, id: activeCategoryId }],
    });
  },

  setModifierPage: (page: string, label?: string) => {
    const { breadcrumb } = get();
    const root = breadcrumb[0] || { label: "Modifier", id: "modifier_root" };
    let pageLabel = label;
    if (!pageLabel) {
      if (page === "root") pageLabel = "Modifier";
      else if (page.startsWith("sauce_topping")) pageLabel = "Sauce/Topping";
      else pageLabel = page.charAt(0).toUpperCase() + page.slice(1);
    }

    set({
      activeModifierPage: page,
      breadcrumb:
        page === "root"
          ? [root, { label: "Modifier", id: "modifier_root" }]
          : [root, { label: pageLabel, id: page }],
    });
  },

  addModifier: (modifier: { id: string; name: string; price: number }) => {
    const { orderItems, selectedLineId } = get();
    if (orderItems.length === 0) return;

    let targetItemIndex = -1;
    if (selectedLineId) {
      targetItemIndex = orderItems.findIndex(
        (item) => item.id === selectedLineId || item.modifiers.some((m) => m.id === selectedLineId),
      );
    }
    if (targetItemIndex === -1) {
      targetItemIndex = orderItems.length - 1;
    }

    const newModId = `mod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newMod: OrderModifier = {
      id: newModId,
      modifierId: modifier.id,
      name: modifier.name,
      price: modifier.price,
    };

    const updatedOrderItems = [...orderItems];
    const targetItem = updatedOrderItems[targetItemIndex];
    updatedOrderItems[targetItemIndex] = {
      ...targetItem,
      modifiers: [...targetItem.modifiers, newMod],
    };

    set({
      orderItems: updatedOrderItems,
      selectedLineId: newModId,
      selectedOrderItemId: targetItem.id,
    });
  },

  voidSelectedLine: () => {
    const { orderItems, selectedLineId, orderSequence } = get();
    const result = voidLineInOrder(orderItems, selectedLineId);

    if (result.wasEmptied) {
      const next = incrementOrderSequence(orderSequence);
      set({
        orderItems: result.updatedOrderItems,
        selectedLineId: result.nextSelectedLineId,
        selectedOrderItemId: result.nextSelectedItemId,
        orderSequence: next.orderSequence,
        orderNumber: next.orderNumber,
      });
    } else {
      set({
        orderItems: result.updatedOrderItems,
        selectedLineId: result.nextSelectedLineId,
        selectedOrderItemId: result.nextSelectedItemId,
      });
    }
  },

  changeSelectedItemSize: (newSize: SizeCode) => {
    const { orderItems, selectedLineId } = get();
    const updated = changeDrinkSizeInOrder(orderItems, selectedLineId, newSize);
    set({
      orderItems: updated,
      activeSize: newSize,
    });
  },

  reorderDrink: (direction: "up" | "down" | "top" | "bottom") => {
    const { orderItems, selectedLineId } = get();
    const updated = reorderDrinkInList(orderItems, selectedLineId, direction);
    set({ orderItems: updated });
  },

  moveSelectedLine: (direction: "up" | "down" | "top" | "bottom") => {
    // Delegates to reorderDrink as per Ticket 07 specs
    get().reorderDrink(direction);
  },

  setItemServeType: (itemId: string, serveType: ServeType) => {
    const { orderItems } = get();
    const updatedOrderItems = orderItems.map((item) =>
      item.id === itemId ? { ...item, serveType } : item,
    );
    set({ orderItems: updatedOrderItems });
  },

  openModal: (modal: ModalType) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
