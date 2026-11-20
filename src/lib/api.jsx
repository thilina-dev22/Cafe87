// src/lib/api.js — Frontend API client
const BASE = import.meta.env.VITE_API_URL || '/api';

function getToken() {
  return localStorage.getItem('cafe87_admin_token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

// Auth
export const api = {
  auth: {
    login: (email, password) => request('POST', '/auth/login', { email, password }),
    me: () => request('GET', '/auth/me'),
  },

  // Rooms (public)
  rooms: {
    list: () => request('GET', '/rooms'),
    get: (slug) => request('GET', `/rooms/${slug}`),
  },

  // Rooms (admin)
  adminRooms: {
    list: () => request('GET', '/rooms/admin/all'),
    create: (data) => request('POST', '/rooms/admin', data),
    update: (id, data) => request('PUT', `/rooms/admin/${id}`, data),
    delete: (id) => request('DELETE', `/rooms/admin/${id}`),
    addPhotos: (id, photos) => request('POST', `/rooms/admin/${id}/photos`, { photos }),
    updatePhoto: (photoId, data) => request('PATCH', `/rooms/admin/photos/${photoId}`, data),
    deletePhoto: (photoId) => request('DELETE', `/rooms/admin/photos/${photoId}`),
  },

  // Menu (public)
  menu: {
    list: () => request('GET', '/menu'),
    settings: () => request('GET', '/menu/settings'),
  },

  // Menu (admin)
  adminMenu: {
    list: () => request('GET', '/menu/admin/all'),
    // Categories
    createCategory: (data) => request('POST', '/menu/admin/categories', data),
    updateCategory: (id, data) => request('PUT', `/menu/admin/categories/${id}`, data),
    deleteCategory: (id) => request('DELETE', `/menu/admin/categories/${id}`),
    // Subsections
    createSubsection: (categoryId, data) => request('POST', `/menu/admin/categories/${categoryId}/subsections`, data),
    updateSubsection: (id, data) => request('PUT', `/menu/admin/subsections/${id}`, data),
    deleteSubsection: (id) => request('DELETE', `/menu/admin/subsections/${id}`),
    // Items
    createItem: (categoryId, data) => request('POST', `/menu/admin/categories/${categoryId}/items`, data),
    updateItem: (id, data) => request('PUT', `/menu/admin/items/${id}`, data),
    deleteItem: (id) => request('DELETE', `/menu/admin/items/${id}`),
    // Addons
    createAddon: (categoryId, data) => request('POST', `/menu/admin/categories/${categoryId}/addons`, data),
    updateAddon: (id, data) => request('PUT', `/menu/admin/addons/${id}`, data),
    deleteAddon: (id) => request('DELETE', `/menu/admin/addons/${id}`),
    // Settings
    updateSettings: (data) => request('PUT', '/menu/admin/settings', data),
  },
};

export { getToken };
