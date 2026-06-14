/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '@/data/portfolioData';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
}

export default function Lightbox({ isOpen, onClose, imageUrl, imageAlt }: LightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-900/80 p-2.5 rounded-full border border-zinc-800 transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Renders image or falls back to standard styled mock layout */}
            {imageUrl.startsWith('mock://') ? (
              <MockScreenshot alt={imageAlt} heightClass="h-[60vh] w-full" />
            ) : (
              <img
                src={imageUrl}
                alt={imageAlt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg border border-zinc-800 shadow-2xl"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Inline component to draw high-fidelity mock screenshots in the lightbox
function MockScreenshot({ alt, heightClass }: { alt: string; heightClass: string }) {
  // Find project by title matching alt (case-insensitive)
  const project = projects.find(p => 
    alt.toLowerCase().includes(p.title.toLowerCase())
  );

  // Fallbacks if not matches
  const title = project ? project.title : alt;
  const slug = project ? project.slug : alt.toLowerCase().replace(/\s+/g, '-');
  
  let clientVal = "Next.js Web Client";
  let middleVal = "Fastify API / Node.js";
  let storageVal = "PostgreSQL Database";
  let telemetryLogs = `[info] Telemetry node active.
[info] System operations verified.`;

  if (project) {
    const tech = project.technologies;

    // Client Layer
    if (tech.includes("React Native")) {
      clientVal = "React Native App";
    } else if (tech.includes("Next.js 16") || tech.includes("Next.js") || tech.includes("Next.js 15")) {
      clientVal = "Next.js (App Router)";
    } else if (tech.includes("React")) {
      clientVal = "React SPA Client (Vite)";
    }

    // Middleware / API / Processing Layer
    if (tech.includes("Apache Kafka")) {
      middleVal = "Kafka Broker & Workers";
    } else if (tech.includes("Fastify")) {
      middleVal = "Fastify Service Backend";
    } else if (tech.includes("Express") || tech.includes("Express.js")) {
      middleVal = "Express.js REST API";
    } else if (tech.includes("Redux Toolkit")) {
      middleVal = "Redux Toolkit State Store";
    }

    // Storage / Database / Services Layer
    if (tech.includes("Supabase PostgreSQL")) {
      storageVal = "Supabase DB & RLS Auth";
    } else if (tech.includes("PostgreSQL")) {
      storageVal = "PostgreSQL Ledger DB";
    } else if (tech.includes("MongoDB")) {
      storageVal = "MongoDB Document Store";
    } else if (tech.includes("TMDB API")) {
      storageVal = "TMDB Movies API REST";
    } else if (tech.includes("RapidAPI")) {
      storageVal = "RapidAPI REST Gateway";
    }

    // Tailored logs matching the project's actual capabilities
    if (slug === 'astro-analysts') {
      telemetryLogs = `$ bun run monitor --target="astro-analysts"
[info] Initializing Kafka message broker... Connected.
[info] Decoupled Puppeteer worker pools listening to report queue...
[info] Nodemailer & Razorpay integrations online (SSL=true).`;
    } else if (slug === 'wealth-builders') {
      telemetryLogs = `$ bun run monitor --target="wealth-builders"
[info] Loading NAV commission ledger schema... Connected.
[info] Running double-entry append-only accounting verification triggers...
[info] Active investor ledger sync validated successfully.`;
    } else if (slug === 'skytrek-adventure') {
      telemetryLogs = `$ bun run monitor --target="skytrek-adventure"
[info] Starting adventure park slot reservation engine...
[info] Row-level lock safety verified on reservation transaction blocks.
[info] PayU sandbox hooks and WhatsApp notification pipelines active.`;
    } else if (slug === 'nextinnings') {
      telemetryLogs = `$ bun run monitor --target="nextinnings"
[info] Socket.io real-time score channel active on port 4000.
[info] Offline buffering initialized. SQLite client queue ready.
[info] Sub-100ms updates online.`;
    } else if (slug === 'luxorae-detailing') {
      telemetryLogs = `$ bun run monitor --target="luxorae-detailing"
[info] Initializing local client mapping index lookup...
[info] Fuzzy search directory loaded (15+ hotel nodes mapped).
[info] Dynamic item listings with stateful caching enabled.`;
    } else if (slug === 'cinematic-suite') {
      telemetryLogs = `$ npm run dev --project="cinematic-suite"
[info] Caching TMDB configuration metadata in Redux store...
[info] 60 FPS infinite scroll boundary threshold listeners loaded.
[info] Lazy-loaded images initialized. HMR active.`;
    } else if (slug === 'youtube-clone') {
      telemetryLogs = `$ npm run dev --project="youtube-clone"
[info] Category views and search caching maps initialized.
[info] API rate limit protection wrapper enabled.
[info] SCSS responsive layout grid utility classes compiled.`;
    }
  }

  return (
    <div className={`rounded-xl border border-zinc-800 bg-primary flex flex-col overflow-hidden shadow-2xl ${heightClass}`}>
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-red-500/80 rounded-full" />
          <span className="w-3 h-3 bg-yellow-500/80 rounded-full" />
          <span className="w-3 h-3 bg-green-500/80 rounded-full" />
        </div>
        <span className="text-xs font-mono text-zinc-500 select-none">{slug}.config</span>
        <div className="w-12" />
      </div>
      
      {/* Content Area */}
      <div className="flex-1 p-6 font-mono text-xs text-zinc-400 bg-dot-pattern flex flex-col justify-between overflow-y-auto">
        <div className="space-y-4">
          <div className="text-zinc-600 font-mono">{"// System Architecture Diagram"}</div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px]">SUCCESS</span>
            <span>Pipeline verified for: {title}</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-zinc-800 bg-black/40 p-4 rounded-lg mt-4">
            <div className="border border-zinc-800 p-3 rounded bg-background/60">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Client Layer</span>
              <span className="text-white font-sans font-semibold text-xs sm:text-sm">{clientVal}</span>
            </div>
            <div className="border border-zinc-800 p-3 rounded bg-background/60">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Processing / Middleware</span>
              <span className="text-white font-sans font-semibold text-xs sm:text-sm">{middleVal}</span>
            </div>
            <div className="border border-zinc-800 p-3 rounded bg-background/60">
              <span className="text-zinc-500 block text-[10px] uppercase font-bold tracking-wider">Data / Service Layer</span>
              <span className="text-white font-sans font-semibold text-xs sm:text-sm">{storageVal}</span>
            </div>
          </div>

          <div className="border border-zinc-800 bg-black/20 p-3 rounded text-[11px] font-mono whitespace-pre-wrap leading-relaxed mt-4">
{telemetryLogs}
          </div>
        </div>

        <div className="text-[10px] text-zinc-600 border-t border-zinc-900 pt-4 flex justify-between items-center mt-6">
          <span>MD5: 8b1a2f3c4d5e6f7a8b9c0d1e2f3a4b5c</span>
          <span>Build: stable-v16.2.9</span>
        </div>
      </div>
    </div>
  );
}
export { MockScreenshot };
