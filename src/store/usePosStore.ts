import { CATEGORIES } from "@/constants/categories";
import {
  changeDrinkSizeInOrder,
  reorderDrinkInList,
  updateQuantityInOrder,
  voidLineInOrder,
} from "@/store/orderOperations";
import {
  formatOrderNumber,
  getInitialOrderSequence,
  incrementOrderSequence,
} from "@/store/orderSequence";
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

const REFRESH_DURATION_MS = 100;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

const initialSequence = getInitialOrderSequence();

const triggerRefresh = (
  set: (fn: (state: PosState) => Partial<PosState>) => void,
  get: () => PosState,
  partialState: Partial<PosState>,
) => {
  const { enableRefreshTransition } = get();
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
  set(() => ({
    ...partialState,
    isRefreshing: enableRefreshTransition,
  }));
  if (enableRefreshTransition) {
    refreshTimer = setTimeout(() => {
      set(() => ({ isRefreshing: false }));
      refreshTimer = null;
    }, REFRESH_DURATION_MS);
  }
};

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

  // Payment state
  isPaymentMode: false,
  activePaymentTab: "normal_payment",

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
    triggerRefresh(set, get, {
      activeCategoryId: categoryId,
      activeSubcategoryId: null,
      isModifierMode: false,
      activeModifierPage: null,
      breadcrumb: [{ label: categoryName, id: categoryId }],
      activeSize: "T", // Reset size to Tall default on category change
    });
  },

  setActiveSubcategory: (subcategoryId: string | null, label?: string) => {
    const { activeCategoryId, breadcrumb } = get();

    if (!subcategoryId) {
      const root = breadcrumb[0] || { label: activeCategoryId, id: activeCategoryId };
      triggerRefresh(set, get, {
        activeSubcategoryId: null,
        isModifierMode: false,
        activeModifierPage: null,
        breadcrumb: [root],
      });
    } else {
      const subBreadcrumb: BreadcrumbNode[] = [
        breadcrumb[0] || { label: activeCategoryId, id: activeCategoryId },
        { label: label || subcategoryId, id: subcategoryId },
      ];
      triggerRefresh(set, get, {
        activeSubcategoryId: subcategoryId,
        isModifierMode: false,
        activeModifierPage: null,
        breadcrumb: subBreadcrumb,
      });
    }
  },

  setActiveSize: (size: SizeCode) => {
    triggerRefresh(set, get, { activeSize: size });
  },

  setMultiplier: (multiplier: Multiplier) => {
    triggerRefresh(set, get, { multiplier });
  },

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

    triggerRefresh(set, get, {
      isModifierMode: true,
      activeModifierPage: page,
      breadcrumb: [...baseBreadcrumb, { label: "Modifier", id: "modifier_root" }],
    });
  },

  closeModifierMode: () => {
    const { activeCategoryId } = get();
    const category = CATEGORIES.find((c) => c.id === activeCategoryId);
    const categoryName = category ? category.name : activeCategoryId;
    triggerRefresh(set, get, {
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

    triggerRefresh(set, get, {
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

  // Payment actions
  enterPaymentMode: () => {
    const { orderItems } = get();
    if (orderItems.length === 0) return;
    triggerRefresh(set, get, {
      isPaymentMode: true,
      activePaymentTab: "normal_payment",
      breadcrumb: [{ label: "Normal Payment", id: "normal_payment" }],
    });
  },

  exitPaymentMode: () => {
    const { activeCategoryId } = get();
    const category = CATEGORIES.find((c) => c.id === activeCategoryId);
    const categoryName = category ? category.name : activeCategoryId;
    triggerRefresh(set, get, {
      isPaymentMode: false,
      breadcrumb: [{ label: categoryName, id: activeCategoryId }],
    });
  },

  setPaymentTab: (tab: "normal_payment" | "coupon" | "overseas_discount") => {
    let label = "Normal Payment";
    if (tab === "coupon") label = "COUPON";
    else if (tab === "overseas_discount") label = "Overseas Discount";

    triggerRefresh(set, get, {
      activePaymentTab: tab,
      breadcrumb: [{ label, id: tab }],
    });
  },

  completePayment: () => {
    const { orderSequence, activeCategoryId } = get();
    const next = incrementOrderSequence(orderSequence);
    const category = CATEGORIES.find((c) => c.id === activeCategoryId);
    const categoryName = category ? category.name : activeCategoryId;

    triggerRefresh(set, get, {
      orderItems: [],
      selectedOrderItemId: null,
      selectedLineId: null,
      orderSequence: next.orderSequence,
      orderNumber: next.orderNumber,
      isPaymentMode: false,
      breadcrumb: [{ label: categoryName, id: activeCategoryId }],
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

  setItemServeType: (itemId: string, serveType?: ServeType | "Reset") => {
    const { orderItems } = get();
    const updatedOrderItems = orderItems.map((item) =>
      item.id === itemId
        ? { ...item, serveType: serveType === "Reset" || !serveType ? undefined : serveType }
        : item,
    );
    set({ orderItems: updatedOrderItems });
  },

  updateItemQuantity: (lineId: string, quantity: number) => {
    const { orderItems } = get();
    const updated = updateQuantityInOrder(orderItems, lineId, quantity);
    set({ orderItems: updated });
  },

  openModal: (modal: ModalType) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
