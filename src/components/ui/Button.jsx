import { Loader2 } from 'lucide-react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative w-full flex items-center justify-center gap-2 px-6 py-3 font-mono-caps text-[16px] leading-[16px] tracking-[0.08px] rounded-sm transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-ink text-white hover:bg-ink/90 focus:ring-ink active:scale-[0.98]',
    secondary:
      'bg-accent-mint text-ink hover:bg-accent-mint/80 focus:ring-accent-mint active:scale-[0.98]',
    white:
      'bg-canvas text-ink border border-hairline hover:bg-gray-50 focus:ring-ink active:scale-[0.98]',
    ghost:
      'bg-surface-dark-soft text-on-dark hover:bg-surface-dark-soft/80 focus:ring-white/30 active:scale-[0.98]',
    outline:
      'bg-canvas text-ink border border-black/8 hover:border-black/20 focus:ring-ink rounded-xs active:scale-[0.98]',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {isLoading ? 'PLEASE WAIT...' : children}
    </button>
  );
};

export default Button;
