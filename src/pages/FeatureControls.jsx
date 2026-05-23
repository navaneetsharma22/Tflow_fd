import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Sparkles, Terminal, BellRing, EyeOff } from 'lucide-react';

const FeatureControls = () => {
  const { toast } = useToast();

  const [toggles, setToggles] = useState([
    { id: '1', name: 'AI Workload Risk Prediction', description: 'Enable advanced machine learning risk models for sprint cycle checks.', enabled: true, icon: Sparkles, badge: 'PRO' },
    { id: '2', name: 'Slack Hook Integrations', description: 'Dispatch channel webhook notifications on task modifications.', enabled: false, icon: BellRing, badge: 'STANDARD' },
    { id: '3', name: 'Advanced DFS Cycle Check', description: 'Graph based loop traversal O(V+E) bottleneck checks.', enabled: true, icon: Terminal, badge: 'PLATINUM' },
    { id: '4', name: 'Dark Orange Sleek Theme Override', description: 'Allows organizations to force customizable dark-slate layouts.', enabled: true, icon: EyeOff, badge: 'ENTERPRISE' },
  ]);

  const handleToggle = (id) => {
    setToggles((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const newState = !t.enabled;
          toast({
            title: newState ? 'Feature Enabled' : 'Feature Disabled',
            description: `Feature toggle "${t.name}" set to ${newState ? 'ON' : 'OFF'}.`,
            variant: 'primary',
          });
          return { ...t, enabled: newState };
        }
        return t;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Feature Controls</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Administer active system-wide feature flags, experimental toggles, and beta controls.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Feature Flags</CardTitle>
          <CardDescription>Instantly deploy system capabilities or restrict experimental utilities across all active tenants.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border/50">
          {toggles.map((flag) => {
            const Icon = flag.icon;
            return (
              <div key={flag.id} className="flex items-center justify-between py-4.5 first:pt-0 last:pb-0 gap-6 select-none">
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{flag.name}</span>
                      <Badge variant="secondary" className="text-[9px] px-2 font-extrabold py-0">{flag.badge}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground max-w-xl">{flag.description}</p>
                  </div>
                </div>

                {/* Customized Premium Slide Switch Toggle */}
                <button
                  onClick={() => handleToggle(flag.id)}
                  className={`w-11 h-6 rounded-full transition-all duration-300 relative border flex items-center cursor-pointer ${
                    flag.enabled
                      ? 'bg-orange-500 border-orange-600 justify-end'
                      : 'bg-muted border-border/80 justify-start'
                  }`}
                >
                  <span
                    className={`h-4.5 w-4.5 rounded-full bg-white shadow-sm transition-transform duration-300 mx-0.5`}
                  />
                </button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeatureControls;
