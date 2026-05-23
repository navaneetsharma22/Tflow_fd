import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth.jsx';
import api from '../lib/api.js';
import {
  TrendingUp,
  AlertTriangle,
  FolderOpen,
  CheckCircle,
  Users,
  Clock,
  Sparkles,
  Building,
  Cpu,
  HardDrive,
  ShieldCheck,
  Calendar,
  Layers,
  Code
} from 'lucide-react';

const Dashboard = () => {
  const { user, activeOrgId } = useAuth();
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);

  // Developer specific task selection state
  const [selectedTask, setSelectedTask] = useState({
    title: 'Setup whitelist security bounds whitelisting',
    desc: 'Harden Express.js entry routes against tenant isolation leaks using specialized middleware checks.',
    due: 'Tomorrow',
    priority: 'HIGH',
    status: 'IN_PROGRESS'
  });

  // Tester specific bug selection state
  const [selectedBug, setSelectedBug] = useState({
    title: 'PR #42 tenant boundary check bypass bypass',
    desc: 'Bypassing whitelist parameters under specific HTTP payload boundaries checks.',
    severity: 'HIGH',
    status: 'OPEN'
  });

  // Designer specific asset approval state
  const [designApproved, setDesignApproved] = useState(false);

  useEffect(() => {
    const fetchTelemetry = async () => {
      // Standard tenant telemetry
      if (
        user?.role !== 'SUPER_ADMIN' &&
        user?.role !== 'ADMIN' &&
        user?.role !== 'ORG_ADMIN' &&
        user?.role !== 'MANAGER' &&
        user?.role !== 'LEAD' &&
        user?.role !== 'TEAM_LEAD' &&
        user?.role !== 'MEMBER' &&
        user?.role !== 'TESTER' &&
        user?.role !== 'DESIGNER'
      ) {
        if (!activeOrgId) return;
        try {
          const response = await api.get('/analytics/telemetry');
          setTelemetry(response.data);
        } catch (err) {
          console.error('Failed to load dashboard telemetry:', err);
        } finally {
          setLoading(false);
        }
      } else {
        // Mock role dashboards loading
        setLoading(false);
      }
    };

    fetchTelemetry();
  }, [activeOrgId, user]);

  const superAdminCards = [
    {
      title: 'Total Organizations',
      value: '5 Active',
      description: 'Connected tenant partitions',
      icon: Building,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Registered Users',
      value: '105 Members',
      description: 'Globally active users',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Monthly Recurring Revenue',
      value: '$24.9k',
      description: 'Up 12.4% this month',
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'System Cluster Health',
      value: 'OPTIMAL',
      description: 'Zero active alerts',
      icon: Cpu,
      color: 'from-orange-500 to-amber-500',
    },
  ];

  const orgAdminCards = [
    {
      title: 'Active Employees',
      value: '4 Members',
      description: 'Registered team members',
      icon: Users,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Active Departments',
      value: '4 Units',
      description: 'Engineering, Ops, Security, Logistics',
      icon: Building,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Connected Projects',
      value: '8 Workspaces',
      description: 'Connected team channels',
      icon: FolderOpen,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Productive Hours Logged',
      value: '1,840 hrs',
      description: 'Average attendance 94.8%',
      icon: TrendingUp,
      color: 'from-orange-500 to-amber-500',
    },
  ];

  const pmCards = [
    {
      title: 'Managed Projects',
      value: '4 Active',
      description: 'Sprint Alpha, Auth, ML Risk',
      icon: FolderOpen,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Active Team Leads',
      value: '2 Leaders',
      description: 'Sarah Connor, Kyle Reese',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Resource Allocation',
      value: '84% Capacity',
      description: 'Sprint staffing loads',
      icon: Layers,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Project Health',
      value: 'STABLE',
      description: 'Deadline risk level low',
      icon: CheckCircle,
      color: 'from-orange-500 to-amber-500',
    },
  ];

  const tlCards = [
    {
      title: 'Sprint Progress',
      value: '85% Done',
      description: 'Sprint Alpha active tasks',
      icon: Clock,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Developer Load',
      value: '4 Developers',
      description: 'Active sprint developers',
      icon: Users,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Code Reviews',
      value: '2 Pending',
      description: 'Pull Requests audits checks',
      icon: Code,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Workload Balance',
      value: 'OPTIMAL',
      description: 'Balanced task distribution',
      icon: Sparkles,
      color: 'from-orange-500 to-amber-500',
    },
  ];

  const devCards = [
    {
      title: 'My Active Tasks',
      value: '3 Tasks',
      description: 'Sprint tasks assigned to me',
      icon: Clock,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Logged Hours',
      value: '38.5 hrs',
      description: 'Weekly worklog metrics',
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'My Pull Requests',
      value: '1 PR Active',
      description: 'PR #42 whitelist gates',
      icon: Code,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Current Sprint Day',
      value: 'Day 10 / 14',
      description: 'Sprint Alpha active cycle',
      icon: Sparkles,
      color: 'from-orange-500 to-amber-500',
    },
  ];

  // ==========================================
  // TESTER KPI WIDGETS
  // ==========================================
  const testerCards = [
    {
      title: 'Active Bug Queue',
      value: '4 Bugs',
      description: 'Waiting for verification',
      icon: AlertTriangle,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Regression Tracking',
      value: '98.5% Stable',
      description: 'Sprint Alpha regression checks',
      icon: ShieldCheck,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Testing Status',
      value: '84 Passed',
      description: '2 failed, 1 blocked',
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Severity Index',
      value: 'LOW RISK',
      description: 'No active critical leaks',
      icon: Sparkles,
      color: 'from-orange-500 to-amber-500',
    },
  ];

  // ==========================================
  // DESIGNER KPI WIDGETS
  // ==========================================
  const designerCards = [
    {
      title: 'Design Assets',
      value: '18 Assets',
      description: 'Illustrations & asset kits',
      icon: Layers,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Design Tasks',
      value: '2 Tasks',
      description: 'Mockups & layouts updates',
      icon: Clock,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Review Requests',
      value: '1 Request',
      description: 'Stark mockup review',
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Approval Status',
      value: 'READY',
      description: 'Approved for handoff',
      icon: CheckCircle,
      color: 'from-orange-500 to-amber-500',
    },
  ];

  const cards =
    user?.role === 'SUPER_ADMIN'
      ? superAdminCards
      : user?.role === 'ADMIN' || user?.role === 'ORG_ADMIN'
      ? orgAdminCards
      : user?.role === 'MANAGER'
      ? pmCards
      : user?.role === 'LEAD' || user?.role === 'TEAM_LEAD'
      ? tlCards
      : user?.role === 'TESTER'
      ? testerCards
      : user?.role === 'DESIGNER'
      ? designerCards
      : devCards;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  return (
    // SPECIFICATION: Spacing exactly 24px (space-y-6 is exactly 24px)
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 select-none"
    >
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Welcome, <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-500">{user?.name}</span>
          </h1>
          <p className="text-muted-foreground text-xs mt-1">
            {user?.role === 'SUPER_ADMIN'
              ? "Here's the secure status of the entire multi-tenant SaaS grid infrastructure."
              : user?.role === 'ADMIN' || user?.role === 'ORG_ADMIN'
              ? "Here's the operational status of your organization partition."
              : user?.role === 'MANAGER'
              ? "Here's your Project Manager tracking deck for sprints and allocation loads."
              : user?.role === 'LEAD' || user?.role === 'TEAM_LEAD'
              ? "Here's your Team Lead cockpit to manage active sprints, review pull requests, and audit developer tasks."
              : user?.role === 'TESTER'
              ? "Here's your Quality Assurance deck. Track regression testing pipelines, verify bugs queues, and audit severity analytics."
              : user?.role === 'DESIGNER'
              ? "Here's your Design Workspace. Access stickers asset files, design tasks, review mockups, and track handoff approvals."
              : "Here's your Developer dashboard. Track your sprint task boards, log worklogs, and review open PRs."}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold self-start md:self-auto h-fit">
          <Sparkles className="h-4 w-4" />{' '}
          {user?.role === 'SUPER_ADMIN'
            ? 'Super Admin Grid'
            : user?.role === 'ADMIN' || user?.role === 'ORG_ADMIN'
            ? 'Organization Admin'
            : user?.role === 'MANAGER'
            ? 'Project Manager'
            : user?.role === 'LEAD' || user?.role === 'TEAM_LEAD'
            ? 'Team Lead Cockpit'
            : user?.role === 'TESTER'
            ? 'QA Tester Deck'
            : user?.role === 'DESIGNER'
            ? 'Designer Workspace'
            : 'Developer Dashboard'}
        </div>
      </div>

      {/* 2. KPI Cards Grid (SPECIFICATION: Spacing 24px grid using gap-6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -4, scale: 1.01 }}
              // SPECIFICATION: border radius exactly 16px (rounded-lg), padding 20px (p-5), soft shadow, compact card heights
              className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg relative overflow-hidden group soft-shadow transition-all"
            >
              {/* Floating Ambient Gradient */}
              <div className={`absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-tr ${card.color} opacity-10 group-hover:opacity-20 blur-2xl rounded-full transition-opacity duration-300`} />
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2 rounded-lg bg-gradient-to-tr ${card.color} text-white shadow-sm`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-extrabold tracking-tight">{card.value}</span>
                <p className="text-[10px] text-muted-foreground mt-0.5">{card.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Middle Section (SPECIFICATION: Spacing 24px grid using gap-6) */}
      {user?.role === 'SUPER_ADMIN' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Super Admin Platform Updates log */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col min-h-[280px] soft-shadow"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold">Platform Cluster Status</h3>
                <p className="text-xs text-muted-foreground">Recent systems deployments and worker loads</p>
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">
                Active Nodes
              </span>
            </div>
            
            <div className="flex-1 space-y-3 overflow-y-auto pr-1 text-xs">
              {[
                { name: 'Redis Cache node connection pool scale verified', time: '1 hr ago', type: 'Cache' },
                { name: 'BullMQ notification worker queue O(1) loop confirmed', time: '3 hrs ago', type: 'Worker' },
                { name: 'Organization tenant suspend action on Cyberdyne executed', time: '5 hrs ago', type: 'Suspend' },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">SaaS Infrastructure | {t.time}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    {t.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Quick Super Admin Actions */}
          <motion.div
            variants={itemVariants}
            className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between"
          >
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <div>
                <h3 className="text-base font-bold">Quick Actions</h3>
                <p className="text-xs text-muted-foreground">Admin commands control</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10 space-y-2 text-xs">
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">System State</p>
                <p className="text-foreground/80 leading-relaxed">
                  All active databases, Redis nodes, and BullMQ jobs are running without transaction leaks.
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/organizations'}
                className="w-full py-2.5 rounded-lg border border-border hover:border-orange-500/30 bg-muted/30 hover:bg-orange-500/5 text-xs font-bold transition-all cursor-pointer"
              >
                Manage Organizations
              </button>
            </div>
          </motion.div>
        </div>
      ) : user?.role === 'ADMIN' || user?.role === 'ORG_ADMIN' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Organization Admin Operations Log */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col min-h-[280px] soft-shadow"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold">Workspace Operations</h3>
                <p className="text-xs text-muted-foreground">Recent department signups and leave queries</p>
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">
                Staff Operations
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1 text-xs">
              {[
                { name: 'John Connor requested 3 days of Annual Leave', time: '40 mins ago', type: 'Leave' },
                { name: 'Ellen Ripley updated Logistics budget boundaries', time: '2 hrs ago', type: 'Budget' },
                { name: 'New employee Kyle Reese associated to Engineering unit', time: '1 day ago', type: 'Roster' },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">Workspace telemetry | {t.time}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    {t.type}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Quick Org Admin Actions */}
          <motion.div
            variants={itemVariants}
            className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between"
          >
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <div>
                <h3 className="text-base font-bold">Quick Actions</h3>
                <p className="text-xs text-muted-foreground">Workspace administration</p>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10 space-y-2 text-xs">
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Workspace Health</p>
                <p className="text-foreground/80 leading-relaxed">
                  Average employee present rate is 94.8%. 2 pending leave requests require authorization.
                </p>
              </div>
              <button
                onClick={() => window.location.href = '/employees'}
                className="w-full py-2.5 rounded-lg border border-border hover:border-orange-500/30 bg-muted/30 hover:bg-orange-500/5 text-xs font-bold transition-all cursor-pointer"
              >
                Manage Employees
              </button>
            </div>
          </motion.div>
        </div>
      ) : user?.role === 'MANAGER' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Multiple Project completion progress lists */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col min-h-[280px] soft-shadow"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold">Active Sprints progress</h3>
                <p className="text-xs text-muted-foreground">Multiple project tracking completion indices</p>
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">
                Managed Sprints
              </span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              {[
                { name: 'Sprint Alpha', desc: 'Engineering core operations overhaul', percent: '85%' },
                { name: 'Hardened Encryption Auth', desc: 'Secure security whitelist gates logic', percent: '95%' },
                { name: 'ML Predictive Sprint Telemetry', desc: 'Machine learning cycle risk models', percent: '60%' },
              ].map((proj, idx) => (
                <div key={idx} className="space-y-1.5 p-1">
                  <div className="flex justify-between text-xs font-bold text-foreground/80">
                    <span>{proj.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{proj.percent} Done</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: proj.percent }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{proj.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Team Lead allocations & load trackers */}
          <motion.div
            variants={itemVariants}
            className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between"
          >
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
              <Users className="h-5 w-5 text-orange-500" />
              <div>
                <h3 className="text-base font-bold">Team Lead Allocation</h3>
                <p className="text-xs text-muted-foreground">Staff capacity tracker</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              {[
                { name: 'Sarah Connor', dept: 'Operations Lead', allocated: '92% allocated', load: '92%' },
                { name: 'Kyle Reese', dept: 'Security Lead', allocated: '75% allocated', load: '75%' },
              ].map((tl, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-bold">
                    <span>{tl.name}</span>
                    <span className="text-[10px] text-muted-foreground">{tl.allocated}</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: tl.load }} />
                  </div>
                  <p className="text-[9px] text-muted-foreground">{tl.dept}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : user?.role === 'LEAD' || user?.role === 'TEAM_LEAD' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Active Developers tracking and task loads */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col min-h-[280px] soft-shadow"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold">Developer Sprint tracking</h3>
                <p className="text-xs text-muted-foreground">Active developer workload distribution</p>
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">
                Sprint Developers
              </span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              {[
                { name: 'John Connor', tasks: '3 active sprint tasks', percent: '75%', load: 'Normal' },
                { name: 'Ellen Ripley', tasks: '2 active sprint tasks', percent: '50%', load: 'Balanced' },
                { name: 'Kyle Reese', tasks: '1 active sprint tasks', percent: '25%', load: 'Under-capacity' },
              ].map((dev, idx) => (
                <div key={idx} className="space-y-1.5 p-1 text-xs">
                  <div className="flex justify-between font-bold text-foreground/80">
                    <span>{dev.name}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{dev.load}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: dev.percent }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{dev.tasks}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Code Review tracking */}
          <motion.div
            variants={itemVariants}
            className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between"
          >
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
              <Code className="h-5 w-5 text-orange-500" />
              <div>
                <h3 className="text-base font-bold">Code Review PRs</h3>
                <p className="text-xs text-muted-foreground">Pending pull requests reviews</p>
              </div>
            </div>
            
            <div className="flex-1 space-y-4 text-xs font-semibold">
              {[
                { pr: '#42: Establish security bounds whitelisting', author: 'Kyle Reese', status: 'Security review' },
                { pr: '#43: Circular dependencies traversal check', author: 'John Connor', status: 'Code Audit' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 border border-border bg-muted/20 hover:bg-muted/40 transition-all rounded-lg space-y-2">
                  <div className="flex justify-between font-bold">
                    <span className="truncate max-w-[150px]">{item.pr}</span>
                    <span className="text-[9px] text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">{item.status}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Author: {item.author}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : user?.role === 'TESTER' ? (
        // ========================================================
        // QA TESTER SPECIAL WIDGETS SECTION
        // ========================================================
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: QA Bug Queue List */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col min-h-[280px] soft-shadow"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold">Active Bug Queue</h3>
                <p className="text-xs text-muted-foreground">Workspace bugs pending verification checks</p>
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">
                Bug Queue
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {[
                {
                  title: 'PR #42 tenant boundary check bypass bypass',
                  desc: 'Bypassing whitelist parameters under specific HTTP payload boundaries checks.',
                  severity: 'HIGH',
                  status: 'OPEN'
                },
                {
                  title: 'DFS cycles check infinite regression regression',
                  desc: 'Circular checks timeout in massive workspace graph bounds.',
                  severity: 'CRITICAL',
                  status: 'CONFIRMED'
                },
                {
                  title: 'UI Toast alignment displacement',
                  desc: 'Notification popups overlay with mobile sidebar menu buttons.',
                  severity: 'LOW',
                  status: 'RESOLVED'
                }
              ].map((bug, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedBug(bug)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedBug.title === bug.title
                      ? 'border-orange-500/40 bg-orange-500/5'
                      : 'border-border bg-muted/20 hover:bg-muted/40'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground">{bug.title}</p>
                    <p className="text-[10px] text-muted-foreground truncate max-w-[280px]">{bug.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      bug.severity === 'CRITICAL' || bug.severity === 'HIGH'
                        ? 'bg-rose-500/10 text-rose-500'
                        : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {bug.severity}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{bug.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bug details & Severity Analytics */}
          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between animate-fadeIn"
            >
              <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <div>
                  <h3 className="text-sm font-bold">Selected Bug Details</h3>
                  <p className="text-[10px] text-muted-foreground">QA bug metrics status</p>
                </div>
              </div>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Bug Name</span>
                  <p className="font-bold text-foreground mt-0.5">{selectedBug.title}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Description</span>
                  <p className="text-muted-foreground leading-relaxed mt-0.5">{selectedBug.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t border-border/50">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Severity</span>
                  <Badge variant={selectedBug.severity === 'CRITICAL' ? 'destructive' : 'warning'}>{selectedBug.severity}</Badge>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between"
            >
              <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <div>
                  <h3 className="text-sm font-bold">Severity Analytics</h3>
                  <p className="text-[10px] text-muted-foreground">Incident rates</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Critical Severity bugs', rate: '1 active bug', percent: '25%', color: 'bg-rose-500' },
                  { name: 'High Severity bugs', rate: '2 active bugs', percent: '50%', color: 'bg-orange-500' },
                  { name: 'Low Severity bugs', rate: '1 active bug', percent: '25%', color: 'bg-emerald-500' },
                ].map((s, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>{s.name}</span>
                      <span className="text-muted-foreground">{s.rate}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${s.color}`} style={{ width: s.percent }} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      ) : user?.role === 'DESIGNER' ? (
        // ========================================================
        // DESIGNER SPECIAL WIDGETS SECTION
        // ========================================================
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Design Assets & Review requests */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col min-h-[280px] soft-shadow animate-fadeIn"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold">Design Assets & Reviews</h3>
                <p className="text-xs text-muted-foreground">Track dynamic sticker mockup designs and feedback requests</p>
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">
                Asset Files
              </span>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1">
              {[
                { name: 'Stark landing page dashboard mockup mockup', desc: 'Mockups assets files containing Stark dashboard metrics layouts.', size: '44 MB' },
                { name: 'TaskFlow brand orange stickers stickers', desc: 'Vector logos design files containing high resolution stickers.', size: '12 MB' },
                { name: 'Dark Theme modal custom graphics assets', desc: 'Curated gradients and illustration files for SaaS modal layers.', size: '28 MB' },
              ].map((asset, idx) => (
                <div key={idx} className="p-3 border border-border bg-muted/20 rounded-lg space-y-2 text-xs hover:bg-muted/40 transition-colors">
                  <div className="flex justify-between font-bold">
                    <span className="truncate max-w-[280px]">{asset.name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{asset.size}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{asset.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Design Approval flow */}
          <motion.div
            variants={itemVariants}
            className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between"
          >
            <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <div>
                <h3 className="text-base font-bold">Mockup Approval Flow</h3>
                <p className="text-xs text-muted-foreground">Approve or reject handoff designs</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between space-y-4 pt-2">
              <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10 space-y-2 text-xs">
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Handoff Request</p>
                <p className="text-foreground/80 leading-relaxed">
                  Stark Industries premium dark mode cockpit requires approval to dispatch design handoffs to the engineering units.
                </p>
              </div>

              {designApproved ? (
                <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-500 text-center text-xs font-bold animate-fadeIn">
                  Mockup Handoff Approved!
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => setDesignApproved(true)}
                    className="flex-1 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all cursor-pointer"
                  >
                    Approve Design
                  </button>
                  <button
                    onClick={() => setDesignApproved(false)}
                    className="flex-1 py-2 rounded-lg border border-border hover:bg-muted text-xs font-bold transition-all cursor-pointer"
                  >
                    Reject Design
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      ) : (
        // ========================================================
        // DEVELOPER / MEMBER COCKPIT SECTION
        // ========================================================
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Active Sprint Task board */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col min-h-[280px] soft-shadow animate-fadeIn"
          >
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold font-sans">Active Sprint Tasks</h3>
                <p className="text-xs text-muted-foreground">Sprint Alpha tasks assigned to my directory profile</p>
              </div>
              <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">
                Sprint Board
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {[
                {
                  title: 'Setup whitelist security bounds whitelisting',
                  desc: 'Harden Express.js entry routes against tenant isolation leaks using specialized middleware checks.',
                  due: 'Tomorrow',
                  priority: 'HIGH',
                  status: 'IN_PROGRESS'
                },
                {
                  title: 'Audit circular loop traversal loops check',
                  desc: 'Graph cycles checks for Sprint Alpha workload charts traversal checking bottlenecks.',
                  due: 'In 3 days',
                  priority: 'MEDIUM',
                  status: 'BACKLOG'
                },
                {
                  title: 'Configure multi-tenant context hooks',
                  desc: 'Register workspace partition X-Organization-Id hooks inside axios instance requests.',
                  due: 'Completed',
                  priority: 'HIGH',
                  status: 'DONE'
                }
              ].map((task, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedTask(task)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                    selectedTask.title === task.title
                      ? 'border-orange-500/40 bg-orange-500/5'
                      : 'border-border bg-muted/20 hover:bg-muted/40'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-foreground">{task.title}</p>
                    <p className="text-[10px] text-muted-foreground truncate max-w-[280px]">{task.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      task.priority === 'HIGH' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{task.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Selected Task details & Active PR area */}
          <div className="space-y-6">
            
            {/* Task Details panel */}
            <motion.div
              variants={itemVariants}
              className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between"
            >
              <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
                <Sparkles className="h-5 w-5 text-orange-500" />
                <div>
                  <h3 className="text-sm font-bold">Selected Task Details</h3>
                  <p className="text-[10px] text-muted-foreground">Detailed telemetry parameters</p>
                </div>
              </div>
              <div className="space-y-3.5 text-xs">
                <div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Task Title</span>
                  <p className="font-bold text-foreground mt-0.5">{selectedTask.title}</p>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">Description</span>
                  <p className="text-muted-foreground leading-relaxed mt-0.5">{selectedTask.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-2.5 border-t border-border/50">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Priority</span>
                  <Badge variant={selectedTask.priority === 'HIGH' ? 'destructive' : 'warning'}>{selectedTask.priority}</Badge>
                </div>
              </div>
            </motion.div>

            {/* Active Pull Request panel */}
            <motion.div
              variants={itemVariants}
              className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between"
            >
              <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
                <Code className="h-5 w-5 text-orange-500" />
                <div>
                  <h3 className="text-sm font-bold">My Active Pull Requests</h3>
                  <p className="text-[10px] text-muted-foreground">Pull requests sent by me</p>
                </div>
              </div>
              <div className="p-3 border border-border bg-muted/20 hover:bg-muted/40 transition-all rounded-lg space-y-2 text-xs">
                <div className="flex justify-between font-bold">
                  <span className="truncate max-w-[150px]">PR #42: Whitelist IP gates</span>
                  <span className="text-[9px] text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">Pending Review</span>
                </div>
                <p className="text-[10px] text-muted-foreground">Assignee review: Kyle Reese</p>
              </div>
            </motion.div>

          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
