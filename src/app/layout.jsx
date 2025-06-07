import React from "react";
import "./index.css";
import "../styles/animations.css";

export const metadata = {
  title: "Users Management",
  description: "User Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
