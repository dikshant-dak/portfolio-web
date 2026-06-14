'use client';

import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { GithubIcon as Github } from '@/components/icons/BrandIcons';
import { motion } from 'motion/react';
import { Project } from '@/data/portfolioData';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group glow-card relative flex flex-col justify-between border border-zinc-800 bg-primary/30 backdrop-blur-sm rounded-2xl p-6 md:p-8 cursor-pointer h-full"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-mono text-emerald-400 font-medium tracking-wider uppercase">
              {project.role}
            </span>
            <h3 className="text-2xl font-heading font-bold text-white tracking-tight mt-1 group-hover:text-emerald-400 transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500">{project.period}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: 'spring', stiffness: 150 }}
              className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 5 && (
            <span className="text-[10px] font-mono text-zinc-500 font-medium px-2 py-0.5">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>

        {/* Metrics/Stats */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-3 border-t border-zinc-900 pt-4 mb-6">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="flex flex-col">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="text-sm font-semibold text-white mt-0.5">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action CTA Buttons */}
      <div className="flex items-center justify-between border-t border-zinc-900 pt-4 mt-auto">
        <div className="flex items-center gap-3.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="View Source Code"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div whileHover={{ rotate: 12 }}>
                <Github className="w-4 h-4" />
              </motion.div>
            </a>
          )}
          {project.demo && project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
              aria-label="View Live Website"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Live Demo</span>
            </a>
          )}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="btn-transition flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-400 hover:text-white group/link"
        >
          <span>Read Case Study</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
