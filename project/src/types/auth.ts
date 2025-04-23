export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}