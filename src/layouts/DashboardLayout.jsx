import { Outlet } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
