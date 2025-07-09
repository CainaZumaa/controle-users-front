// Tipos para usuário
export interface User {
  id: string;
  nome: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tipos para resposta de autenticação
export interface AuthResponse {
  token: string;
  usuario: User;
  message?: string;
}

// Tipos para dados do formulário de login
export interface LoginFormData {
  email: string;
  password: string;
}

// Tipos para resposta do Google OAuth
export interface GoogleOAuthResponse {
  access_token: string;
}

// Tipos para props dos componentes
export interface GoogleLoginButtonProps {
  onSuccess: (data: AuthResponse) => void;
  onError: (error: string) => void;
  isLoading: boolean;
}

// Tipos para estrelas do background animado
export interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  fallSpeed: number;
  color: string;
  glowColor: string;
  opacity: number;
}

// Tipos para paleta de cores
export interface ColorPalette {
  stars: Array<{
    color: string;
    glow: string;
  }>;
}

// Tipos para evento de input
export interface InputChangeEvent {
  target: {
    name: string;
    value: string;
  };
}

// Tipos para evento de formulário
export interface FormSubmitEvent {
  preventDefault: () => void;
}
