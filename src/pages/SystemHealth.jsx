import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Cpu, HardDrive, Network, Database } from 'lucide-react';
import api from '../lib/api.js';

const SystemHealth = () => {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const loadHealth = async () => {
      try {
        const response = await api.get('/health');
        const payload = response.data?.data ?? response.data;
        if (!cancelled) {
          setHealth(payload);
        }
      } catch {
        if (!cancelled) {
          setHealth(null);
        }
      }
    };

    loadHealth();
    return () => {
      cancelled = true;
    };
  }, []);

  const services = health?.services
    ? [
        { name: 'Database Cluster', status: health.services.database, latency: '—', details: 'MongoDB readiness reported by backend' },
        { name: 'Cache Layer', status: health.services.cache, latency: '—', details: 'Cache readiness reported by backend' },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">System Infrastructure Health</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Real-time metrics of active server clusters, caching pipelines, and database pools.
        </p>
      </div>

      {/* 1. Infrastructure Resource Meters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">CPU Core Utilization</span>
            <Cpu className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-extrabold">{health?.memory?.heapUsedMb ? `${health.memory.heapUsedMb} MB` : '—'}</span>
              <span className="text-xs font-semibold text-muted-foreground">{health?.uptimeSeconds ? `Uptime: ${health.uptimeSeconds}s` : 'Waiting for backend health'}</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-orange-500" style={{ width: '25%' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">RAM Allocation</span>
            <HardDrive className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-extrabold">{health?.memory?.rssMb ? `${health.memory.rssMb} MB` : '—'}</span>
              <span className="text-xs font-semibold text-muted-foreground">{health?.memory?.heapTotalMb ? `heap total ${health.memory.heapTotalMb} MB` : 'Waiting for backend health'}</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '53%' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Redis Node Operations</span>
            <Network className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-extrabold">{health?.services?.cache ? 'Live' : '—'}</span>
              <span className="text-xs font-semibold text-muted-foreground">{health?.services?.cache || 'Waiting for backend health'}</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: '88%' }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 2. Micro-Services Latency Status Table */}
      <Card>
        <CardHeader>
          <CardTitle>Micro-Service Pipeline Telemetry</CardTitle>
          <CardDescription>Live health checks reporting heartbeats across background nodes.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border/50">
          {services.length > 0 ? (
            services.map((srv, idx) => (
              <div key={idx} className="flex items-center justify-between py-4.5 first:pt-0 last:pb-0 gap-6 select-none">
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
                    <Database className="h-4.5 w-4.5" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-foreground">{srv.name}</span>
                    <p className="text-xs text-muted-foreground">{srv.details}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-muted-foreground">{srv.latency}</span>
                  <Badge variant="success" className="font-extrabold text-[9px] px-2 py-0">
                    {srv.status}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="py-4 text-xs text-muted-foreground">No live service telemetry available.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemHealth;
