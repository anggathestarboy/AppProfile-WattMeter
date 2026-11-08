import React from 'react';

const APK_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1MGnygYJAWZQxsJVEZY3NoZxzIbrjHD38";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050608] py-16 text-neutral-400">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand Identity — Typography Only */}
          <div>
            <span className="font-display text-2xl font-black tracking-[-0.04em] text-white">
              Wattmeter
            </span>
            <p className="text-xs text-neutral-400 mt-1 max-w-sm">
              Open-source real-time battery condition and charging telemetry for Android devices.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center gap-8 text-xs font-mono uppercase tracking-wider">
            <a href="#showcase" className="hover:text-white transition-colors">
              Showcase
            </a>
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#simulator" className="hover:text-white transition-colors">
              Simulator
            </a>
            <a
              href="https://github.com/anggathestarboy/WattMeter"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://github.com/anggathestarboy/WattMeter/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              License (GPL-3.0)
            </a>
            <a
              href={APK_DOWNLOAD_URL}
              className="text-[#00ff66] hover:underline"
            >
              Download APK (16 MB)
            </a>
          </div>
        </div>

        {/* Bottom Specs, Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span>
              © {new Date().getFullYear()} Wattmeter Open Source Project. All code published under GPLv3.
            </span>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <span className="text-neutral-300">
              Created by{' '}
              <a
                href="https://github.com/anggathestarboy/WattMeter"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#00ff66] underline decoration-neutral-600 hover:decoration-[#00ff66] underline-offset-4 font-semibold transition-colors"
              >
                Anggara
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-500">
            <span>NO COOKIES</span>
            <span>•</span>
            <span>NO ANALYTICS</span>
            <span>•</span>
            <span>NO TRACKING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
