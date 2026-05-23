import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import AuthLayout from './layouts/AuthLayout.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Projects from './pages/Projects.jsx';
import Tasks from './pages/Tasks.jsx';
import Team from './pages/Team.jsx';
import Chat from './pages/Chat.jsx';
import AI from './pages/AI.jsx';
import Settings from './pages/Settings.jsx';

import { ToastProvider } from './components/ui/Toast.jsx';

import OrgCode from './pages/OrgCode.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Verify2FA from './pages/Verify2FA.jsx';

import Organizations from './pages/Organizations.jsx';
import Billing from './pages/Billing.jsx';
import FeatureControls from './pages/FeatureControls.jsx';
import Security from './pages/Security.jsx';
import Analytics from './pages/Analytics.jsx';
import AuditLogs from './pages/AuditLogs.jsx';
import SystemHealth from './pages/SystemHealth.jsx';

import Employees from './pages/Employees.jsx';
import Roles from './pages/Roles.jsx';
import Departments from './pages/Departments.jsx';
import Reports from './pages/Reports.jsx';
import Wiki from './pages/Wiki.jsx';

// Instantiate TanStack Query client for efficient background request caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <BrowserRouter>
              <Routes>
              {/* Guest Authentication Routing */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/verify-2fa" element={<Verify2FA />} />
                <Route path="/org-code" element={<OrgCode />} />
              </Route>

              {/* Secure Multi-Tenant Dashboard Routing */}
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/tasks" element={<Tasks />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/ai" element={<AI />} />
                  <Route path="/settings" element={<Settings />} />

                  {/* Super Admin Workspace Routes */}
                  <Route path="/organizations" element={<Organizations />} />
                  <Route path="/billing" element={<Billing />} />
                  <Route path="/features" element={<FeatureControls />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/audit" element={<AuditLogs />} />
                  <Route path="/health" element={<SystemHealth />} />

                  {/* Organization Admin Workspace Routes */}
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/roles" element={<Roles />} />
                  <Route path="/departments" element={<Departments />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/wiki" element={<Wiki />} />
                </Route>
              </Route>

              {/* Catch-all fallback */}
              <Route
                path="*"
                element={
                  <div className="flex h-screen w-screen flex-col items-center justify-center bg-background gap-4">
                    <h1 className="text-6xl font-extrabold text-orange-500">404</h1>
                    <p className="text-muted-foreground text-sm font-medium">Page could not be resolved inside this workspace.</p>
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
