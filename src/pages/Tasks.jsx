import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import {
  Clock,
  MessageSquare,
  Paperclip,
  CheckSquare,
  ListTodo,
  TrendingUp,
  Plus,
  Trash2,
  CornerDownRight,
  Sparkles,
  Download,
  AlertTriangle,
  FolderOpen
} from 'lucide-react';

const Tasks = () => {
  const { toast } = useToast();

  // 1. Task State containing subtasks, comments, attachments, activity
  const [tasks, setTasks] = useState([
    {
      id: 'task-1',
      title: 'Setup auth encryption bounds whitelisting',
      desc: 'Harden entry routes against tenant boundary leaks using specialized cryptographic hooks.',
      priority: 'CRITICAL',
      status: 'IN_PROGRESS',
      due: '24 hrs',
      subtasks: [
        { id: 'sub-1', title: 'Harden Express.js whitelist parser middleware', done: true },
        { id: 'sub-2', title: 'Write integration checks for circular cycle paths', done: false },
        { id: 'sub-3', title: 'Execute secure token session revocation audit', done: false },
      ],
      comments: [
        { id: 'c-1', author: 'Sarah Connor', text: 'Confirming whitelisting middleware runs in O(1) bounds.', time: '2 hrs ago' },
        { id: 'c-2', author: 'John Connor', text: '@Sarah Connor session revocation token scopes validated.', time: '1 hr ago' },
      ],
      attachments: [
        { id: 'f-1', name: 'auth_protocol_spec.pdf', size: '1.4 MB' },
        { id: 'f-2', name: 'whitelist_bounds.json', size: '12 KB' },
      ],
      activity: [
        { text: 'Sarah Connor updated status to IN_PROGRESS', time: '2 hrs ago' },
        { text: 'John Connor attached whitelist_bounds.json', time: '1 hr ago' },
      ],
    },
    {
      id: 'task-2',
      title: 'Implement DFS task validations check',
      desc: 'Implement fast cycles check loops inside BullMQ workflow dispatchers to prevent deadlock runs.',
      priority: 'HIGH',
      status: 'TODO',
      due: '48 hrs',
      subtasks: [
        { id: 'sub-4', title: 'Verify graph dependency loops bounds', done: false },
      ],
      comments: [],
      attachments: [],
      activity: [
        { text: 'System created task', time: '1 day ago' },
      ],
    },
    {
      id: 'task-3',
      title: 'Optimize cursor memory buffers',
      desc: 'Harden buffer array segments for large payload file parsing.',
      priority: 'MEDIUM',
      status: 'DONE',
      due: 'Completed',
      subtasks: [
        { id: 'sub-5', title: 'Clean legacy array allocation loops', done: true },
      ],
      comments: [
        { id: 'c-3', author: 'Kyle Reese', text: 'Memory buffer allocation stable.', time: '1 day ago' },
      ],
      attachments: [],
      activity: [
        { text: 'Kyle Reese resolved task', time: '1 day ago' },
      ],
    },
  ]);

  // Selected task state for the collaboration side panel
  const [selectedTaskId, setSelectedTaskId] = useState('task-1');
  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];

  // Comment input state
  const [newComment, setNewComment] = useState('');
  // Mentions autocomplete simulation
  const [mentionListOpen, setMentionListOpen] = useState(false);

  // New subtask input state
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  // Handle status update
  const handleUpdateStatus = (status) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === selectedTask.id) {
          const act = { text: `Status updated to ${status}`, time: 'Just now' };
          return {
            ...t,
            status,
            activity: [act, ...t.activity],
          };
        }
        return t;
      })
    );
    toast({
      title: 'Task Status Updated',
      description: `Transitioned task status to ${status}.`,
      variant: 'success',
    });
  };

  // Toggle subtask done
  const handleToggleSubtask = (subId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === selectedTask.id) {
          const updatedSubtasks = t.subtasks.map((s) => {
            if (s.id === subId) return { ...s, done: !s.done };
            return s;
          });
          return { ...t, subtasks: updatedSubtasks };
        }
        return t;
      })
    );
  };

  // Add subtask
  const handleAddSubtask = (e) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === selectedTask.id) {
          const newSub = { id: `sub-${Date.now()}`, title: newSubtaskTitle, done: false };
          return { ...t, subtasks: [...t.subtasks, newSub] };
        }
        return t;
      })
    );
    setNewSubtaskTitle('');
    toast({
      title: 'Subtask Appended',
      description: 'Successfully registered subtask checkbox bounds.',
      variant: 'success',
    });
  };

  // Add Comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === selectedTask.id) {
          const newComm = { id: `c-${Date.now()}`, author: 'John Connor (You)', text: newComment, time: 'Just now' };
          const act = { text: 'You added a comment', time: 'Just now' };
          return {
            ...t,
            comments: [...t.comments, newComm],
            activity: [act, ...t.activity],
          };
        }
        return t;
      })
    );
    setNewComment('');
    setMentionListOpen(false);
    toast({
      title: 'Comment Dispatched',
      description: 'Comment saved to task discussion threads.',
      variant: 'success',
    });
  };

  // Add mention trigger on keypress
  const handleCommentChange = (e) => {
    const val = e.target.value;
    setNewComment(val);
    if (val.endsWith('@')) {
      setMentionListOpen(true);
    } else if (!val.includes('@')) {
      setMentionListOpen(false);
    }
  };

  const insertMention = (name) => {
    setNewComment((prev) => prev + name + ' ');
    setMentionListOpen(false);
  };

  // File download mock trigger
  const handleDownload = (fileName) => {
    toast({
      title: 'File Download Initiated',
      description: `Successfully started download for file: "${fileName}".`,
      variant: 'success',
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Active Task Board</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Sprint tasks board detailing subtasks, file attachments, and active team comments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Tasks List Board */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['TODO', 'IN_PROGRESS', 'DONE'].map((col) => {
              const colTasks = tasks.filter((t) => t.status === col);
              return (
                <div key={col} className="p-4 rounded-2xl bg-card/30 border border-border/80 flex flex-col min-h-[380px] space-y-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-xs font-bold text-foreground/80 tracking-wider">
                      {col === 'TODO' ? 'To Do' : col === 'IN_PROGRESS' ? 'In Progress' : 'Done'}
                    </span>
                    <Badge variant={col === 'DONE' ? 'success' : col === 'IN_PROGRESS' ? 'warning' : 'secondary'}>
                      {colTasks.length}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-3.5 overflow-y-auto pr-0.5">
                    {colTasks.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTaskId(t.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 relative group ${
                          selectedTaskId === t.id
                            ? 'border-orange-500 bg-orange-500/5'
                            : 'border-border bg-card hover:border-orange-500/30'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <Badge variant={t.priority === 'CRITICAL' ? 'destructive' : t.priority === 'HIGH' ? 'warning' : 'secondary'}>
                            {t.priority}
                          </Badge>
                          <span className="text-[10px] font-mono text-muted-foreground">{t.due}</span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-bold text-foreground leading-snug">{t.title}</p>
                          <p className="text-[10px] text-muted-foreground leading-relaxed truncate">{t.desc}</p>
                        </div>

                        {/* Progress counter for subtasks */}
                        {t.subtasks?.length > 0 && (
                          <div className="flex items-center justify-between text-[9px] font-bold text-muted-foreground">
                            <span>Subtasks</span>
                            <span>
                              {t.subtasks.filter((s) => s.done).length} / {t.subtasks.length}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}

                    {colTasks.length === 0 && (
                      <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
                        No tasks in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Task Detail Panel & Collaboration Drawer */}
        <Card className="h-fit">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <CardTitle className="text-sm font-bold">{selectedTask.title}</CardTitle>
                <CardDescription className="text-[10px] mt-1">{selectedTask.desc}</CardDescription>
              </div>
              <Badge variant={selectedTask.priority === 'CRITICAL' ? 'destructive' : 'warning'}>
                {selectedTask.priority}
              </Badge>
            </div>
            
            {/* Status updates selector */}
            <div className="pt-3 flex items-center gap-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase">Status:</span>
              <div className="flex gap-1.5">
                {['TODO', 'IN_PROGRESS', 'DONE'].map((st) => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                      selectedTask.status === st
                        ? 'bg-orange-500 text-white'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                    }`}
                  >
                    {st === 'TODO' ? 'To Do' : st === 'IN_PROGRESS' ? 'In Progress' : 'Done'}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-5 pt-4">
            
            {/* Subtasks checklists */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Subtasks Checklists</span>
              
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {selectedTask.subtasks.map((sub) => (
                  <div key={sub.id} className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={sub.done}
                      onChange={() => handleToggleSubtask(sub.id)}
                      className="rounded border-border text-orange-500 focus:ring-orange-500 cursor-pointer"
                    />
                    <span className={sub.done ? 'line-through text-muted-foreground' : 'text-foreground'}>
                      {sub.title}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleAddSubtask} className="flex gap-2 pt-1.5">
                <input
                  type="text"
                  placeholder="New subtask checklist..."
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  className="flex-1 bg-muted/30 border border-border rounded px-2.5 py-1 text-xs focus:outline-none focus:border-orange-500/40"
                />
                <button
                  type="submit"
                  className="p-1 rounded bg-orange-500 hover:bg-orange-600 text-white transition-colors cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Attached Files Drawer */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Attached files</span>
              <div className="space-y-1.5">
                {selectedTask.attachments.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2 rounded bg-muted/20 border border-border text-xs">
                    <div className="flex items-center gap-2">
                      <Paperclip className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                      <span className="truncate max-w-[150px] font-semibold">{file.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono text-[9px] text-muted-foreground">{file.size}</span>
                      <button
                        onClick={() => handleDownload(file.name)}
                        className="p-0.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {selectedTask.attachments.length === 0 && (
                  <p className="text-[10px] text-muted-foreground">No attachments uploaded yet.</p>
                )}
              </div>
            </div>

            {/* Team comments thread */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Discussions Thread</span>
              
              <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
                {selectedTask.comments.map((comm) => (
                  <div key={comm.id} className="text-xs space-y-1 bg-muted/10 p-2.5 rounded-lg border border-border">
                    <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground">
                      <span>{comm.author}</span>
                      <span>{comm.time}</span>
                    </div>
                    <p className="text-foreground leading-relaxed">{comm.text}</p>
                  </div>
                ))}

                {selectedTask.comments.length === 0 && (
                  <p className="text-[10px] text-muted-foreground">No comments dispatched yet.</p>
                )}
              </div>

              {/* Comment text box with mentions support */}
              <form onSubmit={handleAddComment} className="space-y-2 relative pt-2 border-t border-border/50">
                <div className="relative">
                  <textarea
                    placeholder="Add comment... Use @ to mention staff"
                    value={newComment}
                    onChange={handleCommentChange}
                    className="w-full bg-muted/30 border border-border rounded p-2 text-xs focus:outline-none focus:border-orange-500/40 resize-none h-16"
                  />
                  
                  {/* Mention drop menu */}
                  {mentionListOpen && (
                    <div className="absolute left-0 bottom-18 bg-card border border-border rounded-lg shadow-lg w-48 z-50 p-1 text-xs space-y-1">
                      <p className="text-[9px] font-bold text-muted-foreground p-1 uppercase">Mention Team</p>
                      {['Sarah Connor', 'John Connor', 'Ellen Ripley', 'Kyle Reese'].map((name) => (
                        <div
                          key={name}
                          onClick={() => insertMention(name)}
                          className="p-1.5 hover:bg-orange-500/10 hover:text-orange-500 rounded cursor-pointer transition-colors"
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-muted-foreground font-semibold">Press Submit to dispatch</span>
                  <Button type="submit" size="xs">Send Comment</Button>
                </div>
              </form>
            </div>

            {/* Task Activity Logs */}
            <div className="space-y-2.5 pt-2 border-t border-border/50">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Activity Logs</span>
              <div className="space-y-1.5 text-[10px] text-muted-foreground max-h-24 overflow-y-auto">
                {selectedTask.activity.map((act, idx) => (
                  <div key={idx} className="flex justify-between gap-4 py-0.5">
                    <span>{act.text}</span>
                    <span className="font-mono">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

      </div>

    </div>
  );
};

export default Tasks;
