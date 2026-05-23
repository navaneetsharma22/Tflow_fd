import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card.jsx';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import Modal from '../components/ui/Modal.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import { Building, Plus, Users, Landmark, Target } from 'lucide-react';

const Departments = () => {
  const { toast } = useToast();

  const [depts, setDepts] = useState([
    { id: '1', name: 'Engineering', manager: 'John Connor', budget: '$45,000 / $100k', users: 18, projects: 4 },
    { id: '2', name: 'Operations', manager: 'Sarah Connor', budget: '$12,500 / $30k', users: 8, projects: 2 },
    { id: '3', name: 'Security & Integrity', manager: 'Kyle Reese', budget: '$18,000 / $40k', users: 3, projects: 1 },
    { id: '4', name: 'Logistics', manager: 'Ellen Ripley', budget: '$8,400 / $15k', users: 6, projects: 1 },
  ]);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [manager, setManager] = useState('');
  const [budget, setBudget] = useState('20000');

  const handleCreateDept = (e) => {
    e.preventDefault();
    if (!name || !manager) {
      toast({ title: 'Validation Error', description: 'Name and manager fields are required.', variant: 'warning' });
      return;
    }

    const newDept = {
      id: (depts.length + 1).toString(),
      name,
      manager,
      budget: `$0 / $${parseInt(budget).toLocaleString()}`,
      users: 1,
      projects: 0,
    };

    setDepts([...depts, newDept]);
    setAddModalOpen(false);
    setName('');
    setManager('');
    toast({ title: 'Department Created', description: `Successfully established "${name}" department partition.`, variant: 'success' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Departments Directory</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Administer department workspaces, budget parameters, and headcount distributions.
          </p>
        </div>
        <Button onClick={() => setAddModalOpen(true)} className="self-start sm:self-auto shrink-0">
          <Plus className="h-4.5 w-4.5 mr-2" /> Establish Department
        </Button>
      </div>

      {/* Grid of Compact Premium Department Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {depts.map((d) => (
          <Card key={d.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/40 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-8.5 w-8.5 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                  <Building className="h-4.5 w-4.5" />
                </div>
                <CardTitle>{d.name}</CardTitle>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground">Manager: {d.manager}</span>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 border border-border bg-muted/10 rounded-lg">
                  <Users className="h-4 w-4 text-orange-500 mx-auto mb-1" />
                  <span className="text-xs font-bold block">{d.users} Members</span>
                  <span className="text-[9px] text-muted-foreground block">Headcount</span>
                </div>
                <div className="p-2.5 border border-border bg-muted/10 rounded-lg">
                  <Target className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                  <span className="text-xs font-bold block">{d.projects} Active</span>
                  <span className="text-[9px] text-muted-foreground block">Projects</span>
                </div>
                <div className="p-2.5 border border-border bg-muted/10 rounded-lg">
                  <Landmark className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                  <span className="text-xs font-bold block truncate">{d.budget.split(' / ')[0]}</span>
                  <span className="text-[9px] text-muted-foreground block">Spent Allocation</span>
                </div>
              </div>

              {/* Progress bar tracking budget usage */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
                  <span>Budget Allocation</span>
                  <span>{d.budget}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '45%' }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Establish Department Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Establish Department Workspace"
        description="Allocate resource boundaries, operational budgets, and appoint leaders."
      >
        <form onSubmit={handleCreateDept} className="space-y-4">
          <Input
            type="text"
            label="Department Name"
            placeholder="e.g. Quality Assurance"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="text"
            label="Appointed Manager"
            placeholder="e.g. John Connor"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
            required
          />
          <Input
            type="number"
            label="Yearly Operational Budget Allocation ($)"
            placeholder="e.g. 50000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button onClick={() => setAddModalOpen(false)} variant="outline">Cancel</Button>
            <Button type="submit">Establish Department</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default Departments;
