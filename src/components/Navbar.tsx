/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ArrowRight, Mail } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '@/components/icons/BrandIcons';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '@/data/portfolioData';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const pathname = usePathname();
  const isHome = pathname === '/';

  const navLinks = [
    { name: 'Projects', href: isHome ? '#projects' : '/#projects' },
    { name: 'Expertise', href: isHome ? '#expertise' : '/#expertise' },
    { name: 'Experience', href: isHome ? '#experience' : '/#experience' },
    { name: 'Deep Dive', href: isHome ? '#deep-dive' : '/#deep-dive' },
    { name: 'About', href: isHome ? '#about' : '/#about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-zinc-800/80 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <img 
              src="/icon.png" 
              alt="Dikshant Dak Logo" 
              className="w-7 h-7 rounded-lg border border-zinc-800 bg-zinc-950 group-hover:border-emerald-500/50 group-hover:scale-105 transition-all duration-300"
            />
            <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-emerald-500 transition-colors duration-300">
              {personalInfo.name}
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-sans font-medium text-emerald-400 uppercase tracking-wider hidden sm:inline">
                Available
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <Link
              href="/#contact"
              className="btn-transition flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white text-black hover:bg-emerald-500 hover:text-white px-4 py-2 rounded-full cursor-pointer"
            >
              Contact Me
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-zinc-400 hover:text-white p-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-14.25 z-40 bg-background border-t border-zinc-800 md:hidden flex flex-col justify-between p-8"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading font-medium text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-heading font-medium text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                Contact
              </Link>
            </nav>

            <div className="flex flex-col gap-6 border-t border-zinc-800 pt-8">
              <div className="flex gap-6">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                  <Github className="w-5 h-5" /> GitHub
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                >
                  <Mail className="w-5 h-5" /> Email
                </a>
              </div>
              <div className="text-xs text-zinc-500">
                &copy; {new Date().getFullYear()} Dikshant Dak. All rights reserved.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
