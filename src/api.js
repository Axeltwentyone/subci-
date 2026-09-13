const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

let token = localStorage.getItem('subci_token');

export function getToken() {
  return token;
}

export function setToken(next) {
  token = next;
  if (next) localStorage.setItem('subci_token', next);
  else localStorage.removeItem('subci_token');
}

class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

async function request(path, { method = 'GET', body } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 204) return null;

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    const message = json?.message || 'Une erreur est survenue.';
    throw new ApiError(message, res.status, json?.errors);
  }

  return json;
}

export const api = {
  register: (data) => request('/register', { method: 'POST', body: data }),
  login: (data) => request('/login', { method: 'POST', body: data }),
  logout: () => request('/logout', { method: 'POST' }),
  me: () => request('/me'),

  listings: () => request('/listings'),
  myListings: () => request('/listings/mine'),
  createListing: (data) => request('/listings', { method: 'POST', body: data }),
  updateListing: (id, data) => request(`/listings/${id}`, { method: 'PUT', body: data }),
  deleteListing: (id) => request(`/listings/${id}`, { method: 'DELETE' }),

  myMemberships: () => request('/memberships/mine'),
  purchase: (data) => request('/memberships', { method: 'POST', body: data }),
  rateMembership: (id, data) => request(`/memberships/${id}/rate`, { method: 'POST', body: data }),
  cancelMembership: (id) => request(`/memberships/${id}`, { method: 'DELETE' }),

  withdrawals: () => request('/withdrawals'),
  withdraw: (data) => request('/withdrawals', { method: 'POST', body: data }),

  notifications: () => request('/notifications'),

  updateProfile: (data) => request('/profile', { method: 'PUT', body: data }),
  startKyc: (data) => request('/profile/kyc/start', { method: 'POST', body: data }),
  checkKyc: () => request('/profile/kyc/check', { method: 'POST' }),
  verifySubscription: () => request('/profile/verify-subscription', { method: 'POST' }),
};

export { ApiError };
