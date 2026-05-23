import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { DollarSign, HardDrive, Users, Calendar, AlertTriangle } from 'lucide-react';

const Billing = () => {
  const { toast } = useToast();

  const [trials, setTrials] = useState([
    { id: '1', org: 'Wayne Corp', expires: '2026-06-10', storage: '2.4 GB', converted: false },
    { id: '2', org: 'Cyberdyne Systems', expires: '2026-05-30', storage: '4.8 GB', converted: false },
    { id: '3', org: 'LexCorp Labs', expires: '2026-06-05', storage: '1.1 GB', converted: false },
  ]);

  const handleExtendTrial = (id) => {
    setTrials((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          toast({
            title: 'Trial Extended',
            description: `Trial for workspace "${t.org}" extended by 14 days.`,
            variant: 'success',
          });
          // Add 14 days to expires date string
          const newDate = new Date(t.expires);
          newDate.setDate(newDate.getDate() + 14);
          return { ...t, expires: newDate.toISOString().split('T')[0] };
        }
        return t;
      })
    );
  };

  const handleConvertTrial = (id) => {
    setTrials((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          toast({
            title: 'Converted to Paid Plan',
            description: `Workspace "${t.org}" has been upgraded to a paid Enterprise plan.`,
            variant: 'success',
          });
          return { ...t, converted: true };
        }
        return t;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Plans & Billing</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Supervise global allocations, trials, storage meters, and MRR cashflows.
        </p>
      </div>

      {/* 1. Global Stat Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">MRR Cashflow</span>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-extrabold">$24,920</span>
            <p className="text-[10px] text-muted-foreground mt-1">+12.4% from preceding month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Global Storage Meter</span>
            <HardDrive className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-2xl font-extrabold">91.0 GB</span>
              <span className="text-[10px] font-bold text-muted-foreground">allocated of 260 GB</span>
            </div>
            {/* Storage Progress bar */}
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-500" style={{ width: '35%' }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Active Trials</span>
            <Calendar className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-extrabold">3 Active</span>
            <p className="text-[10px] text-muted-foreground mt-1">2 conversions pending in next 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Trial Management */}
      <Card>
        <CardHeader>
          <CardTitle>Active Trials Registry</CardTitle>
          <CardDescription>Extend active trial spans or immediately transition workspace partitions to paid subscriptions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workspace Partition</TableHead>
                <TableHead>Trial Expiration</TableHead>
                <TableHead>Active Size</TableHead>
                <TableHead>Subscription Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-bold">{t.org}</TableCell>
                  <TableCell className="text-xs font-mono">{t.expires}</TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">{t.storage}</TableCell>
                  <TableCell>
                    <Badge variant={t.converted ? 'success' : 'warning'}>
                      {t.converted ? 'Paid Plan' : 'Free Trial'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {!t.converted ? (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleExtendTrial(t.id)}>
                          Extend +14d
                        </Button>
                        <Button size="sm" onClick={() => handleConvertTrial(t.id)}>
                          Convert to Paid
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-emerald-500">Upgrade Complete</span>
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

export default Billing;
