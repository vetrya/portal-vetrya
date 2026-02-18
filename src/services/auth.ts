import { apiRequest } from './api';

export interface UserProfile {
  name?: string;
  email: string;
  provider?: string;
}

// ============================
// Busca usuário autenticado
// ============================
export async function fetchCurrentUser(): Promise<UserProfile> {
  return apiRequest<UserProfile>('/me');
}

// ============================
// Logout (redirect real)
// ============================
export function logout(): void {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  window.location.href = `${API_BASE_URL}/logout`;
}

// ============================
// Redireciona para login
// ============================
export function redirectToLogin(): void {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  window.location.href = `${API_BASE_URL}/login`;
}
