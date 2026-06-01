import { STORAGE_KEYS } from '@/constants';

export const getToken = () => localStorage.getItem(STORAGE_KEYS.TOKEN);

export const setToken = (token) => localStorage.setItem(STORAGE_KEYS.TOKEN, token);

export const removeToken = () => localStorage.removeItem(STORAGE_KEYS.TOKEN);

export const getStoredUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setStoredUser = (user) =>
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

export const removeStoredUser = () => localStorage.removeItem(STORAGE_KEYS.USER);

export const clearAuth = () => {
  removeToken();
  removeStoredUser();
};
