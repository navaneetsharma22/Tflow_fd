import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { TaskFlowLogo } from '../components/ui/Typography.jsx';

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
        {/* Abstract Ambient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        
        {/* Brand Header */}
        <TaskFlowLogo
          variant="inline"
          size="sm"
          showTagline={false}
          className="relative z-10"
          wordmarkClassName="text-white text-2xl"
          taglineClassName="text-white/70"
        />

        {/* Feature Teasers */}
        <div className="space-y-6 relative z-10 max-w-md">
          <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
            {isSuperAdminAuth
              ? 'Secure the entire platform from one control plane.'
              : 'Streamline Workspace Collaborations at Multi-Tenant Scale.'}
          </h1>
          <p className="text-white/80 leading-relaxed">
            {isSuperAdminAuth
              ? 'Enter the platform console to oversee tenants, billing, feature flags, security posture, and system health.'
              : 'Experience our hardened enterprise-grade engine featuring real-time socket chats, in-memory dependency cycle validation, and automated recurring tasks.'}
          </p>
        </div>

        {/* Brand Footer */}
        <div className="text-white/60 text-xs relative z-10">
          {isSuperAdminAuth
            ? `Platform governance · Security · Tenant oversight · ${new Date().getFullYear()}`
            : `© ${new Date().getFullYear()} TaskFlow Inc. Hardened & Secured.`}
        </div>
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
