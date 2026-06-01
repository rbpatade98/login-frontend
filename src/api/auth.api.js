import axiosInstance from './axios';
import { API_PATHS } from '@/constants';

export const registerUser = (data) =>
  axiosInstance.post(API_PATHS.AUTH.REGISTER, data);

export const loginUser = (data) =>
  axiosInstance.post(API_PATHS.AUTH.LOGIN, data);

export const logoutUser = () =>
  axiosInstance.post(API_PATHS.AUTH.LOGOUT);

export const sendOtp = (data) =>
  axiosInstance.post(API_PATHS.AUTH.SEND_OTP, data);

export const verifyOtp = (data) =>
  axiosInstance.post(API_PATHS.AUTH.VERIFY_OTP, data);

export const resetPassword = (data) =>
  axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, data);
