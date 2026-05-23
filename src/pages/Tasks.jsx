import React from 'react';
import { motion } from 'framer-motion';
import { Plus, CheckSquare, Clock, ShieldAlert } from 'lucide-react';

const Tasks = () => {
  const mockTasks = [
    { id: '1', title: 'Setup auth encryption bounds', priority: 'CRITICAL', status: 'TODO', due: '24 hrs' },
    { id: '2', title: 'Implement DFS task validations', priority: 'HIGH', status: 'IN_PROGRESS', due: '48 hrs' },
    { id: '3', title: 'Optimize cursor memory buffers', priority: 'MEDIUM', status: 'COMPLETED', due: 'Completed' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 select-none"
    >
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Tasks Workspace</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and update specific workspace task tickets.</p>
        </div>
        <button className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-md shadow-orange-600/20">
          <Plus className="h-4 w-4" /> Create Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {['TODO', 'IN_PROGRESS', 'COMPLETED'].map((statusColumn) => (
          <div key={statusColumn} className="p-4 rounded-2xl bg-card/20 border border-border min-h-[350px] space-y-4">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-border">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {statusColumn.replace('_', ' ')}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted/40">
                {mockTasks.filter((t) => t.status === statusColumn).length}
              </span>
            </div>

            <div className="space-y-3">
              {mockTasks
                .filter((t) => t.status === statusColumn)
                .map((task) => (
                  <motion.div
                    key={task.id}
                    whileHover={{ scale: 1.01 }}
                    className="p-4 border border-border bg-card/50 backdrop-blur-sm rounded-2xl shadow-sm space-y-3 relative group"
                  >
                    <h4 className="font-semibold text-sm group-hover:text-orange-500 transition-colors leading-snug">
                      {task.title}
                    </h4>

                    <div className="flex items-center justify-between pt-2">
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${
                        task.priority === 'CRITICAL'
                          ? 'text-rose-500 bg-rose-500/10 border border-rose-500/20'
                          : task.priority === 'HIGH'
                          ? 'text-amber-500 bg-amber-500/10 border border-amber-500/20'
                          : 'text-blue-500 bg-blue-500/10 border border-blue-500/20'
                      }`}>
                        {task.priority}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {task.due}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Tasks;
