export const colors = {
  primary: {
    main: "#ff1493",
    light: "#ff69b4",
    dark: "#dc143c",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#ba55d3",
    light: "#dda0dd",
    dark: "#9932cc",
    contrastText: "#ffffff",
  },
  background: {
    default: "#1a0b2e",
    paper: "rgba(255,255,255,0.1)",
  },
  text: {
    primary: "#ffffff",
    secondary: "rgba(255,192,203,0.8)",
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
  primary: "linear-gradient(45deg, #ff1493 30%, #ba55d3 90%)",
  secondary: "linear-gradient(45deg, #9c27b0, #e91e63)",
  background: "linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%)",
  text: "linear-gradient(45deg, #9c27b0, #e91e63, #2196f3)",
};

export const shadows = {
  card: "0 8px 32px rgba(0, 0, 0, 0.2)",
  button: "0 4px 12px rgba(255, 20, 147, 0.3)",
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
