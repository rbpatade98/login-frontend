import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

const PasswordInput = ({
  label,
  name,
  register,
  error,
  placeholder = 'Enter password',
  className = '',
  dark = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={name}
          className={`block font-mono-caps text-[11px] leading-[11px] tracking-[0.55px] ${
            dark ? 'text-on-dark/60' : 'text-body'
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Lock className={`w-4 h-4 ${dark ? 'text-on-dark/30' : 'text-body/60'}`} />
        </div>
        <input
          id={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-full pl-10 pr-12 py-3 rounded-sm text-[16px] leading-[20.8px] tracking-[-0.16px] font-display transition-all duration-200 focus:outline-none focus:ring-2 ${
            dark
              ? 'bg-surface-dark-soft border border-white/10 text-on-dark placeholder-white/30 focus:ring-accent-periwinkle/40 focus:border-accent-periwinkle/40 hover:border-white/20'
              : 'bg-canvas border border-black/8 text-ink placeholder-body/60 focus:ring-ink/20 focus:border-ink/30 hover:border-black/20'
          } ${
            error
              ? dark
                ? 'border-accent-orange/50 focus:ring-accent-orange/30'
                : 'border-red-400 focus:ring-red-400/30'
              : ''
          } ${className}`}
          {...(register ? register(name) : {})}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute inset-y-0 right-0 pr-3.5 flex items-center transition-colors cursor-pointer ${
            dark ? 'text-on-dark/40 hover:text-on-dark/70' : 'text-body hover:text-ink'
          }`}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
      {error && (
        <p className={`text-[14px] leading-[19.6px] mt-1 ${dark ? 'text-accent-orange' : 'text-red-500'}`}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
