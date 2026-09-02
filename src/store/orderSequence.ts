const STORAGE_KEY = "onepos_order_seq";
const DEFAULT_SEQUENCE = 2787;

/**
 * Format a sequence number as a 10-digit OnePOS order number (e.g. 2787 -> "0100002787").
 */
export const formatOrderNumber = (sequence: number): string => {
  return `010000${String(sequence).padStart(4, "0")}`;
};

/**
 * Read the current sequence number from localStorage, defaulting to 2787 if absent.
 */
export const getInitialOrderSequence = (): number => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = Number.parseInt(stored, 10);
        if (!Number.isNaN(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Ignore localStorage access errors (e.g. privacy mode)
    }
  }
  return DEFAULT_SEQUENCE;
};

/**
 * Persist sequence number to localStorage.
 */
export const saveOrderSequence = (sequence: number): void => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(sequence));
    } catch {
      // Ignore localStorage access errors
    }
  }
};

/**
 * Increments order sequence counter, persists to localStorage, and returns new sequence and order number.
 */
export const incrementOrderSequence = (
  currentSequence: number,
): { orderSequence: number; orderNumber: string } => {
  const nextSequence = currentSequence + 1;
  saveOrderSequence(nextSequence);
  return {
    orderSequence: nextSequence,
    orderNumber: formatOrderNumber(nextSequence),
  };
};
