import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail } from 'lucide-react';

import { loginSchema } from '@/features/auth/validations/auth.schemas';
import useAuth from '@/features/auth/hooks/useAuth';
import { getErrorMessage } from '@/api/axios';
import { ROUTES, MESSAGES } from '@/constants';
import useDocumentTitle from '@/hooks/useDocumentTitle';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import FormWrapper from '@/components/forms/FormWrapper';

const LoginPage = () => {
  useDocumentTitle('Login');
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await login(data);
      toast.success(MESSAGES.LOGIN_SUCCESS);
      const destination = result.user?.role === 'admin' ? '/admin' : ROUTES.DASHBOARD;
      navigate(destination, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="dark" className="p-8 animate-fade-in">
      <div className="mb-8">
        <p className="font-mono-caps text-[11px] text-accent-periwinkle mb-3">Sign In</p>
        <h2 className="text-[22px] font-medium text-on-dark tracking-[-0.22px] font-display">
          Welcome back
        </h2>
        <p className="text-on-dark/50 text-[16px] leading-[20.8px] tracking-[-0.16px] mt-1">
          Enter your credentials to continue
        </p>
      </div>

      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          register={register}
          error={errors.email}
          autoComplete="username"
          dark
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          register={register}
          error={errors.password}
          autoComplete="current-password"
          dark
        />

        <div className="flex justify-end">
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-[14px] text-accent-periwinkle hover:text-accent-periwinkle/80 transition-colors font-display"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" variant="secondary" isLoading={isLoading}>
          Sign In
        </Button>
      </FormWrapper>

      <div className="mt-8 pt-6 border-t border-white/[0.08]">
        <p className="text-center text-on-dark/40 text-[14px] font-display">
          Don&apos;t have an account?{' '}
          <Link
            to={ROUTES.REGISTER}
            className="text-on-dark font-medium hover:text-accent-periwinkle transition-colors"
          >
            Create account
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default LoginPage;
