import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import {
  FolderOpen,
  Plus,
  LayoutGrid,
  List,
  Calendar as CalendarIcon,
  Clock,
  ArrowRight,
  TrendingUp,
  FolderGit2,
  GitPullRequest,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

const Projects = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban', 'timeline', 'list', 'calendar'

  // Task list containing statuses, dependencies, dates, and priorities
  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Setup whitelist security bounds whitelisting',
      desc: 'Harden Express.js entry routes against tenant isolation leaks using specialized middleware checks.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      due: '2026-05-24',
      dateLabel: 'May 24',
      dependency: 'task-3',
      depLabel: 'Depends on DFS Cycles Check',
    },
    {
      id: 'task-2',
      title: 'Configure Redis connection pooling',
      desc: 'Optimize cluster pool caching bounds to prevent Redis memory spikes under high concurrent tenant requests.',
      status: 'BACKLOG',
      priority: 'MEDIUM',
      due: '2026-05-28',
      dateLabel: 'May 28',
      dependency: null,
      depLabel: 'No dependencies',
    },
    {
      id: 'task-3',
      title: 'DFS Graph Cycles Traversal Check',
      desc: 'Implement fast cycles check loops inside BullMQ workflow dispatchers to prevent deadlock runs.',
      status: 'DONE',
      priority: 'CRITICAL',
      due: '2026-05-20',
      dateLabel: 'May 20',
      dependency: null,
      depLabel: 'No dependencies',
    },
    {
      id: 'task-4',
      title: 'Multi-tenant context hooks execution',
      desc: 'Register workspace partition X-Organization-Id hooks inside axios instance requests.',
      status: 'DONE',
      priority: 'HIGH',
      due: '2026-05-22',
      dateLabel: 'May 22',
      dependency: 'task-1',
      depLabel: 'Depends on Auth Whitelist',
    },
  ]);

  // Simulate Drag & Drop status transition
  const handleShiftStatus = (id, newStatus, title) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          toast({
            title: 'Task Transitioned Successfully',
            description: `"${title}" status updated to ${newStatus}.`,
            variant: 'success',
          });
          return { ...t, status: newStatus };
        }
        return t;
      })
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Alpha SaaS Engine Workspace</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage agile tasks, audit dependency flows, and track timeline logs for isolated tenant sprints.
          </p>
        </div>
        <Button className="shrink-0 self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" /> Add Sprint Task
        </Button>
      </div>

      {/* Tabs Switcher Navigation */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-card border border-border w-fit">
        {[
          { id: 'kanban', label: 'Kanban Board', icon: LayoutGrid },
          { id: 'timeline', label: 'Timeline / Gantt', icon: Clock },
          { id: 'list', label: 'Detail List', icon: List },
          { id: 'calendar', label: 'Sprint Calendar', icon: CalendarIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Tab Views container */}
      <AnimatePresence mode="wait">
        
        {/* 1. KANBAN BOARD */}
        {activeTab === 'kanban' && (
          <motion.div
            key="kanban"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Columns */}
            {['BACKLOG', 'IN_PROGRESS', 'DONE'].map((col) => {
              const colTasks = tasks.filter((t) => t.status === col);
              return (
                <div key={col} className="p-4 rounded-2xl bg-card/30 border border-border/80 flex flex-col min-h-[380px] space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs font-bold text-foreground/80 tracking-wider">
                      {col === 'BACKLOG' ? 'Sprint Backlog' : col === 'IN_PROGRESS' ? 'Active Work' : 'Completed tasks'}
                    </span>
                    <Badge variant={col === 'DONE' ? 'success' : col === 'IN_PROGRESS' ? 'warning' : 'secondary'}>
                      {colTasks.length}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-4 overflow-y-auto pr-0.5">
                    {colTasks.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-xl border border-border bg-card/50 hover:border-orange-500/30 transition-all space-y-3 relative group"
                      >
                        <div className="flex justify-between items-start">
                          <Badge variant={t.priority === 'CRITICAL' ? 'destructive' : t.priority === 'HIGH' ? 'warning' : 'secondary'}>
                            {t.priority}
                          </Badge>
                          <span className="text-[10px] font-mono text-muted-foreground">{t.dateLabel}</span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-bold text-foreground leading-snug">{t.title}</p>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">{t.desc}</p>
                        </div>

                        {t.dependency && (
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 w-fit">
                            <GitPullRequest className="h-3 w-3" />
                            {t.depLabel}
                          </div>
                        )}

                        {/* Interactive Drag & Drop Shift toggles */}
                        <div className="flex gap-1.5 pt-2 border-t border-border/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          {col !== 'BACKLOG' && (
                            <button
                              onClick={() => handleShiftStatus(t.id, 'BACKLOG', t.title)}
                              className="px-2 py-1 rounded bg-muted hover:bg-muted/80 text-[9px] font-bold transition-all cursor-pointer"
                            >
                              To Backlog
                            </button>
                          )}
                          {col !== 'IN_PROGRESS' && (
                            <button
                              onClick={() => handleShiftStatus(t.id, 'IN_PROGRESS', t.title)}
                              className="px-2 py-1 rounded bg-muted hover:bg-muted/80 text-[9px] font-bold transition-all cursor-pointer"
                            >
                              To Work
                            </button>
                          )}
                          {col !== 'DONE' && (
                            <button
                              onClick={() => handleShiftStatus(t.id, 'DONE', t.title)}
                              className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-[9px] font-bold transition-all cursor-pointer"
                            >
                              Resolve Task
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {colTasks.length === 0 && (
                      <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
                        No tasks active in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* 2. TIMELINE / GANTT VIEW */}
        {activeTab === 'timeline' && (
          <motion.div
            key="timeline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Sprint Gantt Timeline</CardTitle>
                <CardDescription>Visual Gantt metrics mapping active timelines and task dependency links.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {tasks.map((t, idx) => (
                  <div key={t.id} className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 py-2 border-b border-border last:border-b-0">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-foreground block">{t.title}</span>
                      <p className="text-[10px] text-muted-foreground">{t.depLabel}</p>
                    </div>
                    <div>
                      <Badge variant={t.status === 'DONE' ? 'success' : t.status === 'IN_PROGRESS' ? 'warning' : 'secondary'}>
                        {t.status}
                      </Badge>
                    </div>
                    {/* Visual Gantt Bar mapping dates May 20 - May 28 */}
                    <div className="md:col-span-2 relative h-6 w-full bg-muted/30 border border-border rounded-md overflow-hidden">
                      <div
                        className={`h-full rounded bg-gradient-to-r from-orange-500 to-amber-500 opacity-80 flex items-center px-3`}
                        style={{
                          marginLeft: idx === 0 ? '40%' : idx === 1 ? '70%' : idx === 2 ? '10%' : '50%',
                          width: idx === 0 ? '30%' : idx === 1 ? '20%' : idx === 2 ? '40%' : '30%',
                        }}
                      >
                        <span className="text-[9px] font-bold text-white truncate">{t.dateLabel}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 3. DETAIL LIST VIEW */}
        {activeTab === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Workspace Sprint Task List</CardTitle>
                <CardDescription>Detail administrative listing detailing sprint backlogs.</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-border/50">
                {tasks.map((t) => (
                  <div key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 first:pt-0 last:pb-0 gap-4">
                    <div className="space-y-1 flex-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{t.title}</span>
                        <Badge variant={t.priority === 'CRITICAL' ? 'destructive' : t.priority === 'HIGH' ? 'warning' : 'secondary'}>
                          {t.priority}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{t.desc}</p>
                      {t.dependency && (
                        <p className="text-[9px] text-orange-500 font-bold">{t.depLabel}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <span className="text-xs font-semibold text-muted-foreground font-mono">{t.dateLabel}</span>
                      <Badge variant={t.status === 'DONE' ? 'success' : t.status === 'IN_PROGRESS' ? 'warning' : 'secondary'}>
                        {t.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* 4. SPRINT CALENDAR VIEW */}
        {activeTab === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>May 2026 Calendar</CardTitle>
                <CardDescription>Allocated sprint tasks bubbles placed on their specific due dates.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* 7-column calendar grid */}
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold border-b border-border pb-3 mb-3 text-muted-foreground">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-3 min-h-[300px]">
                  {/* Generate empty slots for May calendar starting on Friday */}
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="p-2 border border-border/20 bg-muted/5 rounded-lg min-h-[60px]" />
                  ))}

                  {/* Render May days 1 to 31 */}
                  {Array.from({ length: 31 }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const dateStr = `2026-05-${dayNum.toString().padStart(2, '0')}`;
                    const dayTasks = tasks.filter((t) => t.due === dateStr);

                    return (
                      <div key={dayNum} className="p-2 border border-border bg-card/20 rounded-lg min-h-[70px] flex flex-col justify-between hover:border-orange-500/20 transition-all select-none">
                        <span className="text-[10px] font-bold text-muted-foreground block text-right">{dayNum}</span>
                        <div className="space-y-1 mt-1">
                          {dayTasks.map((t) => (
                            <div
                              key={t.id}
                              className="p-1 rounded bg-orange-500/10 text-orange-500 border border-orange-500/20 text-[8px] font-bold leading-tight truncate"
                              title={t.title}
                            >
                              {t.title.split(' ')[0]}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default Projects;
