"use client";

import React, { useEffect } from "react";
import { CheckCircle, Error, Info, Warning } from "@mui/icons-material";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "warning" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <Error className="w-5 h-5" />;
      case "warning":
        return <Warning className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-success-main/20 border-success-main/30 text-success-light";
      case "error":
        return "bg-error-main/20 border-error-main/30 text-error-light";
      case "warning":
        return "bg-warning-main/20 border-warning-main/30 text-warning-light";
      case "info":
        return "bg-info-main/20 border-info-main/30 text-info-light";
      default:
        return "bg-info-main/20 border-info-main/30 text-info-light";
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in">
      <div
        className={`flex items-center space-x-3 p-4 rounded-xl border backdrop-blur-glass shadow-glass ${getStyles()}`}
      >
        {getIcon()}
        <span className="font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-current/70 hover:text-current transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
