export const colors = {
  primary: {
    main: "#096c9e",
    light: "#0891b2",
    dark: "#075985",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#28a745",
    light: "#34d058",
    dark: "#22863a",
    contrastText: "#ffffff",
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
};

export const gradients = {
  primary: "linear-gradient(135deg, #096c9e 0%, #28a745 50%, #17a2b8 100%)",
  secondary: "linear-gradient(135deg, #28a745 50%, #17a2b8 100%)",
  text: "#f0f0f0",
};

export const shadows = {
  card: "0 8px 32px rgba(0, 0, 0, 0.2)",
  button: "0 4px 12px rgba(9, 108, 158, 0.3)",
  hover: "0 25px 50px -12px rgba(0,0,0,0.25)",
};

export const transitions = {
  default: "all 0.2s ease-in-out",
  smooth: "all 0.3s ease",
};

export const glassEffect = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.2)",
};

export const gpuAcceleration = {
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  perspective: "1000px",
  willChange: "transform, opacity",
};

export const optimizeRendering = {
  ...gpuAcceleration,
  contain: "content",
  containIntrinsicSize: 0,
  contentVisibility: "auto",
};
