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

const Login = () => {
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
      // Direct call to our secure backend Auth API
      const response = await api.post('/auth/login', { email, password, organizationCode });
      
      const { token, user } = response.data;
      
      // If user has 2FA enabled, redirect to Verification screen
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
        title: 'Sign In Successful',
        description: `Welcome back to TaskFlow, ${user.name}!`,
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

  // Helper to prefill common workspace credentials immediately for easy local validation
  const prefillCredentials = (role) => {
    if (role === 'DEVELOPER') {
      setEmail('developer@taskflow.com');
      setPassword('Password123!');
      setOrganizationCode('TF2');
    } else if (role === 'ADMIN') {
      setEmail('navaneet@taskflow.com');
      setPassword('1234567');
      setOrganizationCode('TF2');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      // SPECIFICATION: border radius exactly 16px (rounded-lg), padding 20px (p-5), soft shadow
      className="p-5 border border-border bg-card/40 backdrop-blur-xl rounded-lg shadow-xl space-y-5 w-full max-w-md"
    >
      <TaskFlowLogo variant="inline" size="xs" showTagline={false} className="mb-1" wordmarkClassName="text-lg" />
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold tracking-tight">Welcome Back</h2>
        <p className="text-muted-foreground text-xs">
          Enter your credentials to enter your secure tenant workspace.
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive text-xs font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Workspace Code Input */}
        <Input
          type="text"
          label="Workspace Organization Code"
          icon={Building}
          placeholder="TF2"
          value={organizationCode}
          onChange={(e) => setOrganizationCode(e.target.value)}
          required
        />

        {/* Email Input */}
        <Input
          type="email"
          label="Email Address"
          icon={Mail}
          placeholder="admin@taskflow.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">Password</label>
            <Link to="/forgot-password" className="text-[11px] font-bold text-orange-500 hover:underline">
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

        {/* Submit Action */}
        <Button type="submit" className="w-full mt-2" loading={loading}>
          Sign In <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </form>

      {/* Developer Demo Prefill Quick-links */}
      <div className="pt-4 border-t border-border/50 space-y-2.5">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider text-center">
          Quick Prefill Dev Accounts
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => prefillCredentials('DEVELOPER')}
            className="py-1.5 px-3 rounded-lg border border-border hover:border-orange-500/50 bg-muted/20 hover:bg-orange-500/5 text-[11px] font-semibold transition-all cursor-pointer text-center text-muted-foreground hover:text-foreground"
          >
            Developer Account
          </button>
          <button
            onClick={() => prefillCredentials('ADMIN')}
            className="py-1.5 px-3 rounded-lg border border-border hover:border-orange-500/50 bg-muted/20 hover:bg-orange-500/5 text-[11px] font-semibold transition-all cursor-pointer text-center text-muted-foreground hover:text-foreground"
          >
            Organization Admin Account
          </button>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground space-y-2 pt-2 border-t border-border/30">
        <div>
          Don't have an account?{' '}
          <Link to="/register" className="text-orange-500 hover:text-orange-400 font-bold transition-colors">
            Create Workspace
          </Link>
        </div>
        <div>
          Got an invite code?{' '}
          <Link to="/org-code" className="text-orange-500 hover:text-orange-400 font-bold transition-colors">
            Join Team Workspace
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
