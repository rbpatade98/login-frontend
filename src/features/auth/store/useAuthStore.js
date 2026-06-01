import { create } from 'zustand';
import * as authApi from '@/api/auth.api';
import {
  getToken,
  setToken,
  removeToken,
  getStoredUser,
  setStoredUser,
  clearAuth,
} from '@/utils/token';

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,

  // Password reset flow state
  resetEmail: null,
  resetOtp: null,

  // Initialize auth state from localStorage on app mount
  initialize: () => {
    const token = getToken();
    const user = getStoredUser();
    if (token && user) {
      set({ user, token, isAuthenticated: true, isLoading: false });
    } else {
      clearAuth();
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },

  // Register
  register: async ({ username, email, password, role }) => {
    const response = await authApi.registerUser({ username, email, password, role });
    // We intentionally do NOT set the token or log them in here,
    // so they are forced to log in manually on the login page.
    return response.data;
  },

  // Login
  login: async ({ email, password }) => {
    const response = await authApi.loginUser({ email, password });
    const { token, user } = response.data;
    setToken(token);
    setStoredUser(user);
    set({ user, token, isAuthenticated: true });
    return response.data;
  },

  // Logout
  logout: async () => {
    try {
      await authApi.logoutUser();
    } catch {
      // Even if API call fails, clear local state
    }
    clearAuth();
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Send OTP — stores email for use in verify/reset steps
  sendOtp: async (email) => {
    const response = await authApi.sendOtp({ email });
    set({ resetEmail: email });
    return response.data;
  },

  // Verify OTP — stores otp for use in reset step
  verifyOtp: async (otp) => {
    const email = get().resetEmail;
    const response = await authApi.verifyOtp({ email, otp });
    set({ resetOtp: otp });
    return response.data;
  },

  // Reset Password
  resetPassword: async ({ newPassword, confirmPassword }) => {
    const email = get().resetEmail;
    const otp = get().resetOtp;
    const response = await authApi.resetPassword({
      email,
      otp,
      newPassword,
      confirmPassword,
    });
    // Clear reset flow state
    set({ resetEmail: null, resetOtp: null });
    return response.data;
  },

  // Set reset email (for navigating between forgot-password steps)
  setResetEmail: (email) => set({ resetEmail: email }),
  setResetOtp: (otp) => set({ resetOtp: otp }),

  // Clear reset flow
  clearResetFlow: () => set({ resetEmail: null, resetOtp: null }),
}));

export default useAuthStore;
