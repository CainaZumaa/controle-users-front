"use client";
import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary-main">
      <Sidebar
        isOpen={false}
        setIsOpen={function (isOpen: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="lg:ml-64 pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
