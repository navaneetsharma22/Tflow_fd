import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { ShieldAlert, Users, Shield, Terminal } from 'lucide-react';

const Roles = () => {
  const { toast } = useToast();

  const [roles, setRoles] = useState([
    {
      id: 'admin',
      name: 'Administrator',
      users: 2,
      permissions: [
        { name: 'Manage Integrations', enabled: true },
        { name: 'Invite Employees', enabled: true },
        { name: 'Billing & Subscriptions', enabled: true },
        { name: 'Export Audit Logs', enabled: true },
      ],
      icon: Shield,
    },
    {
      id: 'manager',
      name: 'Department Manager',
      users: 5,
      permissions: [
        { name: 'Manage Integrations', enabled: false },
        { name: 'Invite Employees', enabled: true },
        { name: 'Billing & Subscriptions', enabled: false },
        { name: 'Export Audit Logs', enabled: true },
      ],
      icon: Users,
    },
    {
      id: 'member',
      name: 'Workspace Member',
      users: 98,
      permissions: [
        { name: 'Manage Integrations', enabled: false },
        { name: 'Invite Employees', enabled: false },
        { name: 'Billing & Subscriptions', enabled: false },
        { name: 'Export Audit Logs', enabled: false },
      ],
      icon: Terminal,
    },
  ]);

  const handleTogglePermission = (roleId, permName) => {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.id === roleId) {
          const updatedPerms = r.permissions.map((p) => {
            if (p.name === permName) {
              const newState = !p.enabled;
              toast({
                title: 'RBAC Permission Modified',
                description: `Permission "${permName}" for role "${r.name}" set to ${newState ? 'ENABLED' : 'DISABLED'}.`,
                variant: 'primary',
              });
              return { ...p, enabled: newState };
            }
            return p;
          });
          return { ...r, permissions: updatedPerms };
        }
        return r;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Access Role Profiles (RBAC)</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure security authorization profiles, fine-grained access policies, and member allocations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Card key={role.id}>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/50 pb-4 mb-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {role.name}
                      <Badge variant="secondary" className="text-[10px] px-2 py-0 h-4.5 font-extrabold">
                        {role.users} active members
                      </Badge>
                    </CardTitle>
                    <CardDescription>Grandular permission mappings for active {role.name.toLowerCase()} sessions.</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {role.permissions.map((perm, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 select-none">
                    <span className="text-xs font-bold text-foreground/80">{perm.name}</span>
                    <button
                      onClick={() => handleTogglePermission(role.id, perm.name)}
                      className={`w-9 h-5 rounded-full transition-all duration-300 relative border flex items-center cursor-pointer ${
                        perm.enabled ? 'bg-orange-500 border-orange-600 justify-end' : 'bg-muted border-border/80 justify-start'
                      }`}
                    >
                      <span className="h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-300 mx-0.5" />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Roles;
