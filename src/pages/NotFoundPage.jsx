import { Link } from 'react-router-dom';
import { Home, FileQuestion } from 'lucide-react';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import { ROUTES } from '@/constants';

const NotFoundPage = () => {
  useDocumentTitle('Page Not Found');

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas-dark px-4 relative overflow-hidden">
      {/* Gradient accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-15 blur-[120px]"
        style={{
          background: 'linear-gradient(135deg, #fc4c02, #ef2cc1, #bdbbff)',
        }}
      />

      <div className="relative text-center space-y-8 max-w-md">
        <p className="font-mono-caps text-[11px] text-accent-orange tracking-[0.55px]">Error 404</p>

        <h1 className="text-[64px] font-medium text-on-dark tracking-[-1.92px] font-display leading-[70.4px]">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-[22px] font-medium text-on-dark tracking-[-0.22px] font-display">
            Page not found
          </h2>
          <p className="text-on-dark/50 text-[16px] leading-[20.8px] tracking-[-0.16px] font-display">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-sm font-mono-caps text-[16px] leading-[16px] tracking-[0.08px] hover:bg-ink/90 transition-all duration-200"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
