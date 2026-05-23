import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Key, Eye, HelpCircle } from 'lucide-react';

const SettingsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 select-none"
    >
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Workspace Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure tenant scopes, security credentials, and preferences.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Organization settings card */}
        <div className="p-6 border border-border bg-card/40 backdrop-blur-md rounded-3xl space-y-4">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Settings className="h-5 w-5 text-orange-500" />
            <h3 className="font-bold text-lg">Tenant Metadata</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Workspace Name
              </label>
              <input
                type="text"
                defaultValue="Acme Corporation"
                className="w-full px-4 py-2.5 bg-muted/40 border border-border rounded-xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Active Tenant ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value="org_6f3e1b7a2d"
                  className="w-full px-4 py-2.5 bg-muted/20 border border-border rounded-xl text-sm font-mono text-muted-foreground select-all focus:outline-none"
                />
              </div>
            </div>
          </div>
          <button className="py-2 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-md shadow-orange-600/20">
            Save Modifications
          </button>
        </div>

        {/* Security credentials settings */}
        <div className="p-6 border border-border bg-card/40 backdrop-blur-md rounded-3xl space-y-4">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Shield className="h-5 w-5 text-orange-500" />
            <h3 className="font-bold text-lg">Workspace API Access Keys</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-2xl border border-border bg-muted/20">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">Integrations API token</p>
                  <p className="text-xs font-mono text-muted-foreground">tf_live_••••••••••••••••</p>
                </div>
              </div>
              <button className="p-2 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer">
                <Eye className="h-4.5 w-4.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
