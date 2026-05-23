import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Button } from '../components/ui/Button.jsx';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Building } from 'lucide-react';
import api from '../lib/api.js';
import { TaskFlowLogo } from '../components/ui/Typography.jsx';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationCode, setOrganizationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password, organizationCode });
      const { token, user } = response.data;

      if (user?.twoFactorEnabled) {
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
        title: 'Admin Workspace Opened',
        description: `Welcome back, ${user.name}.`,
        variant: 'success',
      });
      navigate('/');
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
      className="p-5 border border-indigo-500/20 bg-[#111827]/90 backdrop-blur-xl rounded-lg shadow-xl shadow-indigo-950/20 space-y-5 w-full max-w-md"
    >
      <TaskFlowLogo variant="inline" size="xs" showTagline={false} className="mb-1" wordmarkClassName="text-lg text-slate-100" taglineClassName="text-slate-300" />
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-200">
          <Building className="h-3.5 w-3.5" />
          Organization Control Center
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Organization Admin Sign In</h2>
        <p className="text-slate-300 text-xs">
          Enter your credentials to access the organization workspace.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          label="Workspace Organization Code"
          icon={Building}
          placeholder="TF2"
          value={organizationCode}
          onChange={(e) => setOrganizationCode(e.target.value)}
          required
        />

        <Input
          type="email"
          label="Email Address"
          icon={Mail}
          placeholder="admin@taskflow.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-200 tracking-wide uppercase">Password</label>
            <Link to="/forgot-password" className="text-[11px] font-bold text-indigo-300 hover:underline">
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

        <Button type="submit" className="w-full mt-2" loading={loading}>
          Sign In <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </form>

      <div className="text-center text-xs text-slate-300 space-y-2 pt-2 border-t border-indigo-500/10">
        <div>
          Need the platform console instead?{' '}
          <Link to="/superadmin" className="text-indigo-300 hover:text-indigo-200 font-bold transition-colors">
            Open Super Admin Sign In
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLogin;