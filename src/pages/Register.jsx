import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Building, Loader2, ArrowRight } from 'lucide-react';
import api from '../lib/api.js';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Fire secure backend registration (role stripped in validator on server side, defaulting to DEVELOPER)
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
        organizationName: orgName,
      });

      const payload = response.data?.data ?? response.data;
      const token = payload?.token || payload?.accessToken;
      const user = payload?.user;

      if (!token || !user) {
        throw new Error('Invalid auth response received from the backend.');
      }
      login(token, user);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Registration rejected. Passwords require uppercase, lowercase, numbers, and symbols.'
      );
    } finally {
      setLoading(false);
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
        <h2 className="text-3xl font-extrabold tracking-tight">Create Workspace</h2>
        <p className="text-muted-foreground text-sm">
          Initialize your new tenant workspace partition securely.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl border border-destructive/20 bg-destructive/10 text-destructive text-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
              className="w-full pl-11 pr-4 py-3 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              required
              className="w-full pl-11 pr-4 py-3 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Workspace Organization Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Organization / Team Name</label>
          <div className="relative">
            <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Organization name"
              required
              className="w-full pl-11 pr-4 py-3 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground/80">Secure Password</label>
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
          <p className="text-[10px] text-muted-foreground tracking-tight leading-tight">
            Must contain 8+ characters, uppercase, lowercase, numbers, and symbols.
          </p>
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
              Register Workspace <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        Already registered?{' '}
        <Link to="/login" className="text-orange-500 hover:text-orange-400 font-semibold transition-colors">
          Sign In
        </Link>
      </div>
    </motion.div>
  );
};

export default Register;
