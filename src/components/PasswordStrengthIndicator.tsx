"use client";

import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

interface PasswordCheck {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  no_common: boolean;
}

interface PasswordStrengthProps {
  password: string;
  strength?: "weak" | "medium" | "strong";
  score?: string;
  checks?: PasswordCheck;
  recommendations?: string[];
  isLoading?: boolean;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthProps> = ({
  password,
  strength = "weak",
  score = "0/8",
  checks,
  recommendations = [],
  isLoading = false,
}) => {
  if (!password) return null;

  const getStrengthColor = () => {
    switch (strength) {
      case "strong":
        return "success.main";
      case "medium":
        return "warning.main";
      case "weak":
      default:
        return "error.main";
    }
  };

  const getStrengthText = () => {
    switch (strength) {
      case "strong":
        return "Senha forte";
      case "medium":
        return "Senha média";
      case "weak":
      default:
        return "Senha fraca";
    }
  };

  const getProgressPercentage = () => {
    const [current, total] = score.split("/").map(Number);
    return (current / total) * 100;
  };

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 87.5) return "success.main";
    if (percentage >= 50) return "warning.main";
    return "error.main";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Barra de progresso */}
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: "medium",
              color: getStrengthColor(),
            }}
          >
            {getStrengthText()}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
          >
            {score}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={getProgressPercentage()}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            "& .MuiLinearProgress-bar": {
              backgroundColor: getProgressColor(),
              borderRadius: 4,
            },
          }}
        />
      </Box>

      {/* Critérios de validação */}
      {checks && (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: "45%",
              }}
            >
              {checks.length ? (
                <CheckCircle sx={{ color: "success.main", fontSize: 16 }} />
              ) : (
                <Cancel sx={{ color: "error.main", fontSize: 16 }} />
              )}
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                Mínimo 8 caracteres
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: "45%",
              }}
            >
              {checks.uppercase ? (
                <CheckCircle sx={{ color: "success.main", fontSize: 16 }} />
              ) : (
                <Cancel sx={{ color: "error.main", fontSize: 16 }} />
              )}
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                Letra maiúscula
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: "45%",
              }}
            >
              {checks.lowercase ? (
                <CheckCircle sx={{ color: "success.main", fontSize: 16 }} />
              ) : (
                <Cancel sx={{ color: "error.main", fontSize: 16 }} />
              )}
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                Letra minúscula
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: "45%",
              }}
            >
              {checks.numbers ? (
                <CheckCircle sx={{ color: "success.main", fontSize: 16 }} />
              ) : (
                <Cancel sx={{ color: "error.main", fontSize: 16 }} />
              )}
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                Número
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: "45%",
              }}
            >
              {checks.symbols ? (
                <CheckCircle sx={{ color: "success.main", fontSize: 16 }} />
              ) : (
                <Cancel sx={{ color: "error.main", fontSize: 16 }} />
              )}
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                Símbolo especial
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: "45%",
              }}
            >
              {checks.no_common ? (
                <CheckCircle sx={{ color: "success.main", fontSize: 16 }} />
              ) : (
                <Cancel sx={{ color: "error.main", fontSize: 16 }} />
              )}
              <Typography
                variant="caption"
                sx={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                Não é comum
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Loading state */}
      {isLoading && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderTop: "1px solid rgba(255, 255, 255, 0.6)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            Verificando senha...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PasswordStrengthIndicator;
