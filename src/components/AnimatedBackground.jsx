"use client";

import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { optimizeRendering } from "../styles/theme";

// Componente para estrelas individuais
const Star = React.memo(({ star }) => (
  <Box
    sx={{
      position: "absolute",
      left: `${star.x}%`,
      top: `${star.y}%`,
      width: `${star.size}px`,
      height: `${star.size}px`,
      backgroundColor: star.color,
      borderRadius: "50%",
      boxShadow: `0 0 ${star.size * 2}px ${star.size * 0.8}px ${
        star.glowColor
      }`,
      animation: `fall ${star.duration}s cubic-bezier(0.4, 0, 0.2, 1) ${star.delay}s infinite`,
      opacity: star.opacity,
      ...optimizeRendering,
    }}
  />
));

Star.displayName = "Star";

const AnimatedBackground = React.memo(() => {
  // Paleta de cores harmoniosa com o gradiente azul ODS
  const colorPalette = {
    stars: [
      { color: "#ffffff", glow: "rgba(255, 255, 255, 0.6)" }, // Branco puro
      { color: "#e8f4fd", glow: "rgba(232, 244, 253, 0.5)" }, // Azul muito claro
      { color: "#b3e5fc", glow: "rgba(179, 229, 252, 0.6)" }, // Azul claro
      { color: "#81d4fa", glow: "rgba(129, 212, 250, 0.5)" }, // Azul médio claro
      { color: "#4fc3f7", glow: "rgba(79, 195, 247, 0.4)" }, // Azul vibrante
      { color: "#29b6f6", glow: "rgba(41, 182, 246, 0.5)" }, // Azul forte
      { color: "#03a9f4", glow: "rgba(3, 169, 244, 0.4)" }, // Azul intenso
      { color: "#a7ffeb", glow: "rgba(167, 255, 235, 0.5)" }, // Verde água claro
      { color: "#64ffda", glow: "rgba(100, 255, 218, 0.4)" }, // Verde água
      { color: "#1de9b6", glow: "rgba(29, 233, 182, 0.5)" }, // Verde turquesa
    ],
  };

  // Configuração de estrelas com cores melhoradas
  const stars = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const colorChoice =
        colorPalette.stars[
          Math.floor(Math.random() * colorPalette.stars.length)
        ];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.6, // Tamanhos variados
        duration: Math.random() * 20 + 25, // Velocidades diferentes
        delay: Math.random() * 12,
        fallSpeed: Math.random() * 0.08 + 0.03,
        color: colorChoice.color,
        glowColor: colorChoice.glow,
        opacity: Math.random() * 0.4 + 0.4, // Opacidades variadas
      };
    });
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: 0,
        background:
          "linear-gradient(135deg, #096c9e 0%, #0891b2 50%, #06b6d4 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at center, transparent 0%, #1a0b2e 100%)",
          opacity: 0.8,
        },
      }}
    >
      {stars.map((star) => (
        <Star key={`star-${star.id}`} star={star} />
      ))}

      <style jsx global>{`
        @keyframes fall {
          0% {
            transform: translateY(-100vh) translateX(0) rotate(0deg)
              translateZ(0);
            opacity: 0;
          }
          15% {
            opacity: var(--star-opacity, 0.8);
          }
          85% {
            opacity: var(--star-opacity, 0.8);
          }
          100% {
            transform: translateY(100vh)
              translateX(calc(var(--fall-offset, 0) * 1px)) rotate(60deg)
              translateZ(0);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .star {
            animation: none;
          }
        }

        /* Adiciona um leve shimmer às estrelas */
        @keyframes shimmer {
          0%,
          100% {
            filter: brightness(1) saturate(1);
          }
          50% {
            filter: brightness(1.2) saturate(1.1);
          }
        }
      `}</style>
    </Box>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";

export default AnimatedBackground;
