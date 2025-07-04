import { useGoogleLogin } from "@react-oauth/google";
import { Google } from "@mui/icons-material";

const GoogleLoginButton = ({ onSuccess, onError, isLoading }) => {
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const backendResponse = await fetch(
          "http://localhost:3000/auth/google",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: response.access_token,
            }),
          }
        );

        const data = await backendResponse.json();

        if (!backendResponse.ok) {
          throw new Error(data.message || "Erro no login com Google");
        }

        // Salvar token do back
        localStorage.setItem("token", data.token);

        onSuccess(data);
      } catch (error) {
        console.error("Erro no login Google:", error);
        onError(error.message || "Erro no login com Google");
      }
    },
    onError: (error) => {
      console.error("Erro no Google OAuth:", error);
      onError("Erro na autenticação do Google");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={isLoading}
      className="w-full mt-2 py-3 px-4 border border-white/30 text-white font-bold rounded-xl transition-all duration-300 ease-in-out hover:border-white hover:bg-white/10 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <Google sx={{ fontSize: 20 }} />
      {isLoading ? "Entrando..." : "Continuar com Google"}
    </button>
  );
};

export default GoogleLoginButton;
