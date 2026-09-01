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
  name: string;
  shortName?: string;
  price?: number;
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

export type ServeType = "Not Set" | "To Go" | "For Here" | "BYO" | "B2BTS";
export type Multiplier = 1 | 2 | 3 | 4;
export type SizeCode = "S" | "T" | "G" | "V";

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

  // Actions
  setZoomMode: (mode: ZoomMode) => void;
  setScale: (scale: number) => void;
  setEnableRefreshTransition: (enable: boolean) => void;
  setActiveCategory: (categoryId: string) => void;
  setActiveSubcategory: (subcategoryId: string | null, label?: string) => void;
  setActiveSize: (size: SizeCode) => void;
  setMultiplier: (multiplier: Multiplier) => void;
  setServeType: (serveType: ServeType) => void;
}
