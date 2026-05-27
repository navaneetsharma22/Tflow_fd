import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, Building } from 'lucide-react';
import api from '../lib/api.js';
import { TaskFlowLogo } from '../components/ui/Typography.jsx';

const SuperAdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const superAdminOrgCode = import.meta.env.VITE_SUPER_ADMIN_ORG_CODE || 'TF-PLATFORM';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationCode] = useState(superAdminOrgCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password, organizationCode });
      const payload = response.data?.data ?? response.data;
      const token = payload?.token || payload?.accessToken;
      const user = payload?.user;

      if (!token || !user) {
        throw new Error('Invalid auth response received from the backend.');
      }

      if (user?.twoFactorEnabled) {
        login(token, user);
        toast({
          title: '2FA Verification Required',
          description: 'Please verify using your multi-factor auth code.',
          variant: 'info',
        });
        navigate('/verify-2fa');
        return;
      }

      login(token, user);
      toast({
        title: 'Super Admin Console Opened',
        description: `Welcome back, ${user.name}.`,
        variant: 'success',
      });
      navigate('/superadmin/organizations');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Connection rejected. Ensure the credentials are valid and the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md space-y-5 rounded-lg border border-violet-500/20 bg-[#0b1020]/90 p-5 shadow-xl backdrop-blur-xl"
    >
      <TaskFlowLogo variant="inline" size="xs" showTagline={false} className="mb-1" wordmarkClassName="text-lg" />
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-violet-200">
          <ShieldCheck className="h-3.5 w-3.5" />
          Platform Control Center
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Super Admin Sign In</h2>
        <p className="text-xs text-muted-foreground">
          Sign in to manage tenants, billing, feature flags, security posture, and system health.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3.5 text-xs font-semibold text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-foreground/80">
            Platform Code
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/5 px-4 py-3 text-sm text-violet-100/90">
            <Building className="h-4 w-4 text-violet-300" />
            <span className="font-mono font-semibold">{organizationCode || 'Configure VITE_SUPER_ADMIN_ORG_CODE'}</span>
            <span className="text-[11px] text-violet-200/70">locked for platform access</span>
          </div>
        </div>

        <Input
          type="email"
          label="Email Address"
          icon={Mail}
          placeholder="platform-admin@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wide text-foreground/80">Password</label>
            <Link to="/forgot-password" className="text-[11px] font-bold text-violet-300 hover:underline">
              Forgot?
            </Link>
          </div>
          <Input
            type="password"
            icon={Lock}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-linear-to-r from-violet-600 to-fuchsia-500 shadow-violet-500/20 hover:from-violet-500 hover:to-fuchsia-400"
          loading={loading}
        >
          Enter Console <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <div className="rounded-lg border border-violet-500/10 bg-violet-500/5 p-3 text-xs text-violet-100/85">
        This console is isolated from the main workspace login flow.
      </div>

      <div className="text-center text-xs text-muted-foreground">
        Need platform access? Contact the TaskFlow owner or security team.
      </div>
    </motion.div>
  );
};

export default SuperAdminLogin;