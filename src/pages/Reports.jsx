import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { Calendar, FileText, CheckCircle, Clock, X } from 'lucide-react';

const Reports = () => {
  const { toast } = useToast();

  const [leaves, setLeaves] = useState([
    { id: '1', name: 'John Connor', type: 'Annual Leave', duration: '3 days', status: 'PENDING' },
    { id: '2', name: 'Kyle Reese', type: 'Sick Leave', duration: '1 day', status: 'APPROVED' },
    { id: '3', name: 'Sarah Connor', type: 'Personal Leave', duration: '2 days', status: 'PENDING' },
  ]);

  const handleApprove = (id, name) => {
    setLeaves((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          toast({
            title: 'Leave Request Approved',
            description: `Successfully authorized leave duration for "${name}".`,
            variant: 'success',
          });
          return { ...l, status: 'APPROVED' };
        }
        return l;
      })
    );
  };

  const handleReject = (id, name) => {
    setLeaves((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          toast({
            title: 'Leave Request Rejected',
            description: `Declined leave request for "${name}".`,
            variant: 'destructive',
          });
          return { ...l, status: 'REJECTED' };
        }
        return l;
      })
    );
  };

  const handleDownload = (format) => {
    toast({
      title: 'Report Compilation Complete',
      description: `Downloaded organization productivity logs in ${format} format.`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Organization Operations Reports</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit team attendance metrics, active leave requests, and compile productivity summaries.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Button onClick={() => handleDownload('PDF')} variant="outline">
            <FileText className="h-4.5 w-4.5 mr-2" /> Compile PDF
          </Button>
          <Button onClick={() => handleDownload('CSV')}>
            <FileText className="h-4.5 w-4.5 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {/* 1. Attendance KPI metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Attendance Present Rate</span>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-extrabold">94.8%</span>
            <p className="text-[10px] text-muted-foreground mt-1">Average daily attendance rate this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Leaves Pending Decisions</span>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-extrabold">2 Requests</span>
            <p className="text-[10px] text-muted-foreground mt-1">Decisions required by managers today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Productive Hours</span>
            <Calendar className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <span className="text-2xl font-extrabold">1,840 hrs</span>
            <p className="text-[10px] text-muted-foreground mt-1">Accrued sprint workload hours this month</p>
          </CardContent>
        </Card>
      </div>

      {/* 2. Leave Requests Management */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance & Leave Decision Board</CardTitle>
          <CardDescription>Approve or deny team leave request vectors submitted within your tenant organization partition.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee Profile</TableHead>
                <TableHead>Leave Category</TableHead>
                <TableHead>Requested Span</TableHead>
                <TableHead>Request Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="font-bold text-foreground">{l.name}</TableCell>
                  <TableCell className="text-xs text-foreground/80 font-semibold">{l.type}</TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">{l.duration}</TableCell>
                  <TableCell>
                    <Badge variant={l.status === 'APPROVED' ? 'success' : l.status === 'PENDING' ? 'warning' : 'destructive'}>
                      {l.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {l.status === 'PENDING' ? (
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleApprove(l.id, l.name)}
                          className="p-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition-colors cursor-pointer"
                          title="Approve Leave"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleReject(l.id, l.name)}
                          className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors cursor-pointer"
                          title="Reject Leave"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-muted-foreground">Decision Logged</span>
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

export default Reports;
