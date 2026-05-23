import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import api from '../lib/api.js';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Direct call to our secure backend Auth API
      const response = await api.post('/auth/login', { email, password });
      
      const { token, user } = response.data;
      login(token, user);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Connection rejected. Ensure the backend and Redis are running.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Helper to prefill developer credentials immediately for easy local validation
  const prefillCredentials = (role) => {
    if (role === 'DEVELOPER') {
      setEmail('developer@taskflow.com');
      setPassword('Password123!');
    } else if (role === 'ADMIN') {
      setEmail('admin@taskflow.com');
      setPassword('Password123!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="p-8 md:p-10 border border-border bg-card/40 backdrop-blur-xl rounded-3xl shadow-xl space-y-6"
    >
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight">Welcome Back</h2>
        <p className="text-muted-foreground text-sm">
          Enter your credentials to enter your secure tenant workspace.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@taskflow.com"
              required
              className="w-full pl-11 pr-4 py-3 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full pl-11 pr-4 py-3 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Submit Action */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all duration-200 shadow-md shadow-orange-600/20 hover:shadow-orange-500/30 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer mt-6"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Sign In <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Developer Demo Prefill Quick-links */}
      <div className="pt-4 border-t border-border space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
          Quick Prefill Dev Accounts
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => prefillCredentials('DEVELOPER')}
            className="py-1.5 px-3 rounded-lg border border-border hover:border-orange-500/50 bg-muted/20 hover:bg-orange-500/5 text-xs font-medium transition-all cursor-pointer text-center"
          >
            Developer Account
          </button>
          <button
            onClick={() => prefillCredentials('ADMIN')}
            className="py-1.5 px-3 rounded-lg border border-border hover:border-orange-500/50 bg-muted/20 hover:bg-orange-500/5 text-xs font-medium transition-all cursor-pointer text-center"
          >
            Superadmin Account
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{' '}
        <Link to="/register" className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">
          Create Workspace
        </Link>
      </div>
    </motion.div>
  );
};

export default Login;
