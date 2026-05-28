import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { TaskFlowLogo } from '../components/ui/Typography.jsx';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const isSuperAdminAuth = location.pathname.startsWith('/superadmin');
  const shellClasses = isSuperAdminAuth
    ? 'bg-gradient-to-tr from-violet-700 to-fuchsia-500'
    : 'bg-gradient-to-tr from-orange-600 to-amber-500';
  const rightPanelClasses = isSuperAdminAuth
    ? 'from-violet-500/5 via-background to-background'
    : 'from-orange-500/5 via-background to-background';

  // If already logged in, redirect straight to the Dashboard home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen w-screen flex bg-background text-foreground transition-colors duration-300 overflow-x-hidden select-none">
      {/* Left Column: Visual Brand Banner (Hidden on mobile) */}
      <div className={`hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden ${shellClasses}`}>
        {/* Slow-drifting premium tech grid pattern */}
        <motion.div
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"
        />

        {/* Abstract Ambient Glow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />

        {/* Floating Glowing Fluid Blobs */}
        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-20 -left-20 h-[350px] w-[350px] rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.85, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 -right-20 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 30, -40, 0],
            y: [0, 60, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-white/5 blur-3xl"
        />

        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <TaskFlowLogo
            variant="inline"
            size="sm"
            showTagline={false}
            wordmarkClassName="text-white text-2xl"
            taglineClassName="text-white/70"
          />
        </motion.div>

        {/* Feature Teasers */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-6 relative z-10 max-w-md"
        >
          <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
            {isSuperAdminAuth
              ? 'Secure the entire platform from one control plane.'
              : 'Streamline Workspace Collaborations at Multi-Tenant Scale.'}
          </h1>
          <p className="text-white/85 leading-relaxed font-medium drop-shadow-xs">
            {isSuperAdminAuth
              ? 'Enter the platform console to oversee tenants, billing, feature flags, security posture, and system health.'
              : 'Experience our hardened enterprise-grade engine featuring real-time socket chats, in-memory dependency cycle validation, and automated recurring tasks.'}
          </p>
        </motion.div>

        {/* Brand Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white/60 text-xs relative z-10 font-semibold tracking-wide"
        >
          {isSuperAdminAuth
            ? `Platform governance · Security · Tenant oversight · ${new Date().getFullYear()}`
            : `© ${new Date().getFullYear()} TaskFlow Inc. Hardened & Secured.`}
        </motion.div>
      </div>

      {/* Right Column: Authentication Form Slot */}
      <div className={`flex-1 flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] ${rightPanelClasses}`}>
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
