"use client";

import React, { useMemo, useCallback } from "react";
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
      boxShadow: `0 0 ${star.size * 1.5}px ${star.size}px ${star.color}`,
      animation: `fall ${star.duration}s cubic-bezier(0.4, 0, 0.2, 1) ${star.delay}s infinite`,
      opacity: star.opacity,
      ...optimizeRendering,
    }}
  />
));

Star.displayName = "Star";

// Componente para flashes
const Flash = React.memo(({ flash }) => (
  <Box
    sx={{
      position: "absolute",
      left: `${flash.x}%`,
      top: `${flash.y}%`,
      width: `${flash.size}px`,
      height: `${flash.size}px`,
      background: `radial-gradient(circle, 
        hsla(330, 100%, 70%, 0.1) 0%, 
        hsla(${330 + flash.hue}, 100%, 70%, 0.05) 40%,
        hsla(${330 + flash.hue}, 100%, 70%, 0) 70%
      )`,
      borderRadius: "50%",
      animation: `pulse ${flash.duration}s ease-in-out ${flash.delay}s infinite`,
      opacity: 0,
      transform: "translate(-50%, -50%) translateZ(0)",
      filter: "blur(40px)",
      mixBlendMode: "screen",
      ...optimizeRendering,
    }}
  />
));

Flash.displayName = "Flash";

const AnimatedBackground = React.memo(() => {
  // Configuração de estrelas
  const stars = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.2 + 0.8,
      duration: Math.random() * 25 + 30,
      delay: Math.random() * 15,
      fallSpeed: Math.random() * 0.06 + 0.04,
      color: Math.random() > 0.5 ? "#ffc0cb" : "#ff69b4",
      opacity: Math.random() * 0.3 + 0.5,
    }));
  }, []);

  // Configuração de flashes
  const flashes = useMemo(() => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 400 + 300,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.15 + 0.05,
      hue: Math.random() * 8 - 4,
    }));
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
          "linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #1a0b2e 100%)",
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
      {flashes.map((flash) => (
        <Flash key={`flash-${flash.id}`} flash={flash} />
      ))}
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
          10% {
            opacity: var(--star-opacity, 0.7);
          }
          90% {
            opacity: var(--star-opacity, 0.7);
          }
          100% {
            transform: translateY(100vh)
              translateX(calc(var(--fall-offset, 0) * 1px)) rotate(45deg)
              translateZ(0);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9) translateZ(0);
            filter: blur(40px) brightness(1);
          }
          50% {
            opacity: var(--flash-opacity, 0.15);
            transform: translate(-50%, -50%) scale(1.05) translateZ(0);
            filter: blur(45px) brightness(1.05);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .star,
          .flash {
            animation: none;
          }
        }
      `}</style>
    </Box>
  );
});

AnimatedBackground.displayName = "AnimatedBackground";

export default AnimatedBackground;
