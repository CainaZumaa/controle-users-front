"use client";

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SpaceLogin from "../components/SpaceLogin";
import { GOOGLE_CONFIG } from "../config/google";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fefefe",
      light: "#FF3333",
      dark: "#CC0000",
      contrastText: "#ffffff",
    },
    error: {
      main: "#EF4444", // Erro
      light: "#FCA5A5", // Vermelho claro
      dark: "#B91C1C", // Vermelho escuro
    },
    success: {
      main: "#10B981", // Sucesso
      light: "#6EE7B7", // Verde claro
      dark: "#059669", // Verde escuro
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600, // semi-negrito - subtítulos
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 300, // textos menores
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 11,
  },
  components: {
    // Personalização dos componentes
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          transition: "all 0.2s ease-in-out", // Animação
          fontWeight: 600,
          "&:hover": {
            transform: "translateY(-2px)", // flutuação no hover
            boxShadow: "0 4px 12px rgba(255, 0, 0, 0.3)", // dark shadow
          },
        },
        contained: {
          // gradiente nos botões
          background: "linear-gradient(45deg, #ff1493 30%, #ba55d3 90%)",
          boxShadow: "0 2px 8px rgba(255, 20, 147, 0.2)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backdropFilter: "blur(20px)", // card fosco
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            transition: "all 0.2s ease-in-out",
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CONFIG.CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SpaceLogin />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
