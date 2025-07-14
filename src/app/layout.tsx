import React from "react";
import "./index.css";
import "../styles/animations.css";
import BodyWrapper from "../components/BodyWrapper";
import AuthGuard from "../components/AuthGuard";
import { LoadingProvider } from "../components/LoadingProvider";

export const metadata = {
  title: "Users Management",
  description: "User Management System",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <BodyWrapper>
        <LoadingProvider>
          <AuthGuard>{children}</AuthGuard>
        </LoadingProvider>
      </BodyWrapper>
    </html>
  );
}
