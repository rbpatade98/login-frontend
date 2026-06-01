import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, ArrowLeft } from 'lucide-react';

import { sendOtpSchema } from '@/features/auth/validations/auth.schemas';
import useAuthStore from '@/features/auth/store/useAuthStore';
import { getErrorMessage } from '@/api/axios';
import { ROUTES, MESSAGES } from '@/constants';
import useDocumentTitle from '@/hooks/useDocumentTitle';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import FormWrapper from '@/components/forms/FormWrapper';

const ForgotPasswordPage = () => {
  useDocumentTitle('Forgot Password');
  const navigate = useNavigate();
  const sendOtp = useAuthStore((state) => state.sendOtp);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sendOtpSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await sendOtp(data.email);
      toast.success(MESSAGES.OTP_SENT);
      navigate(ROUTES.VERIFY_OTP);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="dark" className="p-8 animate-fade-in">
      <div className="mb-8">
        <p className="font-mono-caps text-[11px] text-accent-orange mb-3">Password Recovery</p>
        <h2 className="text-[22px] font-medium text-on-dark tracking-[-0.22px] font-display">
          Forgot your password?
        </h2>
        <p className="text-on-dark/50 text-[16px] leading-[20.8px] tracking-[-0.16px] mt-1">
          Enter your email and we&apos;ll send you a verification code
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
          dark
        />

        <Button type="submit" variant="secondary" isLoading={isLoading}>
          Send OTP
        </Button>
      </FormWrapper>

      <div className="text-center mt-8 pt-6 border-t border-white/[0.08]">
        <Link
          to={ROUTES.LOGIN}
          className="inline-flex items-center gap-1.5 text-[14px] text-on-dark/40 hover:text-on-dark transition-colors font-display"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
      </div>
    </Card>
  );
};

export default ForgotPasswordPage;
