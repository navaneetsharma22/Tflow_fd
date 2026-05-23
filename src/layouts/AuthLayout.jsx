import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // If already logged in, redirect straight to the Dashboard home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen w-screen flex bg-background text-foreground transition-colors duration-300 overflow-x-hidden select-none">
      {/* Left Column: Visual Brand Banner (Hidden on mobile) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-tr from-orange-600 to-amber-500 p-12 relative overflow-hidden">
        {/* Abstract Ambient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        
        {/* Brand Header */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-orange-600 font-extrabold text-xl shadow-lg">
            TF
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            TaskFlow<span className="text-white/80 font-normal">2.0</span>
          </span>
        </div>

        {/* Feature Teasers */}
        <div className="space-y-6 relative z-10 max-w-md">
          <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight">
            Streamline Workspace Collaborations at Multi-Tenant Scale.
          </h1>
          <p className="text-white/80 leading-relaxed">
            Experience our hardened enterprise-grade engine featuring real-time socket chats, in-memory dependency cycle validation, and automated recurring tasks.
          </p>
        </div>

        {/* Brand Footer */}
        <div className="text-white/60 text-xs relative z-10">
          © {new Date().getFullYear()} TaskFlow Inc. Hardened & Secured.
        </div>
      </div>

      {/* Right Column: Authentication Form Slot */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-orange-500/5 via-background to-background">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
