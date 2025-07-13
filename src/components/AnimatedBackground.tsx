"use client";

import React, { useMemo } from "react";
import { Star, ColorPalette } from "../types";

// Componente para estrelas individuais
const StarComponent = React.memo(({ star }: { star: Star }) => (
  <div
    className="absolute rounded-full animate-fall"
    style={{
      left: `${star.x}%`,
      top: `${star.y}%`,
      width: `${star.size}px`,
      height: `${star.size}px`,
      backgroundColor: star.color,
      boxShadow: `0 0 ${star.size * 2}px ${star.size * 0.8}px ${
        star.glowColor
      }`,
      animationDuration: `${star.duration}s`,
      animationDelay: `${star.delay}s`,
      opacity: star.opacity,
      transform: "translateZ(0)",
      backfaceVisibility: "hidden",
      perspective: "1000px",
      willChange: "transform, opacity",
    }}
  />
));

StarComponent.displayName = "StarComponent";

const AnimatedBackground = React.memo(() => {
  // Paleta de cores harmoniosa com o gradiente azul ODS
  const colorPalette: ColorPalette = {
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
  const stars: Star[] = useMemo(() => {
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
    <div className="fixed inset-0 overflow-hidden z-0 bg-gradient-background">
      {stars.map((star) => (
        <StarComponent key={`star-${star.id}`} star={star} />
      ))}

      <style jsx global>{`
        @media (prefers-reduced-motion: reduce) {
          .animate-fall {
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
    </div>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";

export default AnimatedBackground;
