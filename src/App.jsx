import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import AppRoutes from '@/routes/AppRoutes';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#000000',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '4px',
              fontSize: '14px',
              fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
              padding: '12px 16px',
              letterSpacing: '-0.16px',
            },
            success: {
              iconTheme: {
                primary: '#000000',
                secondary: '#c8f6f9',
              },
            },
            error: {
              iconTheme: {
                primary: '#fc4c02',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
