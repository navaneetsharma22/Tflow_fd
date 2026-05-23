import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useTheme } from '../hooks/useTheme.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  MessageSquare,
  Sparkles,
  Settings,
  LogOut,
  Sun,
  Moon,
  Building,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  User,
  ShieldCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Sliders,
  ShieldAlert,
  TrendingUp,
  ScrollText,
  Activity,
  Shield,
  BookOpen
} from 'lucide-react';
import CommandPalette from '../components/ui/CommandPalette.jsx';

const DashboardLayout = () => {
  const { user, logout, activeOrgId, changeOrganization } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Component Layout States
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Notifications Mock State matching secure backend notifications with priorities
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Sarah Connor assigned you "Setup auth encryption bounds"', read: false, time: '2 hrs ago', priority: 'HIGH' },
    { id: 2, text: 'AI Risk Telemetry detected potential bottleneck in Alpha Sprint', read: false, time: '4 hrs ago', priority: 'CRITICAL' },
    { id: 3, text: 'System check completed: circular cycle check O(1) traversal resolved', read: true, time: '1 day ago', priority: 'INFO' },
  ]);
  const [notificationFilter, setNotificationFilter] = useState('ALL'); // 'ALL', 'UNREAD'

  const superAdminItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Organizations', path: '/organizations', icon: Building },
    { name: 'Plans & Billing', path: '/billing', icon: DollarSign },
    { name: 'Feature Controls', path: '/features', icon: Sliders },
    { name: 'Security', path: '/security', icon: ShieldAlert },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
    { name: 'Audit Logs', path: '/audit', icon: ScrollText },
    { name: 'System Health', path: '/health', icon: Activity },
    { name: 'Profile Settings', path: '/settings', icon: Settings },
  ];

  const orgAdminItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Employees', path: '/employees', icon: Users },
    { name: 'Roles', path: '/roles', icon: Shield },
    { name: 'Departments', path: '/departments', icon: Building },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Reports', path: '/reports', icon: ScrollText },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
    { name: 'Messages', path: '/chat', icon: MessageSquare },
    { name: 'Wiki CMS', path: '/wiki', icon: BookOpen },
    { name: 'Audit Logs', path: '/audit', icon: ScrollText },
    { name: 'Organization Settings', path: '/settings', icon: Settings },
  ];

  const standardItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Chat', path: '/chat', icon: MessageSquare },
    { name: 'Wiki CMS', path: '/wiki', icon: BookOpen },
    { name: 'AI Services', path: '/ai', icon: Sparkles },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const menuItems =
    user?.role === 'SUPER_ADMIN'
      ? superAdminItems
      : user?.role === 'ADMIN' || user?.role === 'ORG_ADMIN'
      ? orgAdminItems
      : standardItems;

  const currentOrg = user?.organizations?.find(
    (o) => (o.organizationId?._id || o.organizationId || o._id)?.toString() === activeOrgId
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  // Keyboard shortcut listener to toggle Command Palette on CTRL+K or CMD+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors duration-300">
      
      {/* Command Palette Trigger Container */}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      {/* 1. Collapsible Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-border bg-card/50 backdrop-blur-lg sticky top-0 h-screen select-none transition-all duration-300 relative ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Collapsible Trigger Float Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute bottom-20 -right-3.5 h-7 w-7 rounded-full border border-border bg-card shadow-md flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer z-50 hover:scale-105 transition-all"
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>

        {/* Brand Logo */}
        <div className={`h-16 flex items-center border-b border-border gap-2 ${sidebarCollapsed ? 'justify-center px-0' : 'px-6'}`}>
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-lg shrink-0 shadow-md shadow-orange-500/20">
            TF
          </div>
          {!sidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80 shrink-0"
            >
              TaskFlow<span className="text-orange-500 font-extrabold">2.0</span>
            </motion.span>
          )}
        </div>

        {/* Navigation Link Lists */}
        <nav className={`flex-1 py-6 space-y-1.5 overflow-y-auto ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} title={sidebarCollapsed ? item.name : undefined}>
                <div
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 relative group cursor-pointer ${
                    sidebarCollapsed ? 'justify-center px-0' : ''
                  } ${
                    isActive
                      ? 'text-orange-500 bg-orange-500/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1 h-6 rounded-r bg-orange-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-orange-500' : 'text-muted-foreground group-hover:text-foreground'}`} />
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User Footers profile */}
        <div className={`p-4 border-t border-border bg-card/30 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center font-bold text-orange-500 uppercase shrink-0">
                {user?.name?.slice(0, 2)}
              </div>
              {!sidebarCollapsed && (
                <div className="max-w-[110px] overflow-hidden">
                  <p className="text-sm font-semibold truncate leading-tight">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate capitalize">{user?.role?.toLowerCase()}</p>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <button
                onClick={logout}
                className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer shrink-0"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* 2. Main Workspace Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header navbar */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 select-none">
          
          {/* Left: Mobile menu triggers & search bar */}
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Tenant Switcher dropdown */}
            <div className="relative z-20">
              <button
                onClick={() => {
                  setOrgDropdownOpen(!orgDropdownOpen);
                  setNotificationsOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border hover:bg-muted/50 transition-colors text-sm font-medium cursor-pointer"
              >
                <Building className="h-4 w-4 text-orange-500 animate-pulse" />
                <span className="max-w-[120px] sm:max-w-[150px] truncate">
                  {currentOrg?.name || currentOrg?.organizationId?.name || 'Select Workspace'}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>

              <AnimatePresence>
                {orgDropdownOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setOrgDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 mt-2 w-56 border border-border bg-card rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-2 border-b border-border text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Select Workspace
                      </div>
                      <div className="py-1">
                        {user?.organizations?.map((o) => {
                          const oId = (o.organizationId?._id || o.organizationId || o._id)?.toString();
                          const oName = o.organizationId?.name || o.name;
                          return (
                            <button
                              key={oId}
                              onClick={() => {
                                changeOrganization(oId);
                                setOrgDropdownOpen(false);
                              }}
                              className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-muted/50 transition-colors cursor-pointer ${
                                activeOrgId === oId ? 'text-orange-500 font-semibold bg-orange-500/5' : 'text-foreground'
                              }`}
                            >
                              {oName}
                              {activeOrgId === oId && <div className="h-1.5 w-1.5 rounded-full bg-orange-500" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Integrated Search Box Triggering Command Palette */}
            <div
              onClick={() => setCommandPaletteOpen(true)}
              className="relative hidden lg:block w-72 max-w-xs cursor-pointer select-none"
            >
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <div className="w-full pl-10 pr-16 py-2 bg-muted/40 border border-border rounded-xl text-muted-foreground text-xs font-medium hover:bg-muted/60 transition-colors flex items-center justify-between">
                <span>Search dashboard commands...</span>
                <span className="text-[10px] font-bold bg-muted/80 text-muted-foreground px-1.5 py-0.5 rounded border border-border">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          {/* Right: Controls, Alerts, Profile switcher */}
          <div className="flex items-center gap-2">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-border hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
              title="Toggle Dark Mode"
            >
              {isDark ? <Sun className="h-4 w-4 text-orange-500" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setOrgDropdownOpen(false);
                  setProfileDropdownOpen(false);
                }}
                className={`p-2.5 rounded-xl border border-border hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground cursor-pointer relative ${
                  notificationsOpen ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' : ''
                }`}
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-600 text-white font-extrabold text-[9px] flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Drawer */}
              <AnimatePresence>
                {notificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setNotificationsOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-80 border border-border bg-card rounded-2xl shadow-xl z-20 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                        <span className="text-xs font-bold">Notifications</span>
                        {unreadCount > 0 && (
                          <button
                            onClick={handleMarkAllRead}
                            className="text-[10px] font-bold text-orange-500 hover:underline cursor-pointer"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>

                      {/* Filter tabs */}
                      <div className="flex px-4 py-1.5 bg-muted/10 border-b border-border/80 text-[10px] font-bold gap-2">
                        <button
                          onClick={() => setNotificationFilter('ALL')}
                          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                            notificationFilter === 'ALL'
                              ? 'bg-orange-500 text-white'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          All ({notifications.length})
                        </button>
                        <button
                          onClick={() => setNotificationFilter('UNREAD')}
                          className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                            notificationFilter === 'UNREAD'
                              ? 'bg-orange-500 text-white'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          Unread ({unreadCount})
                        </button>
                      </div>
                      
                      <div className="max-h-72 overflow-y-auto divide-y divide-border/50 select-none">
                        {notifications
                          .filter((n) => notificationFilter === 'ALL' || !n.read)
                          .map((n) => (
                            <div
                              key={n.id}
                              onClick={() => handleToggleRead(n.id)}
                              className={`p-3.5 text-xs transition-colors flex items-start justify-between gap-3 cursor-pointer hover:bg-muted/30 ${
                                n.read ? 'opacity-70 bg-card' : 'bg-orange-500/5'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5">
                                  <span className={`h-2 w-2 rounded-full shrink-0 ${
                                    n.priority === 'CRITICAL'
                                      ? 'bg-rose-500'
                                      : n.priority === 'HIGH'
                                      ? 'bg-amber-500'
                                      : 'bg-blue-500'
                                  }`} title={`${n.priority} priority`} />
                                  <span className="text-[9px] font-extrabold text-muted-foreground uppercase tracking-wider">
                                    {n.priority}
                                  </span>
                                </div>
                                <p className="font-semibold text-foreground/90 leading-normal">{n.text}</p>
                                <span className="text-[9px] text-muted-foreground block font-mono">{n.time}</span>
                              </div>
                              {!n.read && (
                                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                              )}
                            </div>
                          ))}

                        {notifications.filter((n) => notificationFilter === 'ALL' || !n.read).length === 0 && (
                          <div className="text-center p-6 text-xs text-muted-foreground">
                            No notifications to display
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileDropdownOpen(!profileDropdownOpen);
                  setOrgDropdownOpen(false);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1 border border-border hover:bg-muted/50 rounded-xl transition-colors cursor-pointer select-none"
              >
                <div className="h-7 w-7 rounded-lg bg-orange-500/20 text-orange-500 font-bold text-xs uppercase flex items-center justify-center shrink-0">
                  {user?.name?.slice(0, 2)}
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground mr-1 hidden sm:block" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setProfileDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-64 border border-border bg-card rounded-2xl shadow-xl z-20 overflow-hidden"
                    >
                      {/* User Info Header */}
                      <div className="p-4 border-b border-border bg-muted/20">
                        <p className="text-xs font-bold truncate leading-none">{user?.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate leading-none mt-1.5">{user?.email}</p>
                        
                        <div className="flex items-center gap-1.5 mt-3 text-[10px] font-extrabold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded-full w-fit">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {user?.role}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="py-1">
                        <Link
                          to="/settings"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                        >
                          <Settings className="h-4 w-4" /> Account Settings
                        </Link>
                        
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs font-semibold text-rose-500 hover:bg-rose-500/5 transition-colors border-t border-border/40 cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" /> Log Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>
        </header>

        {/* 3. Nested page container */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-card border-r border-border z-50 md:hidden flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-border">
                <span className="text-xl font-bold tracking-tight">
                  TaskFlow<span className="text-orange-500 font-extrabold">2.0</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-foreground rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}>
                      <div
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                          isActive
                            ? 'text-orange-500 bg-orange-500/10'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-border bg-card/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center font-bold text-orange-500">
                      {user?.name?.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold truncate leading-tight">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate capitalize">{user?.role?.toLowerCase()}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
