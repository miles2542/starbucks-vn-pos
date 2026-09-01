import { CATEGORIES } from "@/constants/categories";
import { MENU_ITEMS_BY_CATEGORY } from "@/constants/menuItems";
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

  clearOrder: () =>
    set({
      orderItems: [],
      selectedOrderItemId: null,
      selectedLineId: null,
    }),

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
    const { orderItems, selectedLineId } = get();
    if (orderItems.length === 0) return;

    const activeLineId = selectedLineId || orderItems[orderItems.length - 1].id;

    // Check if activeLineId is a modifier
    let foundModParentIndex = -1;
    let foundModIndex = -1;

    for (let i = 0; i < orderItems.length; i++) {
      const mIdx = orderItems[i].modifiers.findIndex((m) => m.id === activeLineId);
      if (mIdx !== -1) {
        foundModParentIndex = i;
        foundModIndex = mIdx;
        break;
      }
    }

    if (foundModParentIndex !== -1) {
      const updatedOrderItems = [...orderItems];
      const parent = updatedOrderItems[foundModParentIndex];
      const updatedMods = parent.modifiers.filter((_, idx) => idx !== foundModIndex);
      updatedOrderItems[foundModParentIndex] = {
        ...parent,
        modifiers: updatedMods,
      };

      const nextSelectedLineId =
        foundModIndex > 0 ? updatedMods[foundModIndex - 1].id : parent.id;
      set({
        orderItems: updatedOrderItems,
        selectedLineId: nextSelectedLineId,
        selectedOrderItemId: parent.id,
      });
      return;
    }

    // Otherwise it's a parent beverage / item
    const itemIndex = orderItems.findIndex((item) => item.id === activeLineId);
    if (itemIndex !== -1) {
      const updatedOrderItems = orderItems.filter((_, idx) => idx !== itemIndex);
      let nextSelectedLineId: string | null = null;
      let nextSelectedItemId: string | null = null;

      if (updatedOrderItems.length > 0) {
        const nextIndex = Math.min(itemIndex, updatedOrderItems.length - 1);
        nextSelectedLineId = updatedOrderItems[nextIndex].id;
        nextSelectedItemId = updatedOrderItems[nextIndex].id;
      }

      set({
        orderItems: updatedOrderItems,
        selectedLineId: nextSelectedLineId,
        selectedOrderItemId: nextSelectedItemId,
      });
    }
  },

  changeSelectedItemSize: (newSize: SizeCode) => {
    const { orderItems, selectedLineId } = get();
    if (orderItems.length === 0) return;

    const targetItemIndex = orderItems.findIndex(
      (item) => item.id === selectedLineId || item.modifiers.some((m) => m.id === selectedLineId),
    );
    if (targetItemIndex === -1) return;

    const item = orderItems[targetItemIndex];
    let menuItemDef: MenuItem | undefined;
    for (const catItems of Object.values(MENU_ITEMS_BY_CATEGORY)) {
      const found = catItems.find((m) => m.id === item.menuItemId);
      if (found) {
        menuItemDef = found;
        break;
      }
    }

    const baseName = menuItemDef?.baseName || item.name.replace(/^[STGV]\s+/, "");
    const newDisplayName = `${newSize} ${baseName}`;

    let newUnitPrice = item.unitPrice;
    if (menuItemDef?.prices && menuItemDef.prices[newSize] !== undefined) {
      newUnitPrice = menuItemDef.prices[newSize]!;
    }

    const updatedOrderItems = [...orderItems];
    updatedOrderItems[targetItemIndex] = {
      ...item,
      size: newSize,
      name: newDisplayName,
      unitPrice: newUnitPrice,
      totalPrice: newUnitPrice * item.quantity,
    };

    set({
      orderItems: updatedOrderItems,
      activeSize: newSize,
    });
  },

  moveSelectedLine: (direction: "up" | "down" | "top" | "bottom") => {
    const { orderItems, selectedLineId } = get();
    if (orderItems.length === 0) return;

    const allLines: string[] = [];
    for (const item of orderItems) {
      allLines.push(item.id);
      for (const mod of item.modifiers) {
        allLines.push(mod.id);
      }
    }

    if (allLines.length === 0) return;

    const currentIndex = selectedLineId ? allLines.indexOf(selectedLineId) : -1;
    let nextIndex = 0;

    switch (direction) {
      case "up":
        nextIndex = currentIndex <= 0 ? 0 : currentIndex - 1;
        break;
      case "down":
        nextIndex =
          currentIndex === -1 || currentIndex >= allLines.length - 1
            ? allLines.length - 1
            : currentIndex + 1;
        break;
      case "top":
        nextIndex = 0;
        break;
      case "bottom":
        nextIndex = allLines.length - 1;
        break;
    }

    const nextId = allLines[nextIndex];
    get().selectLine(nextId);
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
