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
        bg: {
          primary: "#050404",
        },
        surface: "#2E1C2B",
        accent: {
          DEFAULT: "#4A1942",
          gradient: {
            start: "#2E1C2B",
            end: "#4A1942",
          },
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
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
