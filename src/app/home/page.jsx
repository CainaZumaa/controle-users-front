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

// Função para decodificar caracteres UTF-8 (Nomes com acentos tipo 'Cainã' etc...)
const decodeUTF8 = (str) => {
  try {
    return decodeURIComponent(escape(str));
  } catch (e) {
    return str;
  }
};

const HomePage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔍 Token encontrado no localStorage:", token ? "Sim" : "Não");

    if (!token) {
      console.log("⚠️ Nenhum token encontrado, redirecionando para login");
      router.push("/");
      return;
    }

    try {
      console.log("🔑 Token completo:", token);

      // Decodifica o token JWT
      const [header, payload, signature] = token.split(".");
      console.log("📄 Header do token:", header);
      console.log("📄 Payload do token (encoded):", payload);

      const base64Url = payload;
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payloadObj = JSON.parse(atob(base64));
      console.log("📄 Payload decodificado (objeto):", payloadObj);

      // Decodifica o nome para UTF-8
      const rawName =
        payloadObj.nome ||
        payloadObj.name ||
        payloadObj.user?.nome ||
        payloadObj.user?.name ||
        payloadObj.usuario?.nome ||
        payloadObj.usuario?.name;
      const decodedName = decodeUTF8(rawName);

      console.log("👤 Nome encontrado:", decodedName);
      console.log("🔍 Campos disponíveis:", Object.keys(payloadObj));

      setUserName(decodedName || "Usuário");
    } catch (error) {
      console.error("❌ Erro ao decodificar token:", error);
      console.error("Detalhes do erro:", {
        message: error.message,
        stack: error.stack,
      });
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
