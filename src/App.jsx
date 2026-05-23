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
