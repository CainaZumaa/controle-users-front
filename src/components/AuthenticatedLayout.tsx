"use client";

import React, { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Topbar />
      <div className="flex-1 flex h-[calc(100vh-4rem)]">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />{" "}
        <main
          className={`flex-1 pt-20 h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-64" : "lg:ml-16"
          }`} // margem dinamica
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default AuthenticatedLayout;
