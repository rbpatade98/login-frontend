import { z } from 'zod';

// Reusable field schemas
const emailField = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .max(100, 'Email is too long');

const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    'Must include uppercase, lowercase, number, and special character (@$!%*?&)'
  );

const otpField = z
  .string()
  .trim()
  .length(6, 'OTP must be exactly 6 digits')
  .regex(/^\d+$/, 'OTP must contain only numbers');

// Login
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

// Register
export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Only letters, numbers, and underscores allowed'
    ),
  email: emailField,
  password: passwordField,
  role: z.enum(['user', 'admin']).optional().default('user'),
});

// Send OTP (forgot password step 1)
export const sendOtpSchema = z.object({
  email: emailField,
});

// Verify OTP (forgot password step 2)
export const verifyOtpSchema = z.object({
  otp: otpField,
});

// Reset Password (forgot password step 3)
export const resetPasswordSchema = z
  .object({
    newPassword: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
