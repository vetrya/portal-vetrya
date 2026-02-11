const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

let currentOrgId: string | null = null;

export function setApiOrgId(orgId: string | null) {
  currentOrgId = orgId;
}

export async function apiRequest<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);

  if (currentOrgId) {
    headers.set('X-Org-Id', currentOrgId);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (response.status === 401) {
    const error = new Error('Unauthorized');
    (error as any).status = 401;
    throw error;
  }

  if (!response.ok) {
    const error = new Error(`API error: ${response.status}`);
    throw error;
  }

  return response.json();
}
