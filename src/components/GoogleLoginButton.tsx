import { useGoogleLogin } from "@react-oauth/google";
import { Google } from "@mui/icons-material";
import {
  GoogleLoginButtonProps,
  GoogleOAuthResponse,
  AuthResponse,
} from "../types";

const GoogleLoginButton = ({
  onSuccess,
  onError,
  isLoading,
}: GoogleLoginButtonProps) => {
  const login = useGoogleLogin({
    onSuccess: async (response: GoogleOAuthResponse) => {
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

        const data: AuthResponse = await backendResponse.json();

        if (!backendResponse.ok) {
          throw new Error(data.message || "Erro no login com Google");
        }

        // Salvar token do back
        localStorage.setItem("token", data.token);

        onSuccess(data);
      } catch (error) {
        console.error("Erro no login Google:", error);
        onError(
          error instanceof Error ? error.message : "Erro no login com Google"
        );
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
      className="w-full mt-2 py-3 px-4 border border-white/30 text-white font-bold rounded-xl transition-all duration-300 ease-in-out hover:border-white/50 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none flex items-center justify-center gap-2 group"
    >
      <Google className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
      {isLoading ? "Entrando..." : "Continuar com Google"}
    </button>
  );
};

export default GoogleLoginButton;
