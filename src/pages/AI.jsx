import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Cpu, TrendingUp } from 'lucide-react';

const AI = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 select-none"
    >
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Services Layer</h1>
          <p className="text-muted-foreground text-sm mt-1">Predictive risk analysis and automated work summaries.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="h-4 w-4 animate-pulse" /> Advanced Engine
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Risk Prediction Panel */}
        <div className="p-6 border border-border bg-card/40 backdrop-blur-md rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Predictive Workload Risk</h3>
              <p className="text-xs text-muted-foreground">Deep learning analysis of active developers tasks</p>
            </div>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            AI predicts a 15% deadline bottleneck in current alpha sprints due to recursive blocker cascades on task dependencies. Refactoring blockers is highly recommended.
          </p>
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-semibold">Sprint Risk Threshold:</span>
            <span className="text-xs font-extrabold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">
              MODERATE (15%)
            </span>
          </div>
        </div>

        {/* Sprint Summary Generator */}
        <div className="p-6 border border-border bg-card/40 backdrop-blur-md rounded-3xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Sprint Summary Generator</h3>
                <p className="text-xs text-muted-foreground">Automatic daily collaborative recaps</p>
              </div>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Compile and generate immediate progress recaps from task update events and chat telemetry logs inside this organization scope.
            </p>
          </div>
          <button className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-sm transition-all cursor-pointer shadow-md shadow-orange-600/20 mt-6">
            Generate Collaborative Recap
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AI;
