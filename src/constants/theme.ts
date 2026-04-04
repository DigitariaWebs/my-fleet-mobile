/**
 * MyFleet Design Tokens
 * Dark luxury theme — mirrors tailwind.config.js for inline style usage.
 */

export const Colors = {
  bg: {
    primary: "#050404",
  },
  surface: "#2E1C2B",
  accent: {
    DEFAULT: "#4A1942",
    gradientStart: "#2E1C2B",
    gradientEnd: "#4A1942",
  },
  text: {
    primary: "#EAEAEA",
    secondary: "rgba(234, 234, 234, 0.6)",
    muted: "rgba(234, 234, 234, 0.4)",
  },
  border: {
    DEFAULT: "rgba(234, 234, 234, 0.1)",
    focus: "#4A1942",
  },
  success: "#2ECC71",
  warning: "#F39C12",
  error: "#E74C3C",
  star: "#F1C40F",
} as const;

export const Typography = {
  families: {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    semibold: "Poppins_600SemiBold",
    bold: "Poppins_700Bold",
  },
  sizes: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    "2xl": 24,
    "3xl": 26,
    "4xl": 32,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;
