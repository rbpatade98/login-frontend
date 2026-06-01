import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, User, Shield } from 'lucide-react';

import { registerSchema } from '@/features/auth/validations/auth.schemas';
import useAuth from '@/features/auth/hooks/useAuth';
import { getErrorMessage } from '@/api/axios';
import { ROUTES, MESSAGES } from '@/constants';
import useDocumentTitle from '@/hooks/useDocumentTitle';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import FormWrapper from '@/components/forms/FormWrapper';

const RegisterPage = () => {
  useDocumentTitle('Register');
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', email: '', password: '', role: 'user' },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await registerUser(data);
      toast.success(MESSAGES.REGISTER_SUCCESS);
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
        <p className="font-mono-caps text-[11px] text-accent-periwinkle mb-3">Get Started</p>
        <h2 className="text-[22px] font-medium text-on-dark tracking-[-0.22px] font-display">
          Create an account
        </h2>
        <p className="text-on-dark/50 text-[16px] leading-[20.8px] tracking-[-0.16px] mt-1">
          Start building with AuthSystem
        </p>
      </div>

      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Username"
          name="username"
          type="text"
          placeholder="john_doe"
          icon={User}
          register={register}
          error={errors.username}
          dark
        />

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          register={register}
          error={errors.email}
          dark
        />

        <PasswordInput
          label="Password"
          name="password"
          placeholder="Min 8 chars with A-z, 0-9, @$!%*?&"
          register={register}
          error={errors.password}
          dark
        />

        <div className="space-y-1.5">
          <label className="block font-mono-caps text-[11px] leading-[11px] tracking-[0.55px] text-on-dark/60">
            Role
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Shield className="w-4 h-4 text-on-dark/30" />
            </div>
            <select
              {...register('role')}
              className="w-full pl-10 pr-4 py-3 rounded-sm text-[16px] leading-[20.8px] tracking-[-0.16px] font-display transition-all duration-200 focus:outline-none focus:ring-2 bg-surface-dark-soft border border-white/10 text-on-dark focus:ring-accent-periwinkle/40 focus:border-accent-periwinkle/40 hover:border-white/20 appearance-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <Button type="submit" variant="secondary" isLoading={isLoading}>
          Create Account
        </Button>
      </FormWrapper>

      <div className="mt-8 pt-6 border-t border-white/[0.08]">
        <p className="text-center text-on-dark/40 text-[14px] font-display">
          Already have an account?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="text-on-dark font-medium hover:text-accent-periwinkle transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default RegisterPage;
