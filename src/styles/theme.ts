// Tipos para o tema
interface ColorPalette {
  main: string;
  light: string;
  dark: string;
  contrast?: string;
}

interface TextColors {
  primary: string;
  secondary: string;
}

interface Gradients {
  primary: string;
  secondary: string;
  text: string;
}

interface Shadows {
  card: string;
  button: string;
  hover: string;
}

interface Transitions {
  default: string;
  smooth: string;
}

interface GlassEffect {
  background: string;
  backdropFilter: string;
  border: string;
}

interface GPUAcceleration {
  transform: string;
  backfaceVisibility: string;
  perspective: string;
  willChange: string;
}

interface OptimizeRendering extends GPUAcceleration {
  contain: string;
  containIntrinsicSize: number;
  contentVisibility: string;
}

// Cores do design system (para referência)
export const colors = {
  primary: {
    main: "#096c9e",
    light: "#0891b2",
    dark: "#075985",
    contrast: "#ffffff",
  } as ColorPalette,
  secondary: {
    main: "#28a745",
    light: "#34d058",
    dark: "#22863a",
    contrast: "#ffffff",
  } as ColorPalette,
  text: {
    primary: "#ffffff",
    secondary: "#cfcfcf",
  } as TextColors,
  error: {
    main: "#EF4444",
    light: "#FCA5A5",
    dark: "#B91C1C",
  } as ColorPalette,
  success: {
    main: "#10B981",
    light: "#6EE7B7",
    dark: "#059669",
  } as ColorPalette,
  warning: {
    main: "#F59E0B",
    light: "#FCD34D",
    dark: "#D97706",
  } as ColorPalette,
  info: {
    main: "#3B82F6",
    light: "#93C5FD",
    dark: "#1D4ED8",
  } as ColorPalette,
};

// Gradientes (para referência)
export const gradients: Gradients = {
  primary: "linear-gradient(135deg, #096c9e 0%, #28a745 50%, #17a2b8 100%)",
  secondary: "linear-gradient(135deg, #28a745 50%, #17a2b8 100%)",
  text: "#f0f0f0",
};

// Sombras (para referência)
export const shadows: Shadows = {
  card: "0 8px 32px rgba(0, 0, 0, 0.2)",
  button: "0 4px 12px rgba(9, 108, 158, 0.3)",
  hover: "0 25px 50px -12px rgba(0,0,0,0.25)",
};

// Transições (para referência)
export const transitions: Transitions = {
  default: "all 0.2s ease-in-out",
  smooth: "all 0.3s ease",
};

// Efeitos (para referência)
export const glassEffect: GlassEffect = {
  background: "rgba(255,255,255,0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.1)",
};

// Otimizações de renderização (para referência)
export const gpuAcceleration: GPUAcceleration = {
  transform: "translateZ(0)",
  backfaceVisibility: "hidden",
  perspective: "1000px",
  willChange: "transform, opacity",
};

export const optimizeRendering: OptimizeRendering = {
  ...gpuAcceleration,
  contain: "content",
  containIntrinsicSize: 0,
  contentVisibility: "auto",
};
