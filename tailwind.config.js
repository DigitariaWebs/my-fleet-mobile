/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary brand colors — will be updated from Figma specs
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
        // Accent color — will be updated from Figma specs
        accent: {
          DEFAULT: "#C8A97E",
          light: "#DFC9A8",
          dark: "#A68B5B",
        },
        // Semantic colors
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        // Background colors
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#F9FAFB",
          dark: "#111111",
        },
        // Text colors
        text: {
          DEFAULT: "#111111",
          secondary: "#6B7280",
          muted: "#9CA3AF",
          inverse: "#FFFFFF",
        },
      },
      fontFamily: {
        // Font families — will be updated from Figma specs
        sans: ["System"],
        heading: ["System"],
      },
      spacing: {
        // Custom spacing tokens if needed
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
