import { useEffect } from "react";
import { useLoading } from "../components/LoadingProvider";

export const usePageLoading = (isLoading: boolean, delay: number = 300) => {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      // delay mínimo para evitar flick
      const timer = setTimeout(() => {
        stopLoading();
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isLoading, startLoading, stopLoading, delay]);
};
