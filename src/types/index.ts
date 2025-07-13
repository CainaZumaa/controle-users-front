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

// Tipos para resposta de login
export interface LoginResponse {
  token: string;
  usuario: User;
}

// Tipos para validação de token
export interface ValidateTokenResponse {
  valid: boolean;
  user?: {
    id: number;
    email: string;
    is_active: boolean;
  };
  token_info?: {
    issued_at: string;
    expires_at: string;
    expires_in_seconds: number;
  };
  error?: string;
}

// Tipo extended de user com prop a mais
export interface ExtendedUser extends User {
  is_active?: boolean;
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

// Tipos para CRUD de usuários
export interface UserFormData {
  nome: string;
  email: string;
  is_active?: boolean;
}

export interface UserCreateRequest extends UserFormData {}

export interface UserUpdateRequest extends Partial<UserFormData> {
  id: string;
}

export interface UserDeleteRequest {
  id: string;
}

export interface UserResponse {
  id: string;
  nome: string;
  email: string;
  foto_perfil: string | null;
  is_active?: boolean;
  created_at?: string;
  last_login?: string;
}

export interface UsersListResponse {
  users: UserResponse[];
  total: number;
  page: number;
  limit: number;
}

// Tipos para operações de API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  details?: any;
}

// Tipos para DataGrid
export interface DataGridColumn {
  field: string;
  headerName: string;
  width?: number;
  flex?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (params: any) => React.ReactNode;
}

export interface DataGridAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: (id: string) => void;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

// Tipos para modais
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

// Tipos para formulários
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "file" | "select";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}
