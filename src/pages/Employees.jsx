import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Upload, FileText, UserPlus, Shield, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/Table.jsx';
import Modal from '../components/ui/Modal.jsx';
import { useToast } from '../components/ui/Toast.jsx';

const Employees = () => {
  const { toast } = useToast();

  // Employee Directory States
  const [employees, setEmployees] = useState([
    { id: '1', name: 'John Connor', email: 'john@umbrella.so', dept: 'Engineering', role: 'ADMIN', skills: ['React', 'Security', 'Rust'] },
    { id: '2', name: 'Sarah Connor', email: 'sarah@umbrella.so', dept: 'Operations', role: 'MANAGER', skills: ['Risk Analysis', 'Planning'] },
    { id: '3', name: 'Kyle Reese', email: 'kyle@umbrella.so', dept: 'Security', role: 'MEMBER', skills: ['Node.js', 'Cryptography'] },
    { id: '4', name: 'Ellen Ripley', email: 'ripley@umbrella.so', dept: 'Logistics', role: 'MANAGER', skills: ['Strategy', 'Automation'] },
  ]);

  // UI Control States
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [csvPanelOpen, setCsvPanelOpen] = useState(false);

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('Engineering');
  const [selectedRole, setSelectedRole] = useState('MEMBER');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);

  // CSV Drag state
  const [dragActive, setDragActive] = useState(false);

  // Filter Logic
  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.dept.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (tag) => {
    setSkills(skills.filter((s) => s !== tag));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast({ title: 'Validation Error', description: 'Name and email fields are required.', variant: 'warning' });
      return;
    }

    const newEmp = {
      id: (employees.length + 1).toString(),
      name,
      email,
      dept,
      role: selectedRole,
      skills: skills.length > 0 ? skills : ['Generalist'],
    };

    setEmployees([...employees, newEmp]);
    setAddModalOpen(false);
    // Reset Form
    setName('');
    setEmail('');
    setSkills([]);
    toast({ title: 'Employee Registered', description: `Successfully added ${name} to your organization partition.`, variant: 'success' });
  };

  // CSV Drag and Drop simulations
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Simulate parsing CSV files
    toast({
      title: 'CSV File Parsed',
      description: 'Successfully parsed and imported 12 employee records from directory file.',
      variant: 'success',
    });
    setCsvPanelOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Employee Directory</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Administer organization members, skill tags allocations, and RBAC privilege maps.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Button onClick={() => setCsvPanelOpen(true)} variant="outline">
            <Upload className="h-4.5 w-4.5 mr-2" /> CSV Import
          </Button>
          <Button onClick={() => setAddModalOpen(true)}>
            <UserPlus className="h-4.5 w-4.5 mr-2" /> Add Employee
          </Button>
        </div>
      </div>

      {/* 2. Controls & Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          placeholder="Search directory by name, email, or department..."
          className="w-full pl-10 pr-4 py-2 bg-muted/20 border border-border rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />
      </div>

      {/* 3. Directory Table */}
      <div className="bg-card/40 backdrop-blur-md border border-border rounded-lg overflow-hidden soft-shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Profile</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>RBAC Shield</TableHead>
              <TableHead>Skills Matrix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length > 0 ? (
              paginated.map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell>
                    <div className="flex items-start flex-col">
                      <span className="font-bold text-foreground">{emp.name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono mt-0.5">{emp.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-foreground/80">{emp.dept}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20 w-fit">
                      <Shield className="h-3.5 w-3.5" />
                      {emp.role}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {emp.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-[9px] px-1.5 py-0">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center p-8 text-muted-foreground">
                  No organization members match your directory search filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* 4. Pagination */}
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

      {/* 5. Add Employee Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Register Employee Member"
        description="Configure organization details and security access roles for new workspace members."
      >
        <form onSubmit={handleAddEmployee} className="space-y-4">
          <Input
            type="text"
            label="Full Name"
            placeholder="e.g. John Connor"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            label="Email Address"
            placeholder="e.g. john@umbrella.so"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground/85 uppercase tracking-wide">Department Allocation</label>
              <select
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
              >
                <option value="Engineering" className="bg-card">Engineering</option>
                <option value="Operations" className="bg-card">Operations</option>
                <option value="Security" className="bg-card">Security</option>
                <option value="Logistics" className="bg-card">Logistics</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground/85 uppercase tracking-wide">RBAC Access Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
              >
                <option value="ADMIN" className="bg-card">Administrator</option>
                <option value="MANAGER" className="bg-card">Department Manager</option>
                <option value="MEMBER" className="bg-card">Workspace Member</option>
              </select>
            </div>
          </div>

          {/* Dynamic Skill Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground/85 uppercase tracking-wide">Skill Tags Matrix</label>
            <input
              type="text"
              placeholder="Press Enter to tag skills (e.g. Docker)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleAddSkill}
              className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-foreground"
            />
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1.5">
                {skills.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                    <button type="button" onClick={() => handleRemoveSkill(tag)} className="cursor-pointer">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button onClick={() => setAddModalOpen(false)} variant="outline">Cancel</Button>
            <Button type="submit">Register Member</Button>
          </div>
        </form>
      </Modal>

      {/* 6. CSV Import Modal */}
      <Modal
        isOpen={csvPanelOpen}
        onClose={() => setCsvPanelOpen(false)}
        title="CSV Employee Directory Import"
        description="Import user rosters from files containing columns for Name, Email, Department, and Skills."
      >
        <div className="space-y-4">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`py-8 px-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all duration-200 ${
              dragActive ? 'border-orange-500 bg-orange-500/5' : 'border-border bg-muted/10 hover:bg-muted/20'
            }`}
          >
            <Upload className="h-8 w-8 text-orange-500 mx-auto mb-2 animate-bounce" />
            <p className="text-xs font-bold text-foreground">Drag and drop your spreadsheet file here</p>
            <p className="text-[10px] text-muted-foreground mt-1">Supports XLS, CSV files up to 10MB</p>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button onClick={() => setCsvPanelOpen(false)} variant="outline">Cancel</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};

export default Employees;
