"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function BodyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const bgClass =
    pathname === "/" ? "bg-gradient-background" : "bg-primary-main";
  return (
    <body className={`${bgClass}`}>{children}</body>
  );
}
