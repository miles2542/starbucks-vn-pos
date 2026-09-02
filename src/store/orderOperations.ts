import { MENU_ITEMS_BY_CATEGORY } from "@/constants/menuItems";
import type { MenuItem, OrderItem, SizeCode } from "@/types/pos";

/**
 * Reorders a parent drink in orderItems while keeping child modifiers attached.
 * If a child modifier is selected, the reorder applies to its parent drink.
 */
export const reorderDrinkInList = (
  orderItems: OrderItem[],
  selectedLineId: string | null,
  direction: "up" | "down" | "top" | "bottom",
): OrderItem[] => {
  if (orderItems.length <= 1 || !selectedLineId) {
    return orderItems;
  }

  const targetIndex = orderItems.findIndex(
    (item) =>
      item.id === selectedLineId || item.modifiers.some((m) => m.id === selectedLineId),
  );

  if (targetIndex === -1) {
    return orderItems;
  }

  const nextItems = [...orderItems];
  const [targetItem] = nextItems.splice(targetIndex, 1);

  let newIndex = targetIndex;
  switch (direction) {
    case "up":
      newIndex = Math.max(0, targetIndex - 1);
      break;
    case "down":
      newIndex = Math.min(orderItems.length - 1, targetIndex + 1);
      break;
    case "top":
      newIndex = 0;
      break;
    case "bottom":
      newIndex = orderItems.length - 1;
      break;
  }

  nextItems.splice(newIndex, 0, targetItem);
  return nextItems;
};

/**
 * Voids the currently selected line (modifier or parent drink).
 * Returns the updated order items, next selected line IDs, and whether the order became completely empty.
 */
export const voidLineInOrder = (
  orderItems: OrderItem[],
  selectedLineId: string | null,
): {
  updatedOrderItems: OrderItem[];
  nextSelectedLineId: string | null;
  nextSelectedItemId: string | null;
  wasEmptied: boolean;
} => {
  if (orderItems.length === 0) {
    return {
      updatedOrderItems: [],
      nextSelectedLineId: null,
      nextSelectedItemId: null,
      wasEmptied: false,
    };
  }

  const activeLineId = selectedLineId || orderItems[orderItems.length - 1].id;

  // 1. Check if activeLineId is a child modifier
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

    return {
      updatedOrderItems,
      nextSelectedLineId,
      nextSelectedItemId: parent.id,
      wasEmptied: false,
    };
  }

  // 2. Otherwise it's a parent beverage / item
  const itemIndex = orderItems.findIndex((item) => item.id === activeLineId);
  if (itemIndex === -1) {
    return {
      updatedOrderItems: orderItems,
      nextSelectedLineId: selectedLineId,
      nextSelectedItemId: selectedLineId,
      wasEmptied: false,
    };
  }

  const updatedOrderItems = orderItems.filter((_, idx) => idx !== itemIndex);
  let nextSelectedLineId: string | null = null;
  let nextSelectedItemId: string | null = null;

  if (updatedOrderItems.length > 0) {
    const nextIndex = Math.min(itemIndex, updatedOrderItems.length - 1);
    nextSelectedLineId = updatedOrderItems[nextIndex].id;
    nextSelectedItemId = updatedOrderItems[nextIndex].id;
  }

  return {
    updatedOrderItems,
    nextSelectedLineId,
    nextSelectedItemId,
    wasEmptied: updatedOrderItems.length === 0,
  };
};

/**
 * Changes the size of the selected parent drink.
 */
export const changeDrinkSizeInOrder = (
  orderItems: OrderItem[],
  selectedLineId: string | null,
  newSize: SizeCode,
): OrderItem[] => {
  if (orderItems.length === 0) return orderItems;

  const targetItemIndex = orderItems.findIndex(
    (item) =>
      item.id === selectedLineId || item.modifiers.some((m) => m.id === selectedLineId),
  );
  if (targetItemIndex === -1) return orderItems;

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

  return updatedOrderItems;
};

/**
 * Updates the quantity of a selected parent drink or modifier.
 * Recalculates totalPrice accordingly.
 */
export const updateQuantityInOrder = (
  orderItems: OrderItem[],
  selectedLineId: string | null,
  quantity: number,
): OrderItem[] => {
  if (orderItems.length === 0 || !selectedLineId || quantity < 1) {
    return orderItems;
  }

  // 1. Check if modifier
  for (let i = 0; i < orderItems.length; i++) {
    const modIdx = orderItems[i].modifiers.findIndex((m) => m.id === selectedLineId);
    if (modIdx !== -1) {
      const parent = orderItems[i];
      const updatedMods = parent.modifiers.map((m, idx) =>
        idx === modIdx ? { ...m, quantity } : m,
      );
      const updated = [...orderItems];
      updated[i] = { ...parent, modifiers: updatedMods };
      return updated;
    }
  }

  // 2. Check if parent drink
  const itemIndex = orderItems.findIndex((item) => item.id === selectedLineId);
  if (itemIndex !== -1) {
    const item = orderItems[itemIndex];
    const updated = [...orderItems];
    updated[itemIndex] = {
      ...item,
      quantity,
      totalPrice: item.unitPrice * quantity,
    };
    return updated;
  }

  return orderItems;
};
