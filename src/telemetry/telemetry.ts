import { apiRequest } from '@/services/api';

type TelemetryEvent =
  | 'login_success'
  | 'organization_selected'
  | 'page_view'
  | 'api_error'
  | 'logout';

export function trackEvent(event: TelemetryEvent, extra?: Record<string, unknown>) {
  const orgId = localStorage.getItem('vetrya_org')
    ? JSON.parse(localStorage.getItem('vetrya_org')!).id
    : null;

  const payload = {
    event,
    timestamp: new Date().toISOString(),
    orgId,
    route: window.location.pathname,
    ...extra,
  };

  apiRequest('/telemetry/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    // fire-and-forget
  });
}
