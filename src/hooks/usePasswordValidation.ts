import { useState, useCallback } from "react";
import { PasswordValidationResponse } from "../types";

interface UsePasswordValidationReturn {
  strength: "weak" | "medium" | "strong";
  score: string;
  checks: any;
  recommendations: string[];
  isLoading: boolean;
  validatePassword: (password: string) => void;
}

export const usePasswordValidation = (): UsePasswordValidationReturn => {
  const [strength, setStrength] = useState<"weak" | "medium" | "strong">(
    "weak"
  );
  const [score, setScore] = useState<string>("0/8");
  const [checks, setChecks] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = useCallback(async (password: string) => {
    if (!password || password.length < 3) {
      setStrength("weak");
      setScore("0/8");
      setChecks(null);
      setRecommendations([]);
      return;
    }

    setIsLoading(true);

    try {
      const baseURL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const response = await fetch(`${baseURL}/password-strength`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data: PasswordValidationResponse = await response.json();
        setStrength(data.password_strength);
        setScore(data.score);
        setChecks(data.checks);
        setRecommendations(data.recommendations);
      } else {
        // Fallback para validação local se a API falhar

        const localChecks = {
          length: password.length >= 8,
          uppercase: /[A-Z]/.test(password),
          lowercase: /[a-z]/.test(password),
          numbers: /\d/.test(password),
          symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
          no_common: !["123456", "password", "qwerty", "admin"].includes(
            password.toLowerCase()
          ),
        };

        const localScore = Object.values(localChecks).filter(Boolean).length;
        const localStrength =
          localScore >= 6 ? "strong" : localScore >= 4 ? "medium" : "weak";

        setStrength(localStrength);
        setScore(`${localScore}/6`);
        setChecks(localChecks);
        setRecommendations([]);
      }
    } catch (error) {
      console.error("❌ Erro ao validar senha:", error);
      // Fallback para validação local
      const localChecks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        no_common: !["123456", "password", "qwerty", "admin"].includes(
          password.toLowerCase()
        ),
      };

      const localScore = Object.values(localChecks).filter(Boolean).length;
      const localStrength =
        localScore >= 6 ? "strong" : localScore >= 4 ? "medium" : "weak";

      setStrength(localStrength);
      setScore(`${localScore}/6`);
      setChecks(localChecks);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    strength,
    score,
    checks,
    recommendations,
    isLoading,
    validatePassword,
  };
};
