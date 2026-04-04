/**
 * Global Design Tokens
 *
 * Central source of truth for colors, typography, spacing, and other
 * design values. These mirror tailwind.config.js for use in non-Tailwind
 * contexts (e.g., inline styles, animations, third-party components).
 *
 * Update these values once you receive the Figma design specs.
 */

export const Colors = {
  primary: {
    DEFAULT: "#000000",
    50: "#F5F5F5",
    100: "#E5E5E5",
    200: "#CCCCCC",
    300: "#B3B3B3",
    400: "#999999",
    500: "#808080",
    600: "#666666",
    700: "#4D4D4D",
    800: "#333333",
    900: "#1A1A1A",
  },
  accent: {
    DEFAULT: "#C8A97E",
    light: "#DFC9A8",
    dark: "#A68B5B",
  },
  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",
  background: {
    DEFAULT: "#FFFFFF",
    secondary: "#F9FAFB",
    dark: "#111111",
  },
  text: {
    DEFAULT: "#111111",
    secondary: "#6B7280",
    muted: "#9CA3AF",
    inverse: "#FFFFFF",
  },
} as const;

export const Typography = {
  families: {
    sans: "System",
    heading: "System",
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
  },
  weights: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
