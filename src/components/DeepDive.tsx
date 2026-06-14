'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, MessageSquare, Database } from 'lucide-react';
import { techStackDeepDive } from '@/data/portfolioData';

export default function DeepDive() {
  const [activeTab, setActiveTab] = useState(0);

  const icons = [
    <Cpu key="cpu" className="w-4 h-4" />,
    <MessageSquare key="msg" className="w-4 h-4" />,
    <Database key="db" className="w-4 h-4" />,
  ];

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Navigation Tabs */}
      <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 no-scrollbar">
        {techStackDeepDive.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            suppressHydrationWarning
            className={`btn-transition flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium whitespace-nowrap lg:whitespace-normal text-left cursor-pointer shrink-0 lg:shrink ${
              activeTab === idx
                ? 'bg-emerald-500/10 border-emerald-500/40 text-white font-semibold'
                : 'bg-primary/20 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            <span className={activeTab === idx ? 'text-emerald-400' : 'text-zinc-500'}>
              {icons[idx] || <Cpu className="w-4 h-4" />}
            </span>
            <span>{item.title}</span>
          </button>
        ))}
      </div>

      {/* Main Tab Panel Content */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="border border-zinc-800 bg-primary/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                Technology Pillar
              </span>
            </div>
            <h3 className="text-2xl font-heading font-bold text-white tracking-tight mb-4">
              {techStackDeepDive[activeTab].tech}
            </h3>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed mb-6 font-sans">
              {techStackDeepDive[activeTab].why}
            </p>

            <div className="border-t border-zinc-900 pt-6">
              <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
                Core Architectural Benefits
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {techStackDeepDive[activeTab].points.map((point, pIdx) => (
                  <li
                    key={pIdx}
                    className="text-xs text-zinc-400 bg-zinc-950/80 border border-zinc-900 p-3.5 rounded-lg flex items-start gap-2.5 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
