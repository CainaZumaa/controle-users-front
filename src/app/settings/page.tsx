import React from "react";

const SettingsPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center rounded-2xl shadow-lg p-8 gap-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 text-center drop-shadow">
        Configurações
      </h1>
      <p className="text-gray-700 text-lg md:text-xl text-center max-w-xl">
        Esta é uma página de configurações. Será adicionado aqui as opções e
        preferências do sistema conforme necessário.
      </p>
      <img
        src="/In progress-amico.svg"
        alt="Configurações em andamento"
        className="w-full max-w-md h-auto drop-shadow-2xl rounded-xl bg-white/30 p-2 mt-4"
        draggable="false"
      />
    </div>
  );
};

export default SettingsPage;
