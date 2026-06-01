import { Users, Mail, Calendar, Shield } from 'lucide-react';
import useAuth from '@/features/auth/hooks/useAuth';
import useDocumentTitle from '@/hooks/useDocumentTitle';
import Card from '@/components/ui/Card';

const StatCard = ({ icon: Icon, label, value, variant = 'light' }) => (
  <Card variant={variant} className="p-8">
    <p className="font-mono-caps text-[11px] tracking-[0.55px] text-body mb-3">{label}</p>
    <p className="text-[28px] font-medium tracking-[-0.42px] font-display text-ink leading-[32.2px]">
      {value}
    </p>
    <div className="mt-4">
      <Icon className="w-5 h-5 text-body/40" />
    </div>
  </Card>
);

const MintStatCard = ({ icon: Icon, label, value }) => (
  <Card variant="mint" className="p-8">
    <p className="font-mono-caps text-[11px] tracking-[0.55px] text-ink/60 mb-3">{label}</p>
    <p className="text-[28px] font-medium tracking-[-0.42px] font-display text-ink leading-[32.2px]">
      {value}
    </p>
    <div className="mt-4">
      <Icon className="w-5 h-5 text-ink/30" />
    </div>
  </Card>
);

const DashboardPage = () => {
  useDocumentTitle('Dashboard');
  const { user } = useAuth();

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Hero section — dark band */}
      <div className="bg-canvas-dark rounded-sm p-10 relative overflow-hidden">
        {/* Subtle gradient accent */}
        <div
          className="absolute top-0 right-0 w-64 h-64 opacity-20 blur-[100px]"
          style={{
            background: 'linear-gradient(135deg, #fc4c02, #ef2cc1, #bdbbff)',
          }}
        />
        <div className="relative z-10">
          <p className="font-mono-caps text-[11px] text-accent-periwinkle tracking-[0.55px] mb-4">
            Dashboard
          </p>
          <h1 className="text-[40px] font-medium text-on-dark tracking-[-0.8px] font-display leading-[48px]">
            Welcome back,{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, #fc4c02, #ef2cc1, #bdbbff)',
              }}
            >
              {user?.username || 'User'}
            </span>
          </h1>
          <p className="text-on-dark/50 text-[18px] leading-[23.4px] tracking-[-0.18px] mt-2 font-display">
            Here&apos;s an overview of your account
          </p>
        </div>
      </div>


      {/* Account details card */}
      <Card className="p-8">
        <p className="font-mono-caps text-[11px] text-body tracking-[0.55px] mb-6">
          Account Details
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-accent-periwinkle/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-accent-periwinkle" />
            </div>
            <div>
              <p className="font-mono-caps text-[11px] text-body tracking-[0.55px]">Username</p>
              <p className="text-ink text-[16px] font-medium font-display tracking-[-0.16px] mt-1">
                {user?.username || '—'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-accent-magenta/10 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-accent-magenta" />
            </div>
            <div>
              <p className="font-mono-caps text-[11px] text-body tracking-[0.55px]">Email</p>
              <p className="text-ink text-[16px] font-medium font-display tracking-[-0.16px] mt-1">
                {user?.email || '—'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-accent-orange/10 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-accent-orange" />
            </div>
            <div>
              <p className="font-mono-caps text-[11px] text-body tracking-[0.55px]">Account ID</p>
              <p className="text-ink text-[14px] font-display tracking-[-0.16px] mt-1 font-mono-caps !text-[12px] !tracking-[0.04em]">
                {user?.id || '—'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-sm bg-accent-mint flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-ink/60" />
            </div>
            <div>
              <p className="font-mono-caps text-[11px] text-body tracking-[0.55px]">Session</p>
              <p className="text-ink text-[16px] font-medium font-display tracking-[-0.16px] mt-1">
                Currently Active
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Footer wordmark */}
      <div className="py-10 text-center">
        <p className="text-[40px] sm:text-[64px] font-medium tracking-[-1.92px] font-display text-hairline leading-[70.4px] select-none">
          authsystem
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
