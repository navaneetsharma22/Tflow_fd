import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Sparkles } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Navaneet', text: 'Hey team, does anyone have an update on the circular cycle check optimization?', self: false },
    { id: 2, sender: 'You', text: 'Yes, it is running asynchronously in-memory now! Memory footprints dropped to zero.', self: true },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages([...messages, { id: Date.now(), sender: 'You', text: inputText, self: true }]);
    setInputText('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-[calc(100vh-12rem)] flex border border-border bg-card/20 backdrop-blur-md rounded-3xl overflow-hidden select-none shadow-lg"
    >
      {/* 1. Chat Channels Sidebar */}
      <div className="w-64 border-r border-border bg-card/40 flex flex-col hidden sm:flex">
        <div className="p-4 border-b border-border font-bold text-sm tracking-wide text-muted-foreground uppercase">
          Channels
        </div>
        <div className="flex-1 p-2 space-y-1 overflow-y-auto">
          {['# general-sync', '# engineering', '# product-ideas'].map((ch, idx) => (
            <div
              key={idx}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${
                idx === 0 ? 'bg-orange-500/10 text-orange-500' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              {ch}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Message Workspace */}
      <div className="flex-1 flex flex-col bg-background/20">
        {/* Active room header */}
        <div className="h-14 border-b border-border px-6 flex items-center justify-between bg-card/10">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4.5 w-4.5 text-orange-500" />
            <span className="font-bold text-sm"># general-sync</span>
          </div>
          <span className="text-[10px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
            Realtime Sockets Active
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.self ? 'items-end' : 'items-start'}`}>
              <span className="text-[10px] text-muted-foreground font-semibold px-1 mb-1">{m.sender}</span>
              <div
                className={`max-w-[70%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                  m.self
                    ? 'bg-orange-600 text-white rounded-tr-none'
                    : 'bg-card border border-border text-foreground rounded-tl-none'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-border bg-card/20 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message securely..."
            className="flex-1 px-4 py-3 bg-muted/40 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all text-sm"
          />
          <button
            type="submit"
            className="p-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-all cursor-pointer shadow-md shadow-orange-600/20"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Chat;
