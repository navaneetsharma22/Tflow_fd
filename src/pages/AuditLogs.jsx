import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { ShieldCheck, Search, Filter } from 'lucide-react';

const AuditLogs = () => {
  const [logs] = useState([
    { id: '1', actor: 'admin@taskflow.com', action: 'TENANT_SUSPEND', target: 'Umbrella Inc', ip: '192.168.1.1', time: '2026-05-23 16:10:45' },
    { id: '2', actor: 'developer@taskflow.com', action: 'IP_WHITELIST_ADD', target: '10.0.0.45', ip: '10.0.0.45', time: '2026-05-23 15:42:19' },
    { id: '3', actor: 'admin@taskflow.com', action: 'FEATURE_TOGGLE_MOD', target: 'AI Prediction System', ip: '192.168.1.1', time: '2026-05-23 14:02:11' },
    { id: '4', actor: 'billing@taskflow.com', action: 'TRIAL_CONVERSION', target: 'Acme SaaS Corp', ip: '82.110.4.92', time: '2026-05-23 11:20:02' },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">System Audit Registry</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Immutable logs tracking SaaS administrative operations, compliance actions, and whitelisting.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Administrative Activity Registry</CardTitle>
            <CardDescription>Verify session logs, whitelisting updates, and organization suspension records.</CardDescription>
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold uppercase self-start sm:self-auto">
            <ShieldCheck className="h-4 w-4" /> Cryptographic Integrity Verified
          </span>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actor Account</TableHead>
                <TableHead>Operation Action</TableHead>
                <TableHead>Target Entity</TableHead>
                <TableHead>Origin Coordinate</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-bold text-xs">{log.actor}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.action.includes('SUSPEND')
                          ? 'destructive'
                          : log.action.includes('WHITELIST')
                          ? 'primary'
                          : 'secondary'
                      }
                      className="font-mono text-[9px] font-extrabold"
                    >
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-semibold">{log.target}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{log.ip}</TableCell>
                  <TableCell className="text-right font-mono text-[10px] text-muted-foreground">{log.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogs;
