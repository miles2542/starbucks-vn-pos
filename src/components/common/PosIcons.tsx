import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Section IV Reorder Arrow: Single Up
 * Bright cyan background with thick golden-yellow arrow
 */
export const ArrowUpSingleIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    data-testid="icon-arrow-up-single"
    {...props}
  >
    <path
      d="M12 4L4 14H9V20H15V14H20L12 4Z"
      fill="#d1a655"
      stroke="#b58c3f"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Section IV Reorder Arrow: Double Up (Top)
 */
export const ArrowUpDoubleIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    data-testid="icon-arrow-up-double"
    {...props}
  >
    <path
      d="M12 2L4 10H8.5V14H15.5V10H20L12 2Z"
      fill="#d1a655"
      stroke="#b58c3f"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M12 11L5 18H8.5V22H15.5V18H19L12 11Z"
      fill="#d1a655"
      stroke="#b58c3f"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Section IV Reorder Arrow: Double Down (Bottom)
 */
export const ArrowDownDoubleIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    data-testid="icon-arrow-down-double"
    {...props}
  >
    <path
      d="M12 13L5 6H8.5V2H15.5V6H19L12 13Z"
      fill="#d1a655"
      stroke="#b58c3f"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M12 22L4 14H8.5V10H15.5V14H20L12 22Z"
      fill="#d1a655"
      stroke="#b58c3f"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Section IV Reorder Arrow: Single Down
 */
export const ArrowDownSingleIcon: React.FC<IconProps> = ({
  className = "w-5 h-5",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    data-testid="icon-arrow-down-single"
    {...props}
  >
    <path
      d="M12 20L4 10H9V4H15V10H20L12 20Z"
      fill="#d1a655"
      stroke="#b58c3f"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Section IV Bottom-Right Action Button: Deep Royal Blue Right Arrow
 */
export const NavArrowRightIcon: React.FC<IconProps> = ({
  className = "w-8 h-8",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    data-testid="icon-nav-arrow-right"
    {...props}
  >
    <path
      d="M4 8H13V3L22 12L13 21V16H4V8Z"
      fill="#0255c3"
      stroke="#003874"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Header Store House Icon
 */
export const StoreHouseIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    data-testid="icon-store-house"
    {...props}
  >
    <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" fill="#ea580c" fillOpacity="0.2" stroke="#ea580c" />
    <path d="M9 21V12H15V21" stroke="#ea580c" />
  </svg>
);

/**
 * Header Wi-Fi / Network Signal Bars Icon
 */
export const WifiSignalIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    data-testid="icon-wifi-signal"
    {...props}
  >
    <rect x="3" y="16" width="3" height="5" rx="0.5" fill="#059669" />
    <rect x="8" y="12" width="3" height="9" rx="0.5" fill="#059669" />
    <rect x="13" y="8" width="3" height="13" rx="0.5" fill="#059669" />
    <rect x="18" y="4" width="3" height="17" rx="0.5" fill="#059669" />
  </svg>
);

/**
 * Header Register / Terminal Battery / Drawer Icon
 */
export const RegisterDrawerIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    data-testid="icon-register-drawer"
    {...props}
  >
    <rect x="2" y="3" width="20" height="13" rx="2" fill="#2563eb" fillOpacity="0.15" stroke="#2563eb" />
    <path d="M2 18H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V18Z" fill="#2563eb" stroke="#2563eb" />
    <circle cx="12" cy="19.5" r="0.8" fill="#ffffff" />
  </svg>
);

/**
 * Footer Cashier User Silhouette Icon
 */
export const CashierUserIcon: React.FC<IconProps> = ({
  className = "w-3.5 h-3.5",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    data-testid="icon-cashier-user"
    {...props}
  >
    <path
      d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
      fill="#0f766e"
    />
  </svg>
);

/**
 * Header Calendar Date Icon
 */
export const CalendarIcon: React.FC<IconProps> = ({
  className = "w-4 h-4",
  ...props
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    data-testid="icon-calendar"
    {...props}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

