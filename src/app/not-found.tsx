import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">
      <img
        src="/404Error.gif"
        alt="Página não encontrada"
        className="w-72 md:w-96 h-auto drop-shadow-2xl rounded-xl"
        draggable="false"
      />
      <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center">
        Oops..
      </h1>
      <p className="text-lg md:text-xl text-gray-300 text-center max-w-lg">
        Parece que você se perdeu no espaço. A página que você procura não
        existe ou foi movida.
      </p>
      <Link href="/home">
        <span className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition-all duration-200 cursor-pointer">
          Voltar para o início
        </span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
