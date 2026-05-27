import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, ChevronLeft, ChevronRight, X, Building, Key, UserMinus, UserCheck } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table.jsx';
import Modal from '../components/ui/Modal.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import api from '../lib/api.js';

const Organizations = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  // Data States
  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI Control States
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Create Form States
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgPlan, setNewOrgPlan] = useState('FREE_TRIAL');
  const [createLoading, setCreateLoading] = useState(false);

  // Generated Code State
  const [generatedCode, setGeneratedCode] = useState('');
  const [selectedOrgForCode, setSelectedOrgForCode] = useState(null);

  // Delete State
  const [orgToDelete, setOrgToDelete] = useState(null);
  const [permanentDelete, setPermanentDelete] = useState(false);

  // ==========================================
  // Load organizations from backend
  // ==========================================
  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/superadmin/organizations');
      const payload = response.data?.data ?? response.data;
      const items = Array.isArray(payload) ? payload : [];
      setOrgs(items);
    } catch (err) {
      toast({
        title: 'Failed to Load Organizations',
        description: err.response?.data?.message || 'Could not reach the backend server.',
        variant: 'destructive',
      });
      setOrgs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  // ==========================================
  // Pagination Logic
  // ==========================================
  const itemsPerPage = 8;
  const filteredOrgs = orgs.filter((org) => {
    const matchesSearch =
      (org.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (org.code || '').toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || org.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredOrgs.length / itemsPerPage);
  const paginatedOrgs = filteredOrgs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ==========================================
  // Create Organization
  // ==========================================
  const handleCreateOrg = async (e) => {
    e.preventDefault();
    if (!newOrgName.trim()) {
      toast({ title: 'Validation Error', description: 'Organization name is required.', variant: 'warning' });
      return;
    }

    setCreateLoading(true);
    try {
      const response = await api.post('/superadmin/organizations', {
        name: newOrgName.trim(),
        subscriptionPlan: newOrgPlan,
      });
      const created = response.data?.data ?? response.data;
      toast({
        title: 'Organization Created',
        description: `Workspace "${created.name}" established with code ${created.code}.`,
        variant: 'success',
      });
      setCreateModalOpen(false);
      setNewOrgName('');
      setNewOrgPlan('FREE_TRIAL');
      fetchOrganizations();
    } catch (err) {
      toast({
        title: 'Creation Failed',
        description: err.response?.data?.message || 'Could not create organization.',
        variant: 'destructive',
      });
    } finally {
      setCreateLoading(false);
    }
  };

  // ==========================================
  // Show Invite Code
  // ==========================================
  const handleShowCode = (org) => {
    setSelectedOrgForCode(org);
    setGeneratedCode(org.code);
    setInviteModalOpen(true);
  };

  // ==========================================
  // Toggle Suspend / Restore
  // ==========================================
  const handleToggleSuspend = async (org) => {
    const newStatus = org.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await api.patch(`/superadmin/organizations/${org._id}/status`, { status: newStatus });
      toast({
        title: newStatus === 'SUSPENDED' ? 'Tenant Suspended' : 'Tenant Restored',
        description: `"${org.name}" status changed to ${newStatus}.`,
        variant: newStatus === 'SUSPENDED' ? 'destructive' : 'success',
      });
      fetchOrganizations();
    } catch (err) {
      toast({
        title: 'Status Update Failed',
        description: err.response?.data?.message || 'Could not update organization status.',
        variant: 'destructive',
      });
    }
  };

  // ==========================================
  // Delete Organization
  // ==========================================
  const openDeleteModal = (org) => {
    setOrgToDelete(org);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!orgToDelete) return;
    try {
      if (permanentDelete) {
        await api.delete(`/superadmin/organizations/${orgToDelete._id}/permanent?confirm=1`);
      } else {
        await api.delete(`/superadmin/organizations/${orgToDelete._id}`);
      }
      toast({
        title: permanentDelete ? 'Permanently Removed' : 'Organization Removed',
        description: `${orgToDelete.name} has been deleted.`,
        variant: 'success',
      });
      fetchOrganizations();
    } catch (err) {
      toast({
        title: 'Deletion Failed',
        description: err.response?.data?.message || 'Could not delete organization.',
        variant: 'destructive',
      });
    } finally {
      setDeleteModalOpen(false);
      setOrgToDelete(null);
      setPermanentDelete(false);
    }
  };

  // ==========================================
  // Helper: Plan badge color
  // ==========================================
  const planBadgeVariant = (plan) => {
    if (plan === 'ENTERPRISE') return 'primary';
    if (plan === 'GROWTH') return 'warning';
    return 'secondary';
  };

  return (
    <div className="space-y-6">

      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Organizations</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Create and manage multi-tenant organization workspaces.
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="self-start sm:self-auto shrink-0">
          <Plus className="h-4.5 w-4.5 mr-2" /> Create Organization
        </Button>
      </div>

      {/* 2. Controls & Search */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name or code..."
            className="w-full pl-10 pr-4 py-2 bg-muted/20 border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'ACTIVE', 'SUSPENDED', 'TRIAL_EXPIRED'].map((status) => (
            <button
              key={status}
              onClick={() => { setFilterStatus(status); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-orange-500/10 text-orange-500 border-orange-500/20 shadow-sm'
                  : 'border-border bg-card/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {status === 'TRIAL_EXPIRED' ? 'EXPIRED' : status}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Table Listing */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-lg overflow-hidden soft-shadow">
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrgs.length > 0 ? (
                paginatedOrgs.map((org) => (
                  <TableRow key={org._id}>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold shrink-0">
                          <Building className="h-4 w-4" />
                        </div>
                        <span className="font-bold text-foreground">{org.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-orange-500">{org.code}</TableCell>
                    <TableCell>
                      <Badge variant={planBadgeVariant(org.subscriptionPlan)} className="text-[9px] font-extrabold">
                        {org.subscriptionPlan}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          org.status === 'ACTIVE'
                            ? 'success'
                            : org.status === 'SUSPENDED'
                            ? 'destructive'
                            : 'warning'
                        }
                      >
                        {org.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">
                      {org.createdAt ? new Date(org.createdAt).toLocaleDateString() : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleShowCode(org)}
                          className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          title="View Organization Code"
                        >
                          <Key className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleToggleSuspend(org)}
                          className={`p-1.5 rounded-md hover:bg-muted/50 transition-colors cursor-pointer ${
                            org.status === 'ACTIVE'
                              ? 'text-rose-500 hover:text-rose-600'
                              : 'text-emerald-500 hover:text-emerald-600'
                          }`}
                          title={org.status === 'ACTIVE' ? 'Suspend' : 'Restore'}
                        >
                          {org.status === 'ACTIVE' ? <UserMinus className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => openDeleteModal(org)}
                          className="p-1.5 rounded-md hover:bg-muted/50 text-rose-500 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Delete Organization"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-8 text-muted-foreground">
                    {orgs.length === 0
                      ? 'No organizations found. Create your first workspace above.'
                      : 'No matching organizations found.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

        {/* 4. Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-border flex items-center justify-between text-xs font-semibold select-none bg-muted/10">
            <span className="text-muted-foreground">
              Page <span className="text-foreground">{currentPage}</span> of {totalPages}
              <span className="ml-3 text-muted-foreground/70">({filteredOrgs.length} total)</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded border border-border bg-card/60 hover:bg-muted/50 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded border border-border bg-card/60 hover:bg-muted/50 disabled:opacity-40 transition-all cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 5. Create Organization Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create Organization"
        description="Set up a new tenant workspace. An access code will be generated automatically."
      >
        <form onSubmit={handleCreateOrg} className="space-y-4">
          <Input
            type="text"
            label="Organization Name"
            placeholder="e.g. Acme Corp"
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
            required
          />
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/85 uppercase tracking-wide">Subscription Plan</label>
            <select
              value={newOrgPlan}
              onChange={(e) => setNewOrgPlan(e.target.value)}
              className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
            >
              <option value="FREE_TRIAL" className="bg-card">Free Trial (10 users, 5 GB)</option>
              <option value="GROWTH" className="bg-card">Growth (50 users, 50 GB)</option>
              <option value="ENTERPRISE" className="bg-card">Enterprise (Unlimited)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button type="button" onClick={() => setCreateModalOpen(false)} variant="outline">Cancel</Button>
            <Button type="submit" loading={createLoading}>Create Organization</Button>
          </div>
        </form>
      </Modal>

      {/* 6. Organization Code Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Organization Access Code"
        description={`Share this code with members who need to join "${selectedOrgForCode?.name}".`}
      >
        <div className="space-y-5 text-center p-2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Members enter this code during registration to join the organization workspace.
          </p>
          <div className="py-4 px-6 border border-dashed border-orange-500/30 bg-orange-500/5 rounded-lg text-2xl font-extrabold tracking-widest font-mono text-orange-500 select-all cursor-pointer">
            {generatedCode}
          </div>
          <Button onClick={() => setInviteModalOpen(false)} className="w-full">
            Done
          </Button>
        </div>
      </Modal>

      {/* 7. Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Organization"
        description={`Remove the workspace "${orgToDelete?.name}" and all associated data.`}
      >
        <div className="space-y-4 text-sm">
          <p className="text-xs text-muted-foreground">
            This will remove the organization. Check the box below for irreversible permanent deletion.
          </p>
          <div className="flex items-center gap-2">
            <input id="permanentDelete" type="checkbox" checked={permanentDelete} onChange={(e) => setPermanentDelete(e.target.checked)} className="w-4 h-4" />
            <label htmlFor="permanentDelete" className="text-xs font-semibold">Permanently delete (irreversible)</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Yes, Delete</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Organizations;
