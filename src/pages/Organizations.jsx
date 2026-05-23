import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, ShieldAlert, Key, UserMinus, UserCheck, ChevronLeft, ChevronRight, X, Building, Check } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table.jsx';
import Modal from '../components/ui/Modal.jsx';
import { useToast } from '../components/ui/Toast.jsx';

const Organizations = () => {
  const { toast } = useToast();
  
  // Data States
  const [orgs, setOrgs] = useState([
    { id: '1', name: 'Acme SaaS Corp', slug: 'acme-corp', status: 'ACTIVE', users: 14, storage: '12.4 GB / 50 GB', code: 'TF-ACM-92' },
    { id: '2', name: 'Stark Industries', slug: 'stark-ind', status: 'ACTIVE', users: 48, storage: '44.8 GB / 100 GB', code: 'TF-STK-08' },
    { id: '3', name: 'Cyberdyne Systems', slug: 'cyberdyne', status: 'SUSPENDED', users: 3, storage: '1.2 GB / 10 GB', code: 'TF-CYB-66' },
    { id: '4', name: 'Umbrella Research', slug: 'umbrella', status: 'TRIAL', users: 8, storage: '4.5 GB / 20 GB', code: 'TF-UMB-19' },
    { id: '5', name: 'Wayne Enterprises', slug: 'wayne-ent', status: 'ACTIVE', users: 32, storage: '28.1 GB / 80 GB', code: 'TF-WYN-77' },
  ]);

  // UI Control States
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  
  // Create Form States
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgSlug, setNewOrgSlug] = useState('');
  const [newOrgLimit, setNewOrgLimit] = useState('50');

  // Generated Code State
  const [generatedCode, setGeneratedCode] = useState('');
  const [selectedOrgForCode, setSelectedOrgForCode] = useState(null);

  // Pagination Logic
  const itemsPerPage = 5;
  const filteredOrgs = orgs.filter((org) => {
    const matchesSearch = org.name.toLowerCase().includes(search.toLowerCase()) || org.slug.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || org.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredOrgs.length / itemsPerPage);
  const paginatedOrgs = filteredOrgs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handlers
  const handleCreateOrg = (e) => {
    e.preventDefault();
    if (!newOrgName || !newOrgSlug) {
      toast({ title: 'Validation Error', description: 'Name and slug fields are required.', variant: 'warning' });
      return;
    }

    const newOrg = {
      id: (orgs.length + 1).toString(),
      name: newOrgName,
      slug: newOrgSlug,
      status: 'ACTIVE',
      users: 1,
      storage: `0 GB / ${newOrgLimit} GB`,
      code: `TF-${newOrgSlug.slice(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}`,
    };

    setOrgs([...orgs, newOrg]);
    setCreateModalOpen(false);
    setNewOrgName('');
    setNewOrgSlug('');
    toast({ title: 'Workspace Established', description: `Tenant partition "${newOrgName}" successfully created!`, variant: 'success' });
  };

  const handleGenerateCode = (org) => {
    setSelectedOrgForCode(org);
    const newCode = `TF-${org.slug.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedCode(newCode);
    setInviteModalOpen(true);
  };

  const handleToggleSuspend = (id) => {
    setOrgs((prev) =>
      prev.map((o) => {
        if (o.id === id) {
          const wasActive = o.status === 'ACTIVE';
          const newStatus = wasActive ? 'SUSPENDED' : 'ACTIVE';
          toast({
            title: wasActive ? 'Tenant Suspended' : 'Tenant Restored',
            description: `Workspace partition "${o.name}" status set to ${newStatus}.`,
            variant: wasActive ? 'destructive' : 'success',
          });
          return { ...o, status: newStatus };
        }
        return o;
      })
    );
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Organizations Workspace</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Administer active multi-tenant organization partitions, allocations, and limits.
          </p>
        </div>
        <Button onClick={() => setCreateModalOpen(true)} className="self-start sm:self-auto shrink-0">
          <Plus className="h-4.5 w-4.5 mr-2" /> Establish Workspace
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
            placeholder="Search tenant name or path slug..."
            className="w-full pl-10 pr-4 py-2 bg-muted/20 border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {['ALL', 'ACTIVE', 'SUSPENDED', 'TRIAL'].map((status) => (
            <button
              key={status}
              onClick={() => { setFilterStatus(status); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase border transition-all cursor-pointer ${
                filterStatus === status
                  ? 'bg-orange-500/10 text-orange-500 border-orange-500/20 shadow-sm'
                  : 'border-border bg-card/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Table Listing */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-lg overflow-hidden soft-shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization Name</TableHead>
              <TableHead>Slug Prefix</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active Users</TableHead>
              <TableHead>Storage Usage</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrgs.length > 0 ? (
              paginatedOrgs.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 font-bold shrink-0">
                        <Building className="h-4 w-4" />
                      </div>
                      <span className="font-bold text-foreground">{org.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{org.slug}</TableCell>
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
                  <TableCell className="text-xs font-semibold">{org.users} Members</TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">{org.storage}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleGenerateCode(org)}
                        className="p-1.5 rounded-md hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title="Generate Invite Code"
                      >
                        <Key className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleToggleSuspend(org.id)}
                        className={`p-1.5 rounded-md hover:bg-muted/50 transition-colors cursor-pointer ${
                          org.status === 'ACTIVE'
                            ? 'text-rose-500 hover:text-rose-600'
                            : 'text-emerald-500 hover:text-emerald-600'
                        }`}
                        title={org.status === 'ACTIVE' ? 'Suspend Partition' : 'Restore Partition'}
                      >
                        {org.status === 'ACTIVE' ? <UserMinus className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-8 text-muted-foreground">
                  No matching organization partitions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 4. Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-border flex items-center justify-between text-xs font-semibold select-none bg-muted/10">
            <span className="text-muted-foreground">
              Page <span className="text-foreground">{currentPage}</span> of {totalPages}
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
        title="Establish Organization Partition"
        description="Configure dynamic allocation limits and access slugs for your new tenant partition."
      >
        <form onSubmit={handleCreateOrg} className="space-y-4">
          <Input
            type="text"
            label="Organization Title"
            placeholder="e.g. Wayland Cybernetics"
            value={newOrgName}
            onChange={(e) => {
              setNewOrgName(e.target.value);
              setNewOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
            }}
            required
          />
          <Input
            type="text"
            label="Path Slug Prefix (URL)"
            placeholder="e.g. wayland-cyber"
            value={newOrgSlug}
            onChange={(e) => setNewOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}
            required
          />
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/85 uppercase tracking-wide">Storage Limits Allocation</label>
            <select
              value={newOrgLimit}
              onChange={(e) => setNewOrgLimit(e.target.value)}
              className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
            >
              <option value="10" className="bg-card">10 GB Plan</option>
              <option value="50" className="bg-card">50 GB Plan</option>
              <option value="100" className="bg-card">100 GB Plan</option>
              <option value="500" className="bg-card">500 GB Custom Plan</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button onClick={() => setCreateModalOpen(false)} variant="outline">Cancel</Button>
            <Button type="submit">Establish Partition</Button>
          </div>
        </form>
      </Modal>

      {/* 6. generated invite code Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite Join Code Established"
        description={`Secure join code established for workspace "${selectedOrgForCode?.name}".`}
      >
        <div className="space-y-5 text-center p-2">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Distribute this secure token to invited workspace members. It is valid for single organization code links.
          </p>
          <div className="py-4 px-6 border border-dashed border-orange-500/30 bg-orange-500/5 rounded-lg text-2xl font-extrabold tracking-widest font-mono text-orange-500 select-all cursor-pointer">
            {generatedCode}
          </div>
          <Button onClick={() => setInviteModalOpen(false)} className="w-full">
            Done
          </Button>
        </div>
      </Modal>

    </div>
  );
};

export default Organizations;
