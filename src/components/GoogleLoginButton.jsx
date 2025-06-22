import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useGoogleLogin } from "@react-oauth/google";

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
    <Button
      fullWidth
      variant="outlined"
      onClick={() => login()}
      disabled={isLoading}
      startIcon={<Google />}
      sx={{
        mt: 2,
        py: 2,
        borderColor: "rgba(255, 255, 255, 0.3)",
        color: "#ffffff",
        "&:hover": {
          borderColor: "#ffffff",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          transform: "translateY(-2px)",
        },
        "&:disabled": {
          opacity: 0.5,
        },
        transition: "all 0.3s ease",
        fontWeight: "bold",
      }}
    >
      {isLoading ? "Entrando..." : "Continuar com Google"}
    </Button>
  );
};

export default GoogleLoginButton;
