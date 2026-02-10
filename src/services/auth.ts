import { apiRequest } from './api';

export interface UserProfile {
  name: string;
  email: string;
  provider: string;
}

export async function fetchCurrentUser(): Promise<UserProfile> {
  return apiRequest<UserProfile>('/me');
}

export async function logout(): Promise<void> {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

export function redirectToLogin(): void {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
  window.location.href = `${API_BASE_URL}/login`;
}
