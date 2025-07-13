/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: "#096c9e",
          light: "#0891b2",
          dark: "#075985",
          contrast: "#ffffff",
        },
        secondary: {
          main: "#28a745",
          light: "#34d058",
          dark: "#22863a",
          contrast: "#ffffff",
        },
        text: {
          primary: "#ffffff",
          secondary: "#cfcfcf",
        },
        error: {
          main: "#EF4444",
          light: "#FCA5A5",
          dark: "#B91C1C",
        },
        success: {
          main: "#10B981",
          light: "#6EE7B7",
          dark: "#059669",
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #096c9e 0%, #28a745 50%, #17a2b8 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #28a745 50%, #17a2b8 100%)",
        "gradient-primary-dark":
          "linear-gradient(135deg, #075985 0%, #22863a 50%, #0e7490 100%)",
        "gradient-secondary-dark":
          "linear-gradient(135deg, #22863a 50%, #0e7490 100%)",
        "gradient-text": "#f0f0f0",
        "gradient-button": "linear-gradient(45deg, #ff1493 30%, #ba55d3 90%)",
        "gradient-background":
          "linear-gradient(180deg, #034a6b 0%, #096c9e 30%, #0891b2 60%, #06b6d4 80%, rgba(40, 167, 69, 0.85) 100%)",
      },
      boxShadow: {
        card: "0 8px 32px rgba(0, 0, 0, 0.2)",
        button: "0 4px 12px rgba(9, 108, 158, 0.3)",
        hover: "0 25px 50px -12px rgba(0,0,0,0.25)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.2)",
      },
      backdropBlur: {
        glass: "20px",
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out",
        "scale-in": "scale-in 0.4s ease-out",
        pulse: "pulse 2s infinite",
        fall: "fall 20s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        fall: {
          "0%": {
            transform:
              "translateY(-100vh) translateX(0) rotate(0deg) translateZ(0)",
            opacity: "0",
          },
          "15%": {
            opacity: "0.8",
          },
          "85%": {
            opacity: "0.8",
          },
          "100%": {
            transform:
              "translateY(100vh) translateX(calc(var(--fall-offset, 0) * 1px)) rotate(60deg) translateZ(0)",
            opacity: "0",
          },
        },
        shimmer: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
