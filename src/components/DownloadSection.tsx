import React, { useState } from 'react';

const APK_DOWNLOAD_URL = "https://drive.google.com/uc?export=download&id=1MGnygYJAWZQxsJVEZY3NoZxzIbrjHD38";
const SHA256_CHECKSUM = "a8f3b92c104e76d9e03f572a11b84931df6e44b98c392c0a96f1b0a88ef38210";

export const DownloadSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyChecksum = () => {
    navigator.clipboard.writeText(SHA256_CHECKSUM);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="download" className="py-28 border-t border-white/[0.08] bg-[#07080c] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00ff66]">
            RELEASE DISTRIBUTION
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-white">
            Get Wattmeter for Android.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-normal">
            Download the standalone APK package directly. No Google Play account required, no automated analytics tracking.
          </p>
        </div>

        {/* Download Release Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Action Block (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c0e14] border border-white/10 p-8 sm:p-10 rounded-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
                <div>
                  <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    STABLE RELEASE PACKAGE
                  </span>
                  <div className="font-display text-2xl font-bold text-white mt-1">
                    Wattmeter v2.4.0 (Universal APK)
                  </div>
                </div>
                <span className="font-mono text-xs text-[#00ff66] bg-[#00ff66]/10 border border-[#00ff66]/30 px-3 py-1 rounded-sm">
                  ARM64-V8A &amp; X86_64
                </span>
              </div>

              {/* Exact Google Drive download link */}
              <div>
                <a
                  href={APK_DOWNLOAD_URL}
                  className="w-full inline-flex items-center justify-center px-8 py-5 text-base font-semibold uppercase tracking-wider text-black bg-[#00ff66] hover:bg-[#10e563] active:scale-[0.99] transition-all rounded-sm shadow-[0_0_35px_rgba(0,255,102,0.3)]"
                >
                  Download Wattmeter
                </a>
                <div className="mt-3 flex items-center justify-between font-mono text-xs text-neutral-400">
                  <span>File: Wattmeter-v2.4.0.apk (16 MB)</span>
                  <span>Minimum: Android 8.0+</span>
                </div>
              </div>

              {/* Checksum Box */}
              <div className="p-4 bg-[#08090d] border border-white/5 rounded-sm space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>SHA-256 CHECKSUM HASH</span>
                  <button
                    onClick={copyChecksum}
                    className="text-[#00ff66] hover:underline cursor-pointer"
                  >
                    {copied ? '✓ COPIED' : 'COPY HASH'}
                  </button>
                </div>
                <div className="text-neutral-300 break-all select-all font-mono text-[11px] bg-black/40 p-2 rounded-xs border border-white/5">
                  {SHA256_CHECKSUM}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] text-xs font-mono text-neutral-400 flex flex-wrap gap-6">
              <span>ZERO IN-APP PURCHASES</span>
              <span>•</span>
              <span>ZERO TRACKING</span>
              <span>•</span>
              <span>GPL-3.0 LICENSED</span>
            </div>
          </div>

          {/* Installation Steps Block (5 cols) */}
          <div className="lg:col-span-5 bg-[#0c0e14] border border-white/10 p-8 sm:p-10 rounded-sm flex flex-col justify-between">
            <div>
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-4">
                INSTALLATION WALKTHROUGH
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-6">
                3 Steps to Activate
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="font-mono text-xs font-bold text-[#00ff66] border border-[#00ff66]/30 bg-[#00ff66]/10 w-7 h-7 flex items-center justify-center rounded-sm shrink-0">
                    01
                  </span>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Download APK</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Tap the download button above to retrieve the package from the official release storage.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-mono text-xs font-bold text-[#00ff66] border border-[#00ff66]/30 bg-[#00ff66]/10 w-7 h-7 flex items-center justify-center rounded-sm shrink-0">
                    02
                  </span>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Allow Unknown Apps</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Android will prompt for permission to install apps from your browser or file manager. Enable this setting once.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="font-mono text-xs font-bold text-[#00ff66] border border-[#00ff66]/30 bg-[#00ff66]/10 w-7 h-7 flex items-center justify-center rounded-sm shrink-0">
                    03
                  </span>
                  <div>
                    <h4 className="font-semibold text-white text-sm">Launch Diagnostics</h4>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Open Wattmeter. The app automatically connects to your Linux hardware sysfs nodes and begins streaming live metrics.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] text-[11px] font-mono text-neutral-400">
              Note: Root access is NOT required for basic voltage, wattage, and temperature telemetry.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
