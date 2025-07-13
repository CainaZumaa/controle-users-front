"use client";
import React from "react";
import UsersDataGrid from "../../components/UsersDataGrid";

export default function UserPage() {
  return (
    <div className="w-full h-full px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <UsersDataGrid />
      </div>
    </div>
  );
}
