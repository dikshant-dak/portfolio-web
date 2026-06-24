import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Calendar, User, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { GithubIcon as Github } from '@/components/icons/BrandIcons';
import Navbar from '@/components/Navbar';
import ProjectCarousel from '@/components/ProjectCarousel';
import { projects } from '@/data/portfolioData';

// Component caches data reads for ultra-fast instant navigation loads
export default async function PageContent({ slug }: { slug: string }) {
  'use cache';

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full bg-background bg-grid-pattern relative min-h-screen pt-24 pb-16 overflow-x-hidden">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          
          {/* Back button */}
          <Link
            href="/#projects"
            className="btn-transition inline-flex items-center gap-2 text-xs font-mono text-zinc-500 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to blueprints</span>
          </Link>

          {/* Hero header */}
          <div className="space-y-4 border-b border-zinc-900 pb-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                Case Study
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight leading-none">
              {project.title}
            </h1>
            <p className="text-base text-zinc-400 leading-relaxed font-sans max-w-2xl">
              {project.description}
            </p>

            {/* Quick Metadata Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs font-mono">
              <div className="border border-zinc-800/60 bg-zinc-950/40 p-3 rounded-lg flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-600 block uppercase text-[9px]">Role</span>
                  <span className="text-zinc-300 font-semibold">{project.role}</span>
                </div>
              </div>
              <div className="border border-zinc-800/60 bg-zinc-950/40 p-3 rounded-lg flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-600 block uppercase text-[9px]">Period</span>
                  <span className="text-zinc-300 font-semibold">{project.period}</span>
                </div>
              </div>
              <div className="border border-zinc-800/60 bg-zinc-950/40 p-3 rounded-lg flex items-center gap-2 col-span-2">
                <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-zinc-600 block uppercase text-[9px]">Links</span>
                  <div className="flex items-center gap-4 mt-0.5">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors flex items-center gap-1">
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                    {project.demo && project.demo !== '#' && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-white transition-colors flex items-center gap-1">
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Screenshot/Blueprint Carousel */}
          <section className="space-y-4">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              System Architecture & Interface Blueprint
            </h3>
            <ProjectCarousel projectTitle={project.title} screenshots={project.screenshots} />
          </section>

          {/* Main Case Study Text Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            
            {/* Left columns - Details */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Problem */}
              <div className="space-y-3">
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
                  <span>The Engineering Problem</span>
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="space-y-3">
                <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>The Implemented Solution</span>
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.solution}
                </p>
              </div>

              {/* System Architecture */}
              <div className="space-y-3">
                <h3 className="text-lg font-heading font-bold text-white">System Architecture</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.architecture}
                </p>
              </div>

              {/* Key Technical Challenges */}
              <div className="space-y-3 border-l border-zinc-800 pl-4">
                <h3 className="text-lg font-heading font-bold text-white">Key Technical Challenges</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans italic">
                  {project.challenges}
                </p>
              </div>

              {/* Business Results */}
              <div className="border border-zinc-800/80 bg-primary/40 p-6 rounded-2xl space-y-3">
                <h3 className="text-lg font-heading font-bold text-white">Business Results & Impact</h3>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                  {project.businessImpact}
                </p>
              </div>

            </div>

            {/* Right column - Tech specs */}
            <div className="space-y-6">
              
              {/* Specs card */}
              <div className="border border-zinc-800 bg-primary/20 p-5 rounded-2xl space-y-4">
                <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                  Technology Specs
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics card */}
              {project.metrics && (
                <div className="border border-zinc-800 bg-primary/20 p-5 rounded-2xl space-y-4">
                  <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    Key Performance Metrics
                  </h4>
                  <div className="space-y-3">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="border-b border-zinc-900 pb-2.5 last:border-0 last:pb-0">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                          {metric.label}
                        </span>
                        <div className="text-lg font-bold text-white mt-0.5">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>
    </>
  );
}
