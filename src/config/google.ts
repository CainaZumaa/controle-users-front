// Config do Google OAuth
export const GOOGLE_CONFIG = {
  CLIENT_ID:
    process.env.REACT_APP_GOOGLE_CLIENT_ID ||
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    "YOUR_GOOGLE_CLIENT_ID",

  REDIRECT_URIS: [
    "http://localhost:5000",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://localhost:4173",
  ],

  SCOPES: ["openid", "profile", "email"],

  BUTTON_CONFIG: {
    theme: "outline",
    size: "large",
    text: "continue_with",
    shape: "rectangular",
    logo_alignment: "left",
  },
};

export const isGoogleConfigured = (): boolean => {
  return !!(
    GOOGLE_CONFIG.CLIENT_ID &&
    GOOGLE_CONFIG.CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID"
  );
};

export const getUserInfoFromToken = (accessToken: string) => {
  try {
    return {
      access_token: accessToken,
    };
  } catch (error) {
    console.error("Erro ao processar token do Google:", error);
    throw error;
  }
};
