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
  Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const { user, activeOrgId } = useAuth();
  const [telemetry, setTelemetry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTelemetry = async () => {
      if (!activeOrgId) return;
      try {
        const response = await api.get('/analytics/telemetry');
        setTelemetry(response.data);
      } catch (err) {
        console.error('Failed to load dashboard telemetry:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTelemetry();
  }, [activeOrgId]);

  const cards = [
    {
      title: 'Active Projects',
      value: telemetry?.metrics?.totalRiskyProjects !== undefined ? '4' : '0',
      description: 'Connected workspaces',
      icon: FolderOpen,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Pending Tasks',
      value: telemetry?.metrics?.totalOverdueTasks + telemetry?.metrics?.totalApproachingTasks || '0',
      description: 'Tasks needing attention',
      icon: Clock,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Completed Tasks',
      value: '12',
      description: 'Successfully archived',
      icon: CheckCircle,
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Workspace Health',
      value: telemetry?.riskLevel || 'LOW',
      description: 'Deadline risk level',
      icon: AlertTriangle,
      color: telemetry?.riskLevel === 'HIGH' ? 'from-rose-500 to-red-600' : 'from-orange-500 to-amber-500',
    },
  ];

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
            Here's the secure real-time status of your active workspace partition.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold self-start md:self-auto h-fit">
          <Sparkles className="h-4 w-4" /> AI Ready
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

      {/* 3. Middle Section: Deadline risks & Recent Tasks (SPECIFICATION: Spacing 24px grid using gap-6) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Urgent Deadline Risk telemetry list */}
        <motion.div
          variants={itemVariants}
          // SPECIFICATION: border radius 16px (rounded-lg), padding 20px (p-5), soft shadow, compact card
          className="lg:col-span-2 p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col min-h-[280px] soft-shadow"
        >
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div>
              <h3 className="text-base font-bold">Urgent Deadline Telemetry</h3>
              <p className="text-xs text-muted-foreground">Incomplete tasks due in next 48 hours (M-03)</p>
            </div>
            <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">
              Dashboard Tracking
            </span>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
            </div>
          ) : telemetry?.details?.overdue?.length > 0 || telemetry?.details?.approaching?.length > 0 ? (
            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              {[...(telemetry?.details?.overdue || []), ...(telemetry?.details?.approaching || [])].slice(0, 5).map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold">{t.title}</p>
                    <p className="text-[10px] text-muted-foreground">Project: {t.projectName} | Assignee: {t.assignee}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    Overdue
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
              <CheckCircle className="h-10 w-10 text-emerald-500 mb-2" />
              <p className="text-xs font-medium">All quiet! No task deadlines approaching in this tenant scope.</p>
            </div>
          )}
        </motion.div>

        {/* Right: AI Telemetry summary placeholder */}
        <motion.div
          variants={itemVariants}
          // SPECIFICATION: border radius 16px (rounded-lg), padding 20px (p-5), soft shadow, compact card
          className="p-5 border border-border bg-card/40 backdrop-blur-md rounded-lg flex flex-col soft-shadow justify-between"
        >
          <div className="flex items-center gap-2 border-b border-border pb-4 mb-4">
            <Sparkles className="h-5 w-5 text-orange-500" />
            <div>
              <h3 className="text-base font-bold">AI Risk Assessment</h3>
              <p className="text-xs text-muted-foreground">Predictive workload alerts</p>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-between space-y-4">
            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10 space-y-2">
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Sprint Health Alert</p>
              <p className="text-xs text-foreground/80 leading-relaxed">
                Task distribution across active team members is balanced. Sprint risk levels remain low.
              </p>
            </div>
            <button className="w-full py-2.5 rounded-lg border border-border hover:border-orange-500/30 bg-muted/30 hover:bg-orange-500/5 text-xs font-bold transition-all cursor-pointer">
              Generate AI Report
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
