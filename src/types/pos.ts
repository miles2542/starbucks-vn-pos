export type ZoomMode = "fit" | "100%" | "75%" | "50%" | "custom";

export type ButtonVariant =
  | "default"
  | "category"
  | "category-green"
  | "category-cyan"
  | "modifier-red"
  | "tender-cyan"
  | "tender-grey"
  | "serve-yellow"
  | "nav-blue"
  | "empty";

export interface CategoryItem {
  id: string;
  code: string;
  name: string;
  row: number; // 1-3
  col: number; // 1-7
  variant?: ButtonVariant;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  subcategoryId?: string;
  name: string;
  baseName?: string;
  hasSizes?: boolean;
  shortName?: string;
  price?: number;
  prices?: Partial<Record<SizeCode, number>>;
  row: number; // 1-6 within 5x6 center grid (or 1-7 in absolute)
  col: number; // 1-5 within 5x6 center grid (or 1-7 in absolute)
  isSubcategory?: boolean;
  stock?: number;
  soldOut?: boolean;
  variant?: ButtonVariant;
}

export interface BreadcrumbNode {
  label: string;
  id?: string;
}

export interface OrderModifier {
  id: string;
  modifierId: string;
  name: string;
  price: number;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  size?: SizeCode;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  modifiers: OrderModifier[];
  serveType?: ServeType;
}

export type ServeType = "Not Set" | "To Go" | "For Here" | "BYO" | "B2BTS";
export type Multiplier = 1 | 2 | 3 | 4;
export type SizeCode = "S" | "T" | "G" | "V";
export type ModalType = "serve_type_all" | "serve_type_item" | "change_size" | null;

export interface PosState {
  // App Shell & Viewport
  zoomMode: ZoomMode;
  scale: number;
  enableRefreshTransition: boolean;
  isRefreshing: boolean;

  // Header & Footer info
  terminalId: string;
  registerNumber: string;
  businessDate: string;
  cashierName: string;
  currentServeType: ServeType;

  // Navigation & Category
  activeCategoryId: string;
  activeSubcategoryId: string | null;
  breadcrumb: BreadcrumbNode[];
  activeSize: SizeCode;
  multiplier: Multiplier;

  // Modifier state
  isModifierMode: boolean;
  activeModifierPage: string | null;

  // Modal state
  activeModal: ModalType;

  // Order List & State
  orderItems: OrderItem[];
  selectedOrderItemId: string | null; // For backward compatibility / alias
  selectedLineId: string | null; // Can be item id or modifier id

  // Actions
  setZoomMode: (mode: ZoomMode) => void;
  setScale: (scale: number) => void;
  setEnableRefreshTransition: (enable: boolean) => void;
  setActiveCategory: (categoryId: string) => void;
  setActiveSubcategory: (subcategoryId: string | null, label?: string) => void;
  setActiveSize: (size: SizeCode) => void;
  setMultiplier: (multiplier: Multiplier) => void;
  setServeType: (serveType: ServeType) => void;
  addOrderItem: (item: MenuItem, size?: SizeCode, quantity?: number) => void;
  selectOrderItem: (id: string | null) => void;
  selectLine: (id: string | null) => void;
  clearOrder: () => void;

  // Modifier actions
  openModifierMode: (page?: string) => void;
  closeModifierMode: () => void;
  setModifierPage: (page: string, label?: string) => void;
  addModifier: (modifier: { id: string; name: string; price: number }) => void;

  // Ticket 06 operations (void, change size, reorder, item serve type, modals)
  voidSelectedLine: () => void;
  changeSelectedItemSize: (newSize: SizeCode) => void;
  moveSelectedLine: (direction: "up" | "down" | "top" | "bottom") => void;
  setItemServeType: (itemId: string, serveType: ServeType) => void;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

