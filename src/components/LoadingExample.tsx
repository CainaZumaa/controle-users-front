"use client";
import React, { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { useLoading } from "./LoadingProvider";
import LoadingSpinner from "./LoadingSpinner";

const LoadingExample: React.FC = () => {
  const { startLoading, stopLoading } = useLoading();
  const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);

  const handleGlobalLoading = async (): Promise<void> => {
    startLoading();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    stopLoading();
  };

  const handleLocalLoading = async (): Promise<void> => {
    setIsLocalLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setData(["Item 1", "Item 2", "Item 3"]);
    setIsLocalLoading(false);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white", mb: 3 }}>
        Exemplos de Loading
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
          Loading Global (Progress Bar)
        </Typography>
        <Button
          variant="contained"
          onClick={handleGlobalLoading}
          sx={{
            backgroundColor: "#10b981",
            "&:hover": { backgroundColor: "#059669" },
          }}
        >
          Testar Loading Global
        </Button>
        <Typography
          variant="body2"
          sx={{ color: "white", opacity: 0.8, mt: 1 }}
        >
          Mostra uma barra de progresso no topo da tela
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
          Loading Local (Spinner)
        </Typography>
        <Button
          variant="contained"
          onClick={handleLocalLoading}
          disabled={isLocalLoading}
          sx={{
            backgroundColor: "#10b981",
            "&:hover": { backgroundColor: "#059669" },
          }}
        >
          {isLocalLoading ? "Carregando..." : "Testar Loading Local"}
        </Button>

        {isLocalLoading ? (
          <LoadingSpinner message="Carregando dados..." />
        ) : (
          <Box sx={{ mt: 2 }}>
            {data.length > 0 && (
              <Typography variant="body1" sx={{ color: "white" }}>
                Dados carregados: {data.join(", ")}
              </Typography>
            )}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderRadius: 2,
        }}
      >
        <Typography variant="body2" sx={{ color: "white", opacity: 0.9 }}>
          <strong>Como usar:</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "white", opacity: 0.8, mt: 1 }}
        >
          • <strong>Loading Global:</strong> Use <code>useLoading()</code> hook
          para operações que afetam toda a aplicação
        </Typography>
        <Typography variant="body2" sx={{ color: "white", opacity: 0.8 }}>
          • <strong>Loading Local:</strong> Use <code>LoadingSpinner</code> para
          operações específicas de um componente
        </Typography>
        <Typography variant="body2" sx={{ color: "white", opacity: 0.8 }}>
          • <strong>Automático:</strong> O loading entre páginas é ativado
          automaticamente
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingExample;
