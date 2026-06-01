import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ShieldCheck } from 'lucide-react';

import { resetPasswordSchema } from '@/features/auth/validations/auth.schemas';
import useAuthStore from '@/features/auth/store/useAuthStore';
import { getErrorMessage } from '@/api/axios';
import { ROUTES, MESSAGES } from '@/constants';
import useDocumentTitle from '@/hooks/useDocumentTitle';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import PasswordInput from '@/components/ui/PasswordInput';
import FormWrapper from '@/components/forms/FormWrapper';

const ResetPasswordPage = () => {
  useDocumentTitle('Reset Password');
  const navigate = useNavigate();
  const resetEmail = useAuthStore((state) => state.resetEmail);
  const resetOtp = useAuthStore((state) => state.resetOtp);
  const resetPasswordAction = useAuthStore((state) => state.resetPassword);

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  // If no email or otp in state, redirect back (must be AFTER all hooks)
  if (!resetEmail || !resetOtp) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
  }


  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await resetPasswordAction({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      toast.success(MESSAGES.PASSWORD_RESET);
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="dark" className="p-8 animate-fade-in">
      <div className="mb-8">
        <p className="font-mono-caps text-[11px] text-accent-mint mb-3">Almost Done</p>
        <h2 className="text-[22px] font-medium text-on-dark tracking-[-0.22px] font-display">
          Set new password
        </h2>
        <p className="text-on-dark/50 text-[16px] leading-[20.8px] tracking-[-0.16px] mt-1">
          Choose a strong password for your account
        </p>
      </div>

      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <PasswordInput
          label="New Password"
          name="newPassword"
          placeholder="Min 8 chars with A-z, 0-9, @$!%*?&"
          register={register}
          error={errors.newPassword}
          dark
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Re-enter your new password"
          register={register}
          error={errors.confirmPassword}
          dark
        />

        <Button type="submit" variant="secondary" isLoading={isLoading}>
          Reset Password
        </Button>
      </FormWrapper>
    </Card>
  );
};

export default ResetPasswordPage;
