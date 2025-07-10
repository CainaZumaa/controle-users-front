"use client";

import { useRouter } from "next/navigation";

const StartButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/user")}
      className="mt-8 px-8 py-3 bg-secondary-main text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform text-lg"
    >
      Começar agora
    </button>
  );
};

export default StartButton;
