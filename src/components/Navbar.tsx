import React, { useState, useEffect } from 'react';

const APK_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1MGnygYJAWZQxsJVEZY3NoZxzIbrjHD38";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090d]/90 backdrop-blur-md border-b border-white/[0.08] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Identity — Typography Only (Strictly No Logo or Icons) */}
        <a
          href="#"
          className="group focus:outline-none"
          aria-label="Wattmeter Home"
        >
          <span className="font-display text-xl sm:text-2xl font-bold tracking-[-0.04em] text-white transition-colors duration-200 group-hover:text-[#00ff66]">
            Wattmeter
          </span>
          <span className="sr-only">Home</span>
        </a>

        {/* Right Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a
            href="#showcase"
            className="text-neutral-400 hover:text-white transition-colors tracking-tight"
          >
            Showcase
          </a>
          <a
            href="#features"
            className="text-neutral-400 hover:text-white transition-colors tracking-tight"
          >
            Features
          </a>
          <a
            href="#simulator"
            className="text-neutral-400 hover:text-white transition-colors tracking-tight"
          >
            Live Simulator
          </a>
          <a
            href="#opensource"
            className="text-neutral-400 hover:text-white transition-colors tracking-tight"
          >
            Open Source
          </a>
          <a
            href="https://github.com/anggathestarboy/WattMeter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors tracking-tight"
          >
            GitHub
          </a>

          {/* CTA: Get the App */}
          <a
            href={APK_DOWNLOAD_URL}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-[#00ff66] hover:bg-[#10e563] active:scale-[0.98] transition-all rounded-sm shadow-[0_0_20px_rgba(0,255,102,0.25)]"
          >
            Get the App
          </a>
        </div>

        {/* Mobile Hamburger (minimal text toggle) */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={APK_DOWNLOAD_URL}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-black bg-[#00ff66] rounded-sm"
          >
            Get App
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-neutral-400 hover:text-white text-xs uppercase tracking-widest px-2 py-1 border border-white/10 rounded-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#08090d]/95 border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-sm font-medium">
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-[#00ff66] py-1"
          >
            Showcase
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-[#00ff66] py-1"
          >
            Features
          </a>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-[#00ff66] py-1"
          >
            Live Simulator
          </a>
          <a
            href="#opensource"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-[#00ff66] py-1"
          >
            Open Source
          </a>
          <a
            href="https://github.com/anggathestarboy/WattMeter"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-[#00ff66] py-1"
          >
            GitHub
          </a>
        </div>
      )}
    </nav>
  );
};
