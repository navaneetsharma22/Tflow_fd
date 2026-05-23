import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Shield, User } from 'lucide-react';

const Team = () => {
  const members = [
    { id: '1', name: 'Navaneet Sharma', email: 'admin@taskflow.com', role: 'SUPER_ADMIN', designation: 'Principal Architect' },
    { id: '2', name: 'Sarah Connor', email: 'developer@taskflow.com', role: 'DEVELOPER', designation: 'Senior Backend Engineer' },
    { id: '3', name: 'John Doe', email: 'john@taskflow.com', role: 'DEVELOPER', designation: 'UI/UX Designer' },
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
          <h1 className="text-3xl font-extrabold tracking-tight">Team Members</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage tenant workspace users and access roles.</p>
        </div>
        <button className="flex items-center gap-2 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-md shadow-orange-600/20">
          <UserPlus className="h-4 w-4" /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m) => (
          <motion.div
            key={m.id}
            whileHover={{ y: -4 }}
            className="p-6 border border-border bg-card/40 backdrop-blur-md rounded-3xl relative group shadow-sm flex flex-col justify-between"
          >
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center font-bold text-orange-500 text-lg uppercase">
                {m.name.slice(0, 2)}
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight group-hover:text-orange-500 transition-colors">
                  {m.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">{m.designation}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-2">
                  <Mail className="h-3.5 w-3.5" />
                  {m.email}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Shield className="h-4 w-4 text-orange-500" />
                Role:
              </div>
              <span className="text-[10px] font-extrabold bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded">
                {m.role}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Team;
