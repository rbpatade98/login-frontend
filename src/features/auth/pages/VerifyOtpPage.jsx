import { useState, useRef, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { KeyRound, ArrowLeft } from 'lucide-react';

import useAuthStore from '@/features/auth/store/useAuthStore';
import { getErrorMessage } from '@/api/axios';
import { ROUTES, MESSAGES } from '@/constants';
import useDocumentTitle from '@/hooks/useDocumentTitle';

import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const OTP_LENGTH = 6;

const VerifyOtpPage = () => {
  useDocumentTitle('Verify OTP');
  const navigate = useNavigate();
  const resetEmail = useAuthStore((state) => state.resetEmail);
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const sendOtp = useAuthStore((state) => state.sendOtp);

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef([]);

  // If no email in state, redirect back
  if (!resetEmail) {
    return <Navigate to={ROUTES.FORGOT_PASSWORD} replace />;
  }

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasteData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);

    const focusIndex = Math.min(pasteData.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== OTP_LENGTH) {
      toast.error('Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp(otpString);
      toast.success(MESSAGES.OTP_VERIFIED);
      navigate(ROUTES.RESET_PASSWORD);
    } catch (error) {
      toast.error(getErrorMessage(error));
      setOtp(new Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      await sendOtp(resetEmail);
      toast.success(MESSAGES.OTP_SENT);
      setCountdown(60);
      setOtp(new Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Card variant="dark" className="p-8 animate-fade-in">
      <div className="mb-8">
        <p className="font-mono-caps text-[11px] text-accent-magenta mb-3">Verification</p>
        <h2 className="text-[22px] font-medium text-on-dark tracking-[-0.22px] font-display">
          Enter verification code
        </h2>
        <p className="text-on-dark/50 text-[16px] leading-[20.8px] tracking-[-0.16px] mt-1">
          We sent a 6-digit code to
        </p>
        <p className="text-accent-periwinkle text-[14px] font-medium font-display mt-0.5">
          {resetEmail}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP input boxes */}
        <div>
          <label className="block font-mono-caps text-[11px] text-on-dark/60 tracking-[0.55px] mb-2">
            OTP Code
          </label>
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-14 text-center text-[22px] font-medium text-on-dark font-display tracking-[-0.22px] bg-surface-dark-soft border border-white/10 rounded-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-periwinkle/40 focus:border-accent-periwinkle/40 hover:border-white/20"
                autoFocus={index === 0}
              />
            ))}
          </div>
        </div>

        <Button type="submit" variant="secondary" isLoading={isLoading}>
          Verify OTP
        </Button>
      </form>

      {/* Resend OTP */}
      <div className="text-center mt-6">
        {countdown > 0 ? (
          <p className="text-on-dark/40 text-[14px] font-display">
            Resend code in{' '}
            <span className="text-accent-periwinkle font-medium font-mono-caps text-[11px]">
              {countdown}S
            </span>
          </p>
        ) : (
          <button
            onClick={handleResendOtp}
            disabled={isResending}
            className="text-[14px] text-accent-periwinkle hover:text-accent-periwinkle/80 font-medium transition-colors cursor-pointer disabled:opacity-50 font-display"
          >
            {isResending ? 'Sending...' : 'Resend code'}
          </button>
        )}
      </div>

      <div className="text-center mt-6 pt-6 border-t border-white/[0.08]">
        <button
          onClick={() => navigate(ROUTES.FORGOT_PASSWORD)}
          className="inline-flex items-center gap-1.5 text-[14px] text-on-dark/40 hover:text-on-dark transition-colors cursor-pointer font-display"
        >
          <ArrowLeft className="w-4 h-4" />
          Change email
        </button>
      </div>
    </Card>
  );
};

export default VerifyOtpPage;
