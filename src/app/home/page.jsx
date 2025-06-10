"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { Logout } from "@mui/icons-material";
import {
  colors,
  gradients,
  shadows,
  glassEffect,
  transitions,
} from "../../styles/theme";

const decodeUTF8 = (str) => {
  try {
    return decodeURIComponent(escape(str));
  } catch {
    return str;
  }
};

const HomePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    try {
      const [, payload] = token.split(".");
      const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
      const { nome } = JSON.parse(decoded);
      setUserName(decodeUTF8(nome));
    } catch {
      setUserName("Usuário");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: gradients.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            ...glassEffect,
            p: 4,
            borderRadius: 3,
            boxShadow: shadows.hover,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                background: gradients.text,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
              }}
            >
              Bem-vindo, {userName}!
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: colors.text.secondary, textAlign: "center" }}
            >
              Você está logado com sucesso!
            </Typography>

            <Button
              variant="contained"
              onClick={handleLogout}
              startIcon={<Logout />}
              sx={{
                mt: 2,
                background: gradients.primary,
                "&:hover": {
                  background: gradients.secondary,
                  transform: "translateY(-2px)",
                },
                transition: transitions.smooth,
                color: colors.text.primary,
                fontWeight: "bold",
                boxShadow: shadows.button,
                px: 4,
                py: 1.5,
              }}
            >
              Sair
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
