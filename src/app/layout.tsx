import React from "react";
import "./index.css";
import "../styles/animations.css";
import Topbar from "../components/Topbar";
import BodyWrapper from "../components/BodyWrapper";
import AuthGuard from "../components/AuthGuard";

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
        <AuthGuard>
          <Topbar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </AuthGuard>
      </BodyWrapper>
    </html>
  );
}
