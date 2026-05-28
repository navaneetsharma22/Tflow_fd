import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import {
  BookOpen,
  Edit2,
  Save,
  Clock,
  Search,
  Plus,
  History,
  CornerDownRight,
  Sparkles,
  GitPullRequest
} from 'lucide-react';

const Wiki = () => {
  const { toast } = useToast();

  // Active articles database
  const [articles, setArticles] = useState([
    {
      id: 'art-1',
      title: 'Multi-tenant Architecture Bounds',
      category: 'Architecture',
      desc: 'Documentation mapping database isolation bounds and multi-tenant security layers.',
      content: 'All incoming tenant transactions are routed through standard Express.js middleware checkpoints. These checkpoints verify the presence and checksum validation of the X-Organization-Id header bounds inside the transaction payload arrays to ensure absolute partition integrity.',
      history: [
        { version: 'v2.0', author: 'John Connor', change: 'Updated Whitelist security boundaries', time: '2 hrs ago' },
        { version: 'v1.0', author: 'Sarah Connor', change: 'Initial article structure provisioned', time: '1 day ago' },
      ],
    },
    {
      id: 'art-2',
      title: 'DFS Graph Cycles check optimization',
      category: 'Algorithms',
      desc: 'Guidelines for circular cycle check algorithms O(1) execution loops.',
      content: 'To prevent infinite loops inside worker loops, the graph compiler traverses active nodes checking for cycles. Active DFS traversal lists ensure O(V+E) time bounds checks without memory leaks.',
      history: [
        { version: 'v1.0', author: 'Kyle Reese', change: 'Established base cycle traversal algorithm spec', time: '2 days ago' },
      ],
    },
    {
      id: 'art-3',
      title: 'Weekly budget allocations guidelines',
      category: 'Operations',
      desc: 'Guidelines for modifying logistics and engineering budget parameters.',
      content: 'Budgets are scoped yearly but modified on active sprints cycles. All modifications require admin authentication triggers.',
      history: [
        { version: 'v1.1', author: 'Ellen Ripley', change: 'Updated logistics allocation boundaries', time: '5 hrs ago' },
      ],
    },
  ]);

  const [selectedArtId, setSelectedArtId] = useState('art-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const selectedArt = articles.find((a) => a.id === selectedArtId) || articles[0];

  // Article edit fields state
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const handleStartEdit = () => {
    setEditTitle(selectedArt.title);
    setEditContent(selectedArt.content);
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editContent.trim()) return;

    setArticles((prev) =>
      prev.map((a) => {
        if (a.id === selectedArt.id) {
          const newHistory = {
            version: `v${(parseFloat(a.history[0].version.replace('v', '')) + 0.1).toFixed(1)}`,
            author: 'John Connor (You)',
            change: 'Content refined inside editor',
            time: 'Just now',
          };
          return {
            ...a,
            title: editTitle,
            content: editContent,
            history: [newHistory, ...a.history],
          };
        }
        return a;
      })
    );
    setIsEditing(false);
    toast({
      title: 'Knowledge Base Updated',
      description: `Successfully published revisions to "${editTitle}".`,
      variant: 'success',
    });
  };

  // Live filter search
  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Organization Knowledge Base</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Audit project specifications, system architectures, and security bounds guidelines.
          </p>
        </div>
        <Button className="shrink-0 self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-2" /> Write Article
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Knowledge Pages directory */}
        <div className="space-y-4">
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold">Knowledge Directory</CardTitle>
              <CardDescription className="text-[10px]">Select an article to view details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Search box */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search wiki..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-muted/40 border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-orange-500/40 placeholder:text-muted-foreground/40"
                />
              </div>

              <div className="space-y-2">
                {filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      setSelectedArtId(art.id);
                      setIsEditing(false);
                    }}
                    className={`p-3 rounded-lg border transition-all cursor-pointer space-y-1.5 ${
                      selectedArtId === art.id
                        ? 'border-orange-500 bg-orange-500/5'
                        : 'border-border bg-muted/10 hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-xs font-bold truncate max-w-[150px]">{art.title}</span>
                      <Badge variant="secondary">{art.category}</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-normal line-clamp-2">{art.desc}</p>
                  </div>
                ))}

                {filteredArticles.length === 0 && (
                  <div className="text-center text-xs text-muted-foreground p-8">
                    No articles matched search term
                  </div>
                )}
              </div>

            </CardContent>
          </Card>

        </div>

        {/* Right 2 Columns: Viewer & Editor */}
        <div className="lg:col-span-2 space-y-6">
          
          {isEditing ? (
            /* Editing panel */
            <Card className="animate-fadeIn">
              <CardHeader>
                <CardTitle className="text-base font-bold">Edit Wiki Article</CardTitle>
                <CardDescription>Publish changes to the organization knowledge graph</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveEdit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Article Title</label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full bg-muted/30 border border-border rounded px-3 py-2 text-xs focus:outline-none focus:border-orange-500/40 font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase">Article Body Content</label>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full bg-muted/30 border border-border rounded p-3 text-xs focus:outline-none focus:border-orange-500/40 resize-none h-64 font-sans leading-relaxed"
                    />
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel Edit
                    </Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" /> Publish Revisions
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Viewing panel */
            <div className="space-y-6">
              
              <Card className="relative overflow-hidden group">
                <div className="absolute -right-16 -top-16 w-32 h-32 bg-gradient-to-tr from-orange-500 to-amber-500 opacity-5 group-hover:opacity-10 blur-2xl rounded-full transition-opacity duration-300" />
                
                <CardHeader className="border-b border-border pb-4 flex flex-row items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="h-4.5 w-4.5 text-orange-500 shrink-0" />
                      <CardTitle className="text-base font-bold">{selectedArt.title}</CardTitle>
                    </div>
                    <CardDescription>{selectedArt.desc}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="outline">{selectedArt.category}</Badge>
                    <button
                      onClick={handleStartEdit}
                      className="p-1.5 rounded border border-border hover:border-orange-500/30 bg-muted/40 hover:bg-orange-500/5 text-muted-foreground hover:text-orange-500 transition-colors cursor-pointer"
                      title="Edit Wiki"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-5 text-xs text-foreground/80 leading-relaxed font-sans min-h-[180px]">
                  <p className="whitespace-pre-line">{selectedArt.content}</p>
                </CardContent>
              </Card>

              {/* Version History stream */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-orange-500" />
                    <CardTitle className="text-sm font-bold">Article Revision Log</CardTitle>
                  </div>
                  <CardDescription className="text-[10px]">Track historical version changes for this wiki page</CardDescription>
                </CardHeader>
                <CardContent className="divide-y divide-border/50">
                  {selectedArt.history.map((hist, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] font-bold text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20">
                          {hist.version}
                        </span>
                        <div>
                          <span className="font-bold text-foreground block">{hist.change}</span>
                          <p className="text-[9px] text-muted-foreground mt-0.5">Author: {hist.author}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[9px] text-muted-foreground">{hist.time}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default Wiki;
