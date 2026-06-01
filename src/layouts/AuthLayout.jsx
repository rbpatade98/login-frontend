import { Outlet } from 'react-router-dom';
import { Shield } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas-dark relative overflow-hidden px-4 py-8">
      {/* Brand gradient ribbon — the single decorative element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orange → Magenta → Periwinkle gradient shapes */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[150px] opacity-30 animate-gradient"
          style={{
            background: 'linear-gradient(135deg, #fc4c02 0%, #ef2cc1 50%, #bdbbff 100%)',
          }}
        />
        <div
          className="absolute -bottom-48 -left-32 w-[400px] h-[400px] rounded-full blur-[130px] opacity-20 animate-gradient [animation-delay:2s]"
          style={{
            background: 'linear-gradient(225deg, #bdbbff 0%, #ef2cc1 50%, #fc4c02 100%)',
          }}
        />
        {/* Subtle gradient line */}
        <div
          className="absolute top-[30%] left-0 right-0 h-[1px] opacity-20"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #fc4c02 25%, #ef2cc1 50%, #bdbbff 75%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-sm bg-ink mb-5">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-[28px] font-medium text-on-dark tracking-[-0.42px] font-display">
            Auth<span className="text-accent-periwinkle">System</span>
          </h1>
        </div>

        {/* Page content (rendered by child route) */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
