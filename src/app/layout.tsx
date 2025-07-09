import React from "react";
import "./index.css";
import "../styles/animations.css";

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
      <body>{children}</body>
    </html>
  );
}
