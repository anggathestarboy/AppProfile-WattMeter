import React, { useState } from 'react';
import { Phone3DCanvas, PRESETS } from './Phone3DCanvas';
import { BatteryPreset } from '../types/battery';

const APK_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1MGnygYJAWZQxsJVEZY3NoZxzIbrjHD38";

export const HeroSection: React.FC = () => {
  const [activePreset, setActivePreset] = useState<BatteryPreset>(PRESETS[0]);

  return (
    <section className="relative min-h-screen pt-28 sm:pt-36 pb-20 flex flex-col justify-between overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00ff66]/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
        {/* Top Editorial Kicker */}
        <div className="inline-flex items-center gap-3 px-3 py-1.5 mb-8 border border-white/10 bg-white/[0.02] rounded-sm backdrop-blur-sm">
          <span className="font-mono text-xs text-[#00ff66] font-semibold tracking-wider uppercase">
            OPEN SOURCE ANDROID DIAGNOSTICS
          </span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span className="font-mono text-xs text-neutral-400">
            v2.4.0 • APK RELEASE
          </span>
        </div>

        {/* Grid: Left Editorial Typography & CTAs, Right 3D Interactive Smartphone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description, CTAs */}
          <div className="lg:col-span-6 z-20 space-y-8">
            <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-[-0.04em] text-white leading-[1.05]">
              Know Your Battery.
              <br />
              <span className="text-neutral-400">Down to Every Detail.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-xl">
              Monitor your device's battery condition, charging activity, and performance in real time.
            </p>

            {/* CTAs: Direct Download & GitHub */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* Exact Google Drive download link specified in prompt */}
              <a
                href={APK_DOWNLOAD_URL}
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black bg-[#00ff66] hover:bg-[#10e563] active:scale-[0.98] transition-all rounded-sm shadow-[0_0_35px_rgba(0,255,102,0.3)] group"
              >
                <span>Download for Android</span>
                <span className="ml-2 font-mono text-xs opacity-70 group-hover:translate-x-0.5 transition-transform">
                  [APK 16 MB]
                </span>
              </a>

              <a
                href="https://github.com/anggathestarboy/WattMeter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-4 text-sm font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 active:scale-[0.98] transition-all rounded-sm"
              >
                Explore GitHub
              </a>
            </div>

            {/* Hardware Telemetry Spec Snapshot */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <div className="text-neutral-500 uppercase tracking-widest text-[10px]">
                  SAMPLING RATE
                </div>
                <div className="text-white font-semibold text-sm mt-0.5">1000 ms</div>
                <div className="text-neutral-400 text-[11px]">Hardware ADC</div>
              </div>
              <div>
                <div className="text-neutral-500 uppercase tracking-widest text-[10px]">
                  POWER OVERHEAD
                </div>
                <div className="text-[#00ff66] font-semibold text-sm mt-0.5">&lt; 0.08% / 24h</div>
                <div className="text-neutral-400 text-[11px]">Zero Wake-locks</div>
              </div>
              <div>
                <div className="text-neutral-500 uppercase tracking-widest text-[10px]">
                  PRIVACY MODEL
                </div>
                <div className="text-white font-semibold text-sm mt-0.5">Air-Gapped</div>
                <div className="text-neutral-400 text-[11px]">No Telemetry</div>
              </div>
            </div>
          </div>

          {/* Right Column: Three.js 3D Floating Smartphone */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full rounded-md border border-white/[0.06] bg-[#0b0c11]/40 tech-grid">
              <Phone3DCanvas
                activePresetId={activePreset.id}
                onPresetChange={(p) => setActivePreset(p)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom ticker */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full mt-16 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-4">
        <div className="flex items-center gap-6">
          <span>USB-PD 3.0 PPS</span>
          <span>•</span>
          <span>QUALCOMM QC4+</span>
          <span>•</span>
          <span>SUPERVOOC</span>
          <span>•</span>
          <span>SAMSUNG SFC 2.0</span>
        </div>
        <div className="text-neutral-400">
          COMPATIBLE WITH ANDROID 8.0 TO ANDROID 15+
        </div>
      </div>
    </section>
  );
};
