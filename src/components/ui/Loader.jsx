import { Loader2 } from 'lucide-react';

const Loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-ink`} />
    </div>
  );
};

// Full screen loader — dark band style
export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-canvas-dark">
    <div className="text-center space-y-4">
      <Loader size="lg" className="[&_svg]:text-on-dark" />
      <p className="text-on-dark/50 text-[14px] font-mono-caps animate-pulse">Loading</p>
    </div>
  </div>
);

export default Loader;
