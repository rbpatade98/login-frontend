import axiosInstance from './axios';
import { API_PATHS } from '@/constants';

export const getAllUsers = (page = 1, limit = 10) =>
  axiosInstance.get(`${API_PATHS.USER.GET_ALL}?page=${page}&limit=${limit}`);
