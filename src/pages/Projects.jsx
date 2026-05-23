import React from 'react';
import { motion } from 'framer-motion';
import { FolderOpen, ArrowUpRight, Plus, FolderGit2 } from 'lucide-react';

const Projects = () => {
  const mockProjects = [
    { id: '1', name: 'Alpha SaaS Engine', code: 'ASE', healthScore: 92, status: 'Active' },
    { id: '2', name: 'Beta Mobile Port', code: 'BMP', healthScore: 78, status: 'Active' },
    { id: '3', name: 'Compliance Portal 3', code: 'CP3', healthScore: 84, status: 'Planning' },
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
          <h1 className="text-3xl font-extrabold tracking-tight">Projects Workspace</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and track isolated tenant workspace projects.</p>
        </div>
        <button className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-md shadow-orange-600/20">
          <Plus className="h-4 w-4" /> Create Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProjects.map((p, idx) => (
          <motion.div
            key={p.id}
            whileHover={{ y: -4 }}
            className="p-6 border border-border bg-card/40 backdrop-blur-md rounded-3xl flex flex-col justify-between min-h-[180px] shadow-sm relative group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <FolderGit2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight group-hover:text-orange-500 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Code: {p.code}</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                p.status === 'Active' ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20' : 'text-amber-500 bg-amber-500/10 border border-amber-500/20'
              }`}>
                {p.status}
              </span>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Health Score</p>
                <span className={`text-lg font-extrabold ${p.healthScore < 80 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {p.healthScore}%
                </span>
              </div>

              <button className="p-2 rounded-lg bg-muted/40 hover:bg-orange-500/10 hover:text-orange-500 border border-border transition-colors cursor-pointer">
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
