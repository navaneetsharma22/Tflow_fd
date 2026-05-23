import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { useToast } from '../components/ui/Toast.jsx';
import {
  MessageSquare,
  Send,
  Sparkles,
  Users,
  Search,
  Hash,
  MessageCircle,
  FileText,
  Clock,
  Circle
} from 'lucide-react';

const Chat = () => {
  const { toast } = useToast();

  // Rooms and direct message tabs
  const [activeChannelId, setActiveChannelId] = useState('chan-1');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Channels, Task channels, and Direct Messages arrays
  const channels = [
    { id: 'chan-1', name: 'general-sync', desc: 'General tenant wide updates and sprint standups', type: 'PROJECT' },
    { id: 'chan-2', name: 'engineering-core', desc: 'O(1) cycles check algorithms and compiler telemetry', type: 'PROJECT' },
    { id: 'chan-3', name: 'task-pr-42-security', desc: 'Code review discussion for PR #42 Whitelist gates', type: 'TASK' },
    { id: 'chan-4', name: 'Sarah Connor', desc: 'Operations Lead', type: 'DM', online: true },
    { id: 'chan-5', name: 'Kyle Reese', desc: 'Security Lead', type: 'DM', online: false },
    { id: 'chan-6', name: 'Ellen Ripley', desc: 'Logistics Lead', type: 'DM', online: true },
  ];

  // Active chat streams matching the channels
  const [chatMessages, setChatMessages] = useState({
    'chan-1': [
      { id: 'm-1', sender: 'Sarah Connor', text: 'Hey team, does anyone have an update on the circular cycle check optimization?', time: '2 hrs ago', self: false },
      { id: 'm-2', sender: 'You', text: 'Yes! It is running asynchronously in-memory now! Memory footprints dropped to zero.', time: '1 hr ago', self: true },
    ],
    'chan-2': [
      { id: 'm-3', sender: 'Kyle Reese', text: 'Are we utilizing BullMQ background jobs for the DFS graph Cycles check?', time: '3 hrs ago', self: false },
      { id: 'm-4', sender: 'You', text: 'Yes, memory consumption checked and bounds whitelisting is complete.', time: '2 hrs ago', self: true },
    ],
    'chan-3': [
      { id: 'm-5', sender: 'Sarah Connor', text: 'Kyle, did you verify the IP Whitelist verification bypass bug?', time: '4 hrs ago', self: false },
      { id: 'm-6', sender: 'Kyle Reese', text: 'Reviewing PR #42 whitelisting gates now.', time: '3 hrs ago', self: false },
    ],
    'chan-4': [
      { id: 'm-7', sender: 'Sarah Connor', text: 'Hi John, did we verify the final tenant isolation parameters?', time: '1 day ago', self: false },
    ],
    'chan-5': [
      { id: 'm-8', sender: 'Kyle Reese', text: 'System check complete. Sockets active.', time: '2 days ago', self: false },
    ],
    'chan-6': [
      { id: 'm-9', sender: 'Ellen Ripley', text: 'Let me know if you need assistance mapping the logistics departments budgets.', time: '5 hrs ago', self: false },
    ],
  });

  const activeChannel = channels.find((c) => c.id === activeChannelId) || channels[0];
  const activeMessages = chatMessages[activeChannel.id] || [];

  // Simulate team lead auto replies & typing indicators on message send
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      id: `m-${Date.now()}`,
      sender: 'You',
      text: inputText,
      time: 'Just now',
      self: true,
    };

    setChatMessages((prev) => ({
      ...prev,
      [activeChannel.id]: [...(prev[activeChannel.id] || []), userMsg],
    }));
    setInputText('');

    // Trigger typing simulation
    setTimeout(() => {
      setIsTyping(true);
    }, 1000);

    setTimeout(() => {
      setIsTyping(false);
      const replyMsg = {
        id: `m-${Date.now() + 1}`,
        sender: activeChannel.type === 'DM' ? activeChannel.name : 'Sarah Connor',
        text: `Understood! I will check this bounds configuration parameters.`,
        time: 'Just now',
        self: false,
      };

      setChatMessages((prev) => ({
        ...prev,
        [activeChannel.id]: [...(prev[activeChannel.id] || []), replyMsg],
      }));

      toast({
        title: 'New Message Received',
        description: `New message from ${replyMsg.sender} inside ${
          activeChannel.type === 'DM' ? 'Direct Messages' : '#' + activeChannel.name
        }.`,
        variant: 'success',
      });
    }, 3500);
  };

  return (
    <div className="h-[calc(100vh-10.5rem)] flex border border-border bg-card/20 backdrop-blur-md rounded-2xl overflow-hidden select-none shadow-lg">
      
      {/* 1. Chat Channels Sidebar */}
      <div className="w-64 border-r border-border bg-card/40 flex flex-col shrink-0">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <span className="font-extrabold text-sm tracking-tight text-foreground">Workspace Chat</span>
          <Badge variant="outline"><Users className="h-3.5 w-3.5 mr-1" /> Active</Badge>
        </div>

        {/* Channels Search block */}
        <div className="p-3 border-b border-border bg-muted/10 relative">
          <Search className="absolute left-6 top-5.5 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search channels..."
            className="w-full bg-muted/40 border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-orange-500/40"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {/* Project Channels */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider px-3 block">Project Chats</span>
            {channels
              .filter((c) => c.type === 'PROJECT')
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveChannelId(c.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    activeChannelId === c.id
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <Hash className="h-3.5 w-3.5" />
                  <span className="truncate">{c.name}</span>
                </div>
              ))}
          </div>

          {/* Task discussions */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider px-3 block">Task Discussions</span>
            {channels
              .filter((c) => c.type === 'TASK')
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveChannelId(c.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    activeChannelId === c.id
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span className="truncate">{c.name}</span>
                </div>
              ))}
          </div>

          {/* Direct Messages */}
          <div className="space-y-1">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider px-3 block">Direct Messages</span>
            {channels
              .filter((c) => c.type === 'DM')
              .map((c) => (
                <div
                  key={c.id}
                  onClick={() => setActiveChannelId(c.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                    activeChannelId === c.id
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Circle className={`h-2.5 w-2.5 fill-current shrink-0 ${c.online ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                    <span className="truncate">{c.name}</span>
                  </div>
                </div>
              ))}
          </div>

        </div>
      </div>

      {/* 2. Message Workspace */}
      <div className="flex-1 flex flex-col bg-background/25">
        
        {/* Active room header */}
        <div className="h-14 border-b border-border px-6 flex items-center justify-between bg-card/20 shrink-0">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {activeChannel.type === 'PROJECT' ? (
                <Hash className="h-4.5 w-4.5 text-orange-500" />
              ) : activeChannel.type === 'TASK' ? (
                <MessageCircle className="h-4.5 w-4.5 text-orange-500" />
              ) : (
                <Circle className={`h-2.5 w-2.5 fill-current ${activeChannel.online ? 'text-emerald-500' : 'text-muted-foreground'}`} />
              )}
              <span className="font-extrabold text-sm">{activeChannel.name}</span>
            </div>
            <span className="text-[9px] text-muted-foreground mt-0.5">{activeChannel.desc}</span>
          </div>

          <span className="text-[10px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
            Realtime Sockets Active
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-muted/5">
          {activeMessages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.self ? 'items-end' : 'items-start'}`}>
              <div className="flex items-baseline gap-2 mb-1 px-1 text-[10px] text-muted-foreground font-bold">
                <span>{m.sender}</span>
                <span className="font-mono text-[8px] font-normal">{m.time}</span>
              </div>
              <div
                className={`max-w-[70%] p-3 rounded-xl text-xs shadow-sm leading-relaxed ${
                  m.self
                    ? 'bg-orange-500 text-white rounded-tr-none'
                    : 'bg-card border border-border text-foreground rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col items-start animate-pulse">
              <span className="text-[10px] text-muted-foreground font-bold mb-1 px-1">
                {activeChannel.type === 'DM' ? activeChannel.name : 'Sarah Connor'} is typing...
              </span>
              <div className="bg-card border border-border px-4 py-2.5 rounded-xl rounded-tl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>

        {/* Message Input bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-border bg-card/20 flex gap-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message ${activeChannel.type === 'DM' ? activeChannel.name : '#' + activeChannel.name}...`}
            className="flex-1 px-4 py-2.5 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-xs"
          />
          <button
            type="submit"
            className="px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all cursor-pointer shadow-md shadow-orange-600/20 text-xs"
          >
            Send
          </button>
        </form>

      </div>

    </div>
  );
};

export default Chat;
