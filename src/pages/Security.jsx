import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table.jsx';
import { Shield, Key, Terminal, Laptop, X, Plus } from 'lucide-react';

const Security = () => {
  const { toast } = useToast();

  // IP Whitelist States
  const [ips, setIps] = useState(['192.168.1.1', '10.0.0.45', '82.110.4.92']);
  const [newIp, setNewIp] = useState('');

  // Active Sessions States
  const [sessions, setSessions] = useState([
    { id: '1', device: 'Chrome on macOS', ip: '192.168.1.1', current: true },
    { id: '2', device: 'Safari on iPhone', ip: '10.0.0.45', current: false },
    { id: '3', device: 'Firefox on Windows', ip: '82.110.4.92', current: false },
  ]);

  const handleAddIp = (e) => {
    e.preventDefault();
    if (!newIp) return;
    
    // IP Address format checking
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipRegex.test(newIp)) {
      toast({ title: 'Invalid Formatting', description: 'Please enter a valid IPv4 address.', variant: 'warning' });
      return;
    }

    setIps([...ips, newIp]);
    setNewIp('');
    toast({ title: 'IP Whitelisted', description: `Access coordinate ${newIp} successfully authorized.`, variant: 'success' });
  };

  const handleRemoveIp = (ipToRemove) => {
    setIps((prev) => prev.filter((ip) => ip !== ipToRemove));
    toast({ title: 'Access Revoked', description: `IP Address ${ipToRemove} removed from whitelist.`, variant: 'destructive' });
  };

  const handleRevokeSession = (id, device) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    toast({ title: 'Session Terminated', description: `Active access token revoked for "${device}".`, variant: 'destructive' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Security & Governance</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure active whitelists, session scopes, and multi-factor compliance.
        </p>
      </div>

      {/* 1. IP Whitelisting Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Authorized IP Whitelist</CardTitle>
            <CardDescription>Restrict SaaS administration access to secure corporate networks or gateway coordinates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleAddIp} className="flex gap-3">
              <input
                type="text"
                value={newIp}
                onChange={(e) => setNewIp(e.target.value)}
                placeholder="e.g. 192.168.1.50"
                className="flex-1 rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
              <Button type="submit" size="sm">
                <Plus className="h-4 w-4 mr-1.5" /> Whitelist
              </Button>
            </form>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {ips.map((ip, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-border bg-muted/10 font-mono text-xs font-semibold">
                  <span>{ip}</span>
                  <button
                    onClick={() => handleRemoveIp(ip)}
                    className="p-1 rounded text-muted-foreground hover:text-rose-500 hover:bg-rose-500/5 transition-colors cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Global Multi-Factor Enforcements */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Global Multi-Factor Compliance</CardTitle>
            <CardDescription>Enforce rigid 2FA checks upon all administrative logins across the SaaS workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="p-4 rounded-lg bg-orange-500/5 border border-orange-500/10 flex items-start gap-3">
              <Shield className="h-5 w-5 text-orange-500 shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="text-xs font-bold text-orange-500">Rigid Security Bounds Active</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                  Active administrators are requested to complete passcode validations. Self-enrollment bypasses are suspended.
                </p>
              </div>
            </div>
            <button className="w-full py-2 rounded-lg border border-border hover:border-orange-500/30 bg-muted/30 hover:bg-orange-500/5 text-xs font-bold transition-all cursor-pointer">
              Configure Compliance Bounds
            </button>
          </CardContent>
        </Card>
      </div>

      {/* 2. Active Session Management */}
      <Card>
        <CardHeader>
          <CardTitle>Active Session Registry</CardTitle>
          <CardDescription>Review authorized devices currently linked to your SaaS super admin credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Linked Device</TableHead>
                <TableHead>IP Coordinates</TableHead>
                <TableHead>Session Token Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Laptop className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
                      <span className="font-bold text-foreground">{s.device}</span>
                      {s.current && <Badge variant="success" className="text-[9px] px-1.5 py-0 font-extrabold h-4">Current Session</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{s.ip}</TableCell>
                  <TableCell>
                    <Badge variant={s.current ? 'success' : 'secondary'}>
                      {s.current ? 'ACTIVE' : 'IDLE'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {!s.current ? (
                      <Button size="sm" variant="destructive" onClick={() => handleRevokeSession(s.id, s.device)}>
                        Revoke Access
                      </Button>
                    ) : (
                      <span className="text-xs font-semibold text-muted-foreground">Immutable</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Security;
