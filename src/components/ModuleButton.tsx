"use client";

import { useRouter } from "next/navigation";

const ModuleButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/module")}
      className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md 
             hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out 
             text-lg tracking-wide"
    >
      Ir Para Módulos
    </button>
  );
};

export default ModuleButton;
