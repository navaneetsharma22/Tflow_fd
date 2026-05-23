import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import {
  Building,
  Users,
  HardDrive,
  DollarSign,
  Activity,
  TrendingUp,
  ShieldAlert,
  CheckCircle,
  FolderOpen,
  Clock,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

const Analytics = () => {
  const { user } = useAuth();

  // ==========================================
  // SUPER ADMIN TELEMETRY DATA
  // ==========================================
  const saStats = [
    { title: 'Organizations', value: '5 Active', growth: '+15.2%', icon: Building, color: 'from-orange-500 to-amber-500' },
    { title: 'Users Count', value: '105 Members', growth: '+18.4%', icon: Users, color: 'from-blue-500 to-indigo-500' },
    { title: 'Grid Storage', value: '91 GB / 260GB', growth: '35% capacity', icon: HardDrive, color: 'from-emerald-500 to-teal-500' },
    { title: 'MRR Cashflow', value: '$24,920', growth: '+12.4% MoM', icon: DollarSign, color: 'from-orange-500 to-amber-500' },
    { title: 'Task Volume', value: '14,920 Exec', growth: 'O(1) optimal', icon: Activity, color: 'from-blue-500 to-indigo-500' },
    { title: 'Growth Factor', value: '+18.4% Accel', growth: 'Optimal', icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
  ];

  const growthTrend = [
    { month: 'Jan', count: 12, percent: '30%' },
    { month: 'Feb', count: 24, percent: '55%' },
    { month: 'Mar', count: 32, percent: '70%' },
    { month: 'Apr', count: 40, percent: '85%' },
    { month: 'May', count: 48, percent: '100%' },
  ];

  const storageUsage = [
    { org: 'Acme Corp', used: '44.8 GB', limit: '100 GB', percent: 45 },
    { org: 'Stark Industries', used: '28.1 GB', limit: '80 GB', percent: 35 },
    { org: 'Wayne Enterprises', used: '12.4 GB', limit: '50 GB', percent: 25 },
    { org: 'Umbrella Research', used: '4.5 GB', limit: '20 GB', percent: 22 },
  ];

  const saFeatureUsage = [
    { name: 'AI Risk Sprint Assessment', usage: '84% adoption', percent: 84 },
    { name: 'Slack Hook Dispatcher', usage: '42% adoption', percent: 42 },
    { name: 'O(V+E) Cycle Bottleneck Check', usage: '68% adoption', percent: 68 },
    { name: 'Custom Org Theme Styling', usage: '92% adoption', percent: 92 },
  ];

  const securityEvents = [
    { event: 'IP Whitelist Block', desc: 'Blocked unauthorized IP 84.120.3.9', time: '10 mins ago', status: 'BLOCKED' },
    { event: '2FA Verification Challenge', desc: 'Auto prompt triggered for superadmin session', time: '2 hrs ago', status: 'VERIFIED' },
    { event: 'Active Session Revocation', desc: 'Revoked Chrome token from Wayne Corp', time: '4 hrs ago', status: 'REVOKED' },
  ];

  // ==========================================
  // ORGANIZATION ADMIN TELEMETRY DATA
  // ==========================================
  const oaStats = [
    { title: 'Total Employees', value: '4 Active', growth: '94.8% Attendance', icon: Users, color: 'from-orange-500 to-amber-500' },
    { title: 'Active Projects', value: '8 Channels', growth: '4 Departments', icon: FolderOpen, color: 'from-blue-500 to-indigo-500' },
    { title: 'Productive Hours', value: '1,840 hrs', growth: '78% Utilization', icon: Clock, color: 'from-emerald-500 to-teal-500' },
    { title: 'Task Completion', value: '96.2%', growth: '12 completed today', icon: CheckCircle, color: 'from-orange-500 to-amber-500' },
    { title: 'Overdue Risks', value: '0 Urgent', growth: 'Low bottleneck rate', icon: AlertTriangle, color: 'from-blue-500 to-indigo-500' },
    { title: 'Workload Balance', value: 'OPTIMAL', growth: 'Zero overallocation', icon: Sparkles, color: 'from-emerald-500 to-teal-500' },
  ];

  const employeeProductivity = [
    { name: 'John Connor', dept: 'Engineering', completed: 24, rate: '98% output', percent: 98 },
    { name: 'Sarah Connor', dept: 'Operations', completed: 18, rate: '95% output', percent: 95 },
    { name: 'Ellen Ripley', dept: 'Logistics', completed: 15, rate: '92% output', percent: 92 },
    { name: 'Kyle Reese', dept: 'Security', completed: 8, rate: '88% output', percent: 88 },
  ];

  const projectCompletion = [
    { name: 'Sprint Alpha', completed: '17 / 20 tasks', percent: 85 },
    { name: 'Hardened Auth Overhaul', completed: '19 / 20 tasks', percent: 95 },
    { name: 'ML Risk Telemetry Engine', completed: '6 / 10 tasks', percent: 60 },
    { name: 'Slack Channel Notifications', completed: '4 / 10 tasks', percent: 40 },
  ];

  const taskDistribution = [
    { dept: 'Engineering', tasksCount: 24, percent: '80%' },
    { dept: 'Operations', tasksCount: 12, percent: '40%' },
    { dept: 'Security & Integrity', tasksCount: 8, percent: '28%' },
    { dept: 'Logistics', tasksCount: 6, percent: '20%' },
  ];

  const deadlineRisks = [
    { level: 'Overdue Tasks (M-03)', count: '0 items', status: 'SAFE', color: 'text-emerald-500' },
    { level: 'Approaching < 24 Hours', count: '1 items', status: 'WATCH', color: 'text-amber-500' },
    { level: 'Approaching < 48 Hours', count: '2 items', status: 'WATCH', color: 'text-amber-500' },
  ];

  const resourceUtilization = [
    { resource: 'Sprint Staffing Cap', allocated: '78% utilized', desc: 'Optimal loading bounds', percent: 78 },
    { resource: 'Storage Allocations', allocated: '12.4 GB of 50 GB', desc: 'Free capacity bounds', percent: 25 },
    { resource: 'Active DB Connections', allocated: '98% heartbeats', desc: 'No transaction locks', percent: 98 },
  ];

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          {isSuperAdmin ? 'Super Admin Analytics' : 'Organization Productivity Analytics'}
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          {isSuperAdmin
            ? 'Platform wide signup records, partitioned storage usage, and active whitelisting metrics.'
            : 'Track active employee performance, task allocations, and department capacity parameters.'}
        </p>
      </div>

      {/* 1. Stat cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {(isSuperAdmin ? saStats : oaStats).map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} className="relative overflow-hidden group">
              <div className={`absolute -right-12 -top-12 w-24 h-24 bg-gradient-to-tr ${item.color} opacity-5 group-hover:opacity-10 blur-xl rounded-full transition-opacity`} />
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{item.title}</span>
                <div className={`p-1.5 rounded-md bg-gradient-to-tr ${item.color} text-white shadow-sm`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </CardHeader>
              <CardContent>
                <span className="text-xl font-extrabold tracking-tight block">{item.value}</span>
                <span className="text-[9px] text-emerald-500 font-bold mt-1 block">{item.growth}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isSuperAdmin ? (
        // ========================================================
        // SUPER ADMIN VISUAL VIEWS
        // ========================================================
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Workspace Growth Trend</CardTitle>
                <CardDescription>Monthly growth index showing active signup acceleration.</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex flex-col justify-end pt-4">
                <div className="flex-1 flex items-end justify-between gap-4 pb-2 border-b border-border">
                  {growthTrend.map((g, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <span className="text-[9px] font-bold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {g.count} Orgs
                      </span>
                      <div
                        className="w-full bg-gradient-to-t from-orange-500 to-amber-500 rounded-t-md hover:opacity-80 transition-all shadow-sm"
                        style={{ height: g.percent }}
                      />
                      <span className="text-[10px] font-bold text-muted-foreground">{g.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Allocation Index</CardTitle>
                <CardDescription>Allocated partition storage by active tenants.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {storageUsage.map((s, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-foreground/80">
                      <span>{s.org}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{s.used} / {s.limit}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${s.percent}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature adoption Telemetry</CardTitle>
                <CardDescription>SaaS feature flag deployment rates across organization profiles.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4.5">
                {saFeatureUsage.map((f, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-6 py-1">
                    <div className="space-y-0.5 flex-1 max-w-sm">
                      <span className="text-xs font-bold text-foreground">{f.name}</span>
                      <p className="text-[10px] text-muted-foreground">{f.usage}</p>
                    </div>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden shrink-0">
                      <div className="h-full bg-emerald-500" style={{ width: `${f.percent}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Events Telemetry</CardTitle>
                <CardDescription>Real-time log of governance events and whitelist blocks.</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-border/50">
                {securityEvents.map((se, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 gap-6 select-none">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                        <ShieldAlert className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground block">{se.event}</span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{se.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] text-muted-foreground">{se.time}</span>
                      <Badge variant={se.status === 'BLOCKED' ? 'destructive' : se.status === 'VERIFIED' ? 'success' : 'secondary'}>
                        {se.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        // ========================================================
        // ORGANIZATION ADMIN VISUAL VIEWS
        // ========================================================
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Task distribution per department */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Task Distribution by Department</CardTitle>
                <CardDescription>Active task volume allocations per organizational department.</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex flex-col justify-end pt-4">
                <div className="flex-1 flex items-end justify-between gap-4 pb-2 border-b border-border">
                  {taskDistribution.map((t, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <span className="text-[9px] font-bold text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {t.tasksCount} Tasks
                      </span>
                      <div
                        className="w-full bg-gradient-to-t from-orange-500 to-amber-500 rounded-t-md hover:opacity-80 transition-all shadow-sm"
                        style={{ height: t.percent }}
                      />
                      <span className="text-[10px] font-bold text-muted-foreground truncate max-w-[60px]">{t.dept.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project completion status */}
            <Card>
              <CardHeader>
                <CardTitle>Project Completion Index</CardTitle>
                <CardDescription>Visual completion rate of top channels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {projectCompletion.map((p, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-foreground/80">
                      <span>{p.name}</span>
                      <span className="font-mono text-[10px] text-muted-foreground">{p.completed}</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${p.percent}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Employee Productivity listings */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Staff Productivity Rankings</CardTitle>
                <CardDescription>Productivity metric indicators comparing resolved tasks output.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4.5">
                {employeeProductivity.map((ep, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-6 py-1">
                    <div className="space-y-0.5 flex-1 max-w-sm">
                      <span className="text-xs font-bold text-foreground">{ep.name}</span>
                      <p className="text-[10px] text-muted-foreground">{ep.dept} | {ep.rate}</p>
                    </div>
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden shrink-0">
                      <div className="h-full bg-emerald-500" style={{ width: `${ep.percent}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Deadline risk index */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>Overdue & Deadline Risks</CardTitle>
                <CardDescription>Active tracking checking sprint cycle schedules.</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-border/50 flex-1 flex flex-col justify-between">
                {deadlineRisks.map((dr, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 gap-6 select-none">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-foreground block">{dr.level}</span>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Alert status: {dr.status}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold ${dr.color}`}>{dr.count}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 4. Resource Utilization metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization Parameters</CardTitle>
              <CardDescription>Track capacity parameters, data storage usage, and transactions loops.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resourceUtilization.map((ru, idx) => (
                <div key={idx} className="p-4 border border-border bg-muted/10 rounded-lg space-y-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-bold">{ru.resource}</span>
                    <span className="font-mono text-[10px] text-emerald-500 font-bold">{ru.allocated}</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: `${ru.percent}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground">{ru.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* 5. Workspace Activity Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Workspace Activity Heatmap</CardTitle>
              <CardDescription>Heatmap detailing task completions and workspace activities over the past 24 weeks.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 justify-end text-[10px] text-muted-foreground font-bold">
                <span>Less</span>
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-muted border border-border" />
                  <span className="w-2.5 h-2.5 rounded bg-orange-500/20 border border-orange-500/10" />
                  <span className="w-2.5 h-2.5 rounded bg-orange-500/50 border border-orange-500/20" />
                  <span className="w-2.5 h-2.5 rounded bg-orange-500 border border-orange-500/30" />
                </div>
                <span>More</span>
              </div>

              {/* Heatmap grid */}
              <div className="overflow-x-auto pb-2">
                <div className="flex gap-1.5 min-w-[640px]">
                  {/* Grid labels */}
                  <div className="grid grid-rows-7 gap-1 text-[8px] font-bold text-muted-foreground pr-2 justify-items-end select-none">
                    <span>Sun</span>
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                  </div>

                  {/* 24 Columns */}
                  <div className="flex-1 grid gap-1.5" style={{ gridTemplateColumns: 'repeat(24, minmax(0, 1fr))' }}>
                    {Array.from({ length: 24 }).map((_, colIdx) => (
                      <div key={colIdx} className="grid grid-rows-7 gap-1">
                        {Array.from({ length: 7 }).map((_, rowIdx) => {
                          // Deterministic activity levels for mock premium look
                          const val = (colIdx * 3 + rowIdx * 7) % 5;
                          const bgClass =
                            val === 0
                              ? 'bg-muted hover:bg-muted/80'
                              : val === 1
                              ? 'bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/10'
                              : val === 2
                              ? 'bg-orange-500/50 hover:bg-orange-500/60 border border-orange-500/20'
                              : 'bg-orange-500 hover:bg-orange-600 border border-orange-500/30';

                          return (
                            <div
                              key={rowIdx}
                              className={`w-3.5 h-3.5 rounded transition-all cursor-pointer ${bgClass}`}
                              title={`Week ${colIdx + 1}, Day ${rowIdx + 1}: ${val} updates dispatched`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

    </div>
  );
};

export default Analytics;
