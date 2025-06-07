"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  InputAdornment,
  CircularProgress,
  Alert,
  Container,
  Fade,
  Slide,
} from "@mui/material";
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  AccountCircle,
  ArrowForward,
  Star,
} from "@mui/icons-material";
import AnimatedBackground from "./AnimatedBackground";
import {
  useFormValidation,
  commonValidationRules,
} from "../hooks/useFormValidation";
import {
  colors,
  gradients,
  shadows,
  glassEffect,
  transitions,
} from "../styles/theme";

const SpaceLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicMode, setIsMagicMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { formData, errors, isValid, handleInputChange, validateForm } =
    useFormValidation(
      { email: "", password: "" },
      isMagicMode
        ? { email: commonValidationRules.email }
        : commonValidationRules
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulação de chamada à API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Tentativa de login:", { formData, isMagicMode });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsMagicMode(!isMagicMode);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AnimatedBackground />
      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 2 }}>
        <Fade in timeout={1000}>
          <Box>
            {/* Logo e Título */}
            <Box textAlign="center" mb={4}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: gradients.secondary,
                  mb: 2,
                  animation: "pulse 2s infinite",
                }}
              >
                <AccountCircle sx={{ fontSize: 50, color: "white" }} />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  background: gradients.text,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                Users Management
              </Typography>
              <Typography variant="body1" color={colors.text.secondary}>
                Your user control, simplified
              </Typography>
            </Box>

            {/* Card de Login */}
            <Slide direction="up" in timeout={800}>
              <Card
                sx={{
                  ...glassEffect,
                  borderRadius: 3,
                  boxShadow: shadows.hover,
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Alternador de Modo */}
                  <Box display="flex" justifyContent="center" mb={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isMagicMode}
                          onChange={toggleMode}
                          sx={{
                            "& .MuiSwitch-thumb": {
                              background: gradients.secondary,
                            },
                            "& .MuiSwitch-track": {
                              backgroundColor: "rgba(255,255,255,0.3)",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography color={colors.text.primary}>
                          {isMagicMode
                            ? "🔐 Login with Password"
                            : "✨ Email Link"}
                        </Typography>
                      }
                    />
                  </Box>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                  >
                    {/* Campo de Email */}
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email
                              sx={{
                                color: isValid.email
                                  ? colors.success.main
                                  : colors.text.secondary,
                              }}
                            />
                          </InputAdornment>
                        ),
                        endAdornment: isValid.email && (
                          <InputAdornment position="end">
                            <Star
                              sx={{ color: colors.success.main, fontSize: 16 }}
                            />
                          </InputAdornment>
                        ),
                        sx: {
                          backgroundColor: "rgba(0,0,0,0.3)",
                          color: colors.text.primary,
                          "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: errors.email
                              ? colors.error.main
                              : isValid.email
                              ? colors.success.main
                              : "rgba(255,255,255,0.3)",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "rgba(255,255,255,0.5)",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: colors.primary.main,
                          },
                        },
                      }}
                      InputLabelProps={{
                        sx: { color: colors.text.secondary },
                      }}
                      FormHelperTextProps={{
                        sx: { color: colors.error.main },
                      }}
                    />

                    {/* Campo de Senha (apenas no login tradicional) */}
                    {!isMagicMode && (
                      <Fade in timeout={300}>
                        <TextField
                          fullWidth
                          type={showPassword ? "text" : "password"}
                          label="Password"
                          value={formData.password}
                          onChange={(e) =>
                            handleInputChange("password", e.target.value)
                          }
                          error={!!errors.password}
                          helperText={errors.password}
                          required
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock sx={{ color: colors.text.secondary }} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  sx={{ color: colors.text.secondary }}
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                            sx: {
                              backgroundColor: "rgba(0,0,0,0.3)",
                              color: colors.text.primary,
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: errors.password
                                  ? colors.error.main
                                  : "rgba(255,255,255,0.3)",
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(255,255,255,0.5)",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: colors.primary.main,
                                },
                            },
                          }}
                          InputLabelProps={{
                            sx: { color: colors.text.secondary },
                          }}
                          FormHelperTextProps={{
                            sx: { color: colors.error.main },
                          }}
                        />
                      </Fade>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      fullWidth
                      size="large"
                      disabled={
                        isLoading ||
                        !formData.email ||
                        (!isMagicMode && !formData.password) ||
                        !validateForm()
                      }
                      sx={{
                        mt: 2,
                        py: 2,
                        background: gradients.primary,
                        "&:hover": {
                          background: gradients.secondary,
                          transform: "translateY(-2px)",
                        },
                        "&:disabled": {
                          opacity: 0.5,
                        },
                        transition: transitions.smooth,
                        color: colors.text.primary,
                        fontWeight: "bold",
                      }}
                      endIcon={
                        isLoading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <ArrowForward />
                        )
                      }
                    >
                      {isLoading
                        ? isMagicMode
                          ? "Sending access link..."
                          : "Authenticating..."
                        : isMagicMode
                        ? "Login without password"
                        : "Login"}
                    </Button>
                  </Box>

                  {/* Informação adicional pra magic login */}
                  {isMagicMode && (
                    <Fade in timeout={300}>
                      <Alert
                        severity="info"
                        sx={{
                          mt: 3,
                          backgroundColor: "rgba(156,39,176,0.2)",
                          border: "1px solid rgba(156,39,176,0.3)",
                          color: colors.text.primary,
                          "& .MuiAlert-icon": {
                            color: colors.primary.main,
                          },
                        }}
                      >
                        ✨ We'll send you a secure login link - no password
                        needed!
                      </Alert>
                    </Fade>
                  )}
                </CardContent>
              </Card>
            </Slide>

            {/* Footer */}
            <Box textAlign="center" mt={4}>
              <Typography variant="body2" color={colors.text.secondary}>
                Secure • Fast • Modern
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  );
};

export default SpaceLogin;
