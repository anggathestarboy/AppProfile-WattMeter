import React from 'react';

export const OpenSourceSection: React.FC = () => {
  return (
    <section id="opensource" className="py-28 border-t border-white/[0.08] bg-[#08090d] relative overflow-hidden">
      {/* Background subtle green gradient */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#00ff66]/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-[#00ff66]">
              TRANSPARENT REPRODUCIBLE BUILDS
            </div>

            <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-white">
              Built in the Open.
            </h2>

            <p className="text-lg text-neutral-300 font-normal leading-relaxed max-w-xl">
              Transparent, open-source, and built for everyone who wants to understand their device's battery better.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
              Most battery apps in commercial app stores are laden with full-screen ads, analytics trackers, and background cryptominers that paradoxically drain the very battery you are trying to preserve. Wattmeter has zero tracking, zero ads, and requests no network permission in its manifest.
            </p>

            {/* CTA: View on GitHub (No brand logo, strictly typography) */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/anggathestarboy/WattMeter"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold uppercase tracking-wider text-black bg-[#00ff66] hover:bg-[#10e563] active:scale-[0.98] transition-all rounded-sm shadow-[0_0_30px_rgba(0,255,102,0.25)]"
              >
                View on GitHub
              </a>

              <a
                href="#download"
                className="inline-flex items-center justify-center px-6 py-4 text-sm font-semibold uppercase tracking-wider text-neutral-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-sm transition-all"
              >
                Verify Checksums
              </a>
            </div>
          </div>

          {/* Right Column: Technical Manifest & Code Integrity Box */}
          <div className="lg:col-span-5 bg-[#0c0e14] border border-white/10 p-6 sm:p-8 rounded-sm font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
              <span className="text-neutral-400 uppercase tracking-widest text-[11px]">
                ANDROIDMANIFEST.XML AUDIT
              </span>
              <span className="text-[#00ff66]">AUDITED CLEAN</span>
            </div>

            <div className="space-y-4 text-neutral-300">
              <div className="p-3 bg-[#08090d] border border-white/5 rounded-xs space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase">NETWORK ACCESS</div>
                <div className="text-white font-semibold">android.permission.INTERNET = OMITTED</div>
                <div className="text-neutral-400 text-[11px]">The application physically cannot send telemetry or connect to external servers.</div>
              </div>

              <div className="p-3 bg-[#08090d] border border-white/5 rounded-xs space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase">SYSFS HARDWARE NODES</div>
                <div className="text-[#00ff66] font-semibold">BATTERY_STATS &amp; POWER_SUPPLY</div>
                <div className="text-neutral-400 text-[11px]">Direct read of current_now, voltage_now, and temp without root requirements.</div>
              </div>

              <div className="p-3 bg-[#08090d] border border-white/5 rounded-xs space-y-1">
                <div className="text-[10px] text-neutral-500 uppercase">SOFTWARE LICENSE</div>
                <div className="text-white font-semibold">GNU General Public License v3.0</div>
                <div className="text-neutral-400 text-[11px]">Freedom to inspect, fork, modify, and distribute with complete code transparency.</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-neutral-400">
              <span>CONTRIBUTORS WELCOME</span>
              <span className="text-white">KOTLIN / JETPACK COMPOSE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
