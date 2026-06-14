/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Lightbox, { MockScreenshot } from './Lightbox';

interface ProjectCarouselProps {
  projectTitle: string;
  screenshots?: string[];
}

export default function ProjectCarousel({ projectTitle, screenshots = [] }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // If no screenshots, create generic mock labels
  const slides = screenshots.length > 0 
    ? screenshots.map(s => s.startsWith('/') || s.startsWith('http') ? s : `mock://${s}`) 
    : [`mock://${projectTitle.toLowerCase().replace(/\s+/g, '-')}_main.jpg`];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative group/carousel w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-primary/60 flex flex-col justify-between">
      {/* Slide Content */}
      <div 
        className="relative flex-1 w-full h-full cursor-pointer overflow-hidden"
        onClick={() => setLightboxOpen(true)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {slides[currentIndex].startsWith('mock://') ? (
              <MockScreenshot 
                alt={`${projectTitle} - Dashboard Preview ${currentIndex + 1}`} 
                heightClass="h-full w-full border-none"
              />
            ) : (
              <img 
                src={slides[currentIndex]} 
                alt={`${projectTitle} - Preview ${currentIndex + 1}`} 
                className="w-full h-full object-cover border-none"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Hover overlay to zoom */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-zinc-900/95 border border-zinc-800 rounded-full px-4 py-2 flex items-center gap-2 text-xs font-medium text-white shadow-xl">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Click to Expand Blueprint</span>
          </div>
        </div>
      </div>

      {/* Navigation arrows (only if > 1 slide) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-zinc-950/80 border border-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-400 p-1.5 rounded-full transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-lg z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-zinc-950/80 border border-zinc-800 hover:bg-emerald-500 hover:text-white text-zinc-400 p-1.5 rounded-full transition-all duration-200 opacity-0 group-hover/carousel:opacity-100 cursor-pointer shadow-lg z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-zinc-800/50 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                index === currentIndex ? 'bg-emerald-400 w-3' : 'bg-zinc-600 hover:bg-zinc-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox Trigger */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageUrl={slides[currentIndex]}
        imageAlt={`${projectTitle} - Full Screen Blueprint ${currentIndex + 1}`}
      />
    </div>
  );
}
