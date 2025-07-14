"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { People, Dashboard, Settings, Menu, Close } from "@mui/icons-material";

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  active?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  className = "",
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: "users",
      label: "Usuários",
      icon: <People className="w-6 h-6" />,
      path: "/user",
      active: pathname === "/user",
    },
    {
      id: "modulo",
      label: "Módulos",
      icon: <Dashboard className="w-6 h-6" />,
      path: "/modulo",
      active: pathname === "/modulo",
    },
    {
      id: "module",
      label: "Modules",
      icon: <Dashboard className="w-6 h-6" />,
      path: "/module",
      active: pathname === "/module",
    },
    {
      id: "settings",
      label: "Configurações",
      icon: <Settings className="w-6 h-6" />,
      path: "/settings",
      active: pathname === "/settings",
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMobileOpen(false);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
          style={{ backdropFilter: "none" }}
        />
      )}

      {/* Mobile menu botao */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-20 left-4 z-50 lg:hidden p-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all duration-200"
      >
        {isMobileOpen ? (
          <Close className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/10 backdrop-blur-glass border-r border-white/20 z-30 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-16"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          {isOpen && (
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          )}
          <button
            onClick={toggleSidebar}
            className="hidden lg:block p-2 text-white/70 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* navegation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    item.active
                      ? "bg-gradient-primary text-white shadow-button"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {isOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
      </div>
    </>
  );
};

export default Sidebar;
