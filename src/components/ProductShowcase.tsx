import React, { useState } from 'react';

export const ProductShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wattage' | 'health' | 'thermal' | 'protocol'>('wattage');

  return (
    <section id="showcase" className="relative py-28 border-t border-white/[0.08] bg-[#07080c] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00ff66]/[0.02] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00ff66]">
            PRECISION TELEMETRY ARCHITECTURE
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white leading-tight">
            Designed for Hardware Enthusiasts.
            <br />
            <span className="text-neutral-400">Pure metrics, zero guesswork.</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Wattmeter taps directly into the Linux kernel power supply subsystem (<code className="font-mono text-xs bg-white/5 px-2 py-0.5 rounded text-neutral-200">/sys/class/power_supply/battery</code>) to deliver unadulterated micro-readings from your hardware fuel gauge.
          </p>
        </div>

        {/* Asymmetric Editorial Layout 1: The Primary Telemetry Command Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Main Large Display Unit (8 Cols) */}
          <div className="lg:col-span-8 bg-[#0c0e14] border border-white/10 p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
              <div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  TELEMETRY SENSOR 01
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  Real-Time Wattage & Current Flow
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-[#00ff66] bg-[#00ff66]/10 border border-[#00ff66]/30 px-3 py-1 rounded-sm self-start">
                <span>POLLED AT 1000MS</span>
              </div>
            </div>

            {/* Asymmetrical Big Data Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-10">
              <div className="space-y-1">
                <div className="font-mono text-xs text-neutral-400">INSTANT WATTAGE</div>
                <div className="font-display text-4xl sm:text-5xl font-black text-white">
                  +48.2 <span className="text-lg font-mono text-[#00ff66] font-normal">W</span>
                </div>
                <div className="font-mono text-[11px] text-neutral-400">Calculated: P = V × I</div>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs text-neutral-400">CURRENT FLOW</div>
                <div className="font-display text-4xl sm:text-5xl font-black text-[#00ff66]">
                  +5,240 <span className="text-lg font-mono text-white font-normal">mA</span>
                </div>
                <div className="font-mono text-[11px] text-neutral-400">Direct Fuel Gauge ADC</div>
              </div>

              <div className="space-y-1">
                <div className="font-mono text-xs text-neutral-400">CELL VOLTAGE</div>
                <div className="font-display text-4xl sm:text-5xl font-black text-white">
                  4,285 <span className="text-lg font-mono text-neutral-400 font-normal">mV</span>
                </div>
                <div className="font-mono text-[11px] text-neutral-400">1mV ADC precision</div>
              </div>
            </div>

            {/* Interactive Live Charging Waveform Visualizer */}
            <div className="bg-[#08090d] border border-white/5 p-5 rounded-sm">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span>VOLTAGE & CURRENT WAVEFORM PROFILE</span>
                <span className="text-[#00ff66]">CC/CV CHARGE SATURATION</span>
              </div>
              <div className="h-28 w-full flex items-end gap-1.5 pt-4">
                {[
                  32, 45, 68, 85, 94, 98, 97, 95, 96, 94, 93, 89, 85, 82, 80, 77, 74, 70, 68, 64, 61, 58, 55, 50, 46, 42, 38, 35, 30, 26, 22, 18
                ].map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-gradient-to-t from-[#00ff66]/20 via-[#00ff66]/60 to-[#00ff66] rounded-t-xs transition-all duration-300 hover:opacity-100 opacity-80"
                    style={{ height: `${val}%` }}
                    title={`Sample #${idx}: ${val}% Peak Power`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] font-mono text-neutral-400 mt-2">
                <span>0 MIN (CONSTANT CURRENT PHASE)</span>
                <span>30 MIN</span>
                <span>60 MIN (CONSTANT VOLTAGE TRICKLE)</span>
              </div>
            </div>
          </div>

          {/* Side Editorial Card (4 Cols): Battery Percentage & Charge State */}
          <div className="lg:col-span-4 bg-[#0c0e14] border border-white/10 p-8 sm:p-10 flex flex-col justify-between rounded-sm">
            <div>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                TELEMETRY SENSOR 02
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Battery Percentage
              </h3>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Standard Android status bars round battery levels to integer tiers. Wattmeter extracts fractional decimal precision (e.g., <code className="text-[#00ff66] font-mono">87.42%</code>) from the hardware Coulomb counter.
              </p>
            </div>

            <div className="my-8 py-8 border-y border-white/[0.08] space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-6xl font-black text-white">87.4%</span>
                <span className="font-mono text-xs text-[#00ff66] uppercase tracking-wider">
                  RAPID CHARGE
                </span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[#00ff66] h-full rounded-full" style={{ width: '87.4%' }} />
              </div>
              <div className="flex justify-between font-mono text-xs text-neutral-400">
                <span>Remaining: 4,370 mAh</span>
                <span>Full in: 18 min</span>
              </div>
            </div>

            <div className="font-mono text-xs text-neutral-400 space-y-2">
              <div className="flex justify-between">
                <span>DISCHARGE RATE:</span>
                <span className="text-white">9.2% / hr (Screen On)</span>
              </div>
              <div className="flex justify-between">
                <span>STANDBY SLEEP:</span>
                <span className="text-white">0.38% / hr (Deep Doze)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Asymmetric Editorial Layout 2: Battery Health & Thermal Management */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: State of Health (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0c0e14] border border-white/10 p-8 sm:p-10 flex flex-col justify-between rounded-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  ANALYTICS SENSOR 03
                </span>
                <span className="font-mono text-xs text-[#00ff66]">HEALTH GRADE A</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Battery Health & Wear
              </h3>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Evaluates physical chemical capacity degradation using accumulated Coulomb integration over full charging cycles.
              </p>
            </div>

            <div className="my-8 p-6 bg-[#08090d] border border-white/5 rounded-sm space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="font-mono text-xs text-neutral-400">ESTIMATED CAPACITY</div>
                  <div className="font-display text-3xl font-bold text-white mt-0.5">
                    4,920 <span className="font-mono text-sm text-neutral-400">mAh</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-neutral-400">DESIGN CAPACITY</div>
                  <div className="font-display text-2xl font-semibold text-neutral-300 mt-0.5">
                    5,000 <span className="font-mono text-sm text-neutral-400">mAh</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <div className="flex justify-between font-mono text-xs mb-1">
                  <span className="text-neutral-400">State of Health (SoH)</span>
                  <span className="text-[#00ff66] font-semibold">98.4%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#00ff66] h-full" style={{ width: '98.4%' }} />
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex justify-between font-mono text-xs text-neutral-400">
                <span>Cycle Counter: <strong className="text-white">138 cycles</strong></span>
                <span>Chemistry: <strong className="text-white">Li-Polymer</strong></span>
              </div>
            </div>

            <div className="text-xs text-neutral-400 leading-relaxed">
              Recommended practice: Limiting charge to 80% increases cell cycle longevity by up to 300%.
            </div>
          </div>

          {/* Card 2: Thermal Management & Protocol Negotiation (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0c0e14] border border-white/10 p-8 sm:p-10 flex flex-col justify-between rounded-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  ANALYTICS SENSOR 04 & 05
                </span>
                <span className="font-mono text-xs text-neutral-400">THERMAL GUARD ACTIVE</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Thermal Throttling & Fast Charging Protocols
              </h3>
              <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                Excessive temperature during charging is the number-one cause of permanent capacity loss. Wattmeter monitors cell thermistors in real time and detects power protocol handshakes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
              {/* Temperature block */}
              <div className="p-5 bg-[#08090d] border border-white/5 rounded-sm">
                <div className="font-mono text-xs text-neutral-400">ANODE TEMPERATURE</div>
                <div className="font-display text-4xl font-extrabold text-white mt-1">
                  31.4 <span className="font-mono text-base text-[#00ff66]">°C</span>
                </div>
                <div className="font-mono text-[11px] text-neutral-400 mt-1">88.5 °F • Safe Zone (&lt; 40°C)</div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00ff66] h-full" style={{ width: '45%' }} />
                  </div>
                  <span className="font-mono text-[10px] text-neutral-400">OPTIMAL</span>
                </div>
              </div>

              {/* Protocol Negotiation block */}
              <div className="p-5 bg-[#08090d] border border-white/5 rounded-sm">
                <div className="font-mono text-xs text-neutral-400">DETECTED PROTOCOL</div>
                <div className="font-display text-2xl font-bold text-white mt-1">
                  USB-PD 3.0 PPS
                </div>
                <div className="font-mono text-[11px] text-[#00ff66] mt-1">Negotiated: 9.2V @ 5.2A</div>
                <div className="mt-4 text-[11px] font-mono text-neutral-400">
                  Programmable Power Supply dynamically steps voltage in 20mV increments.
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between text-xs font-mono text-neutral-400 gap-4">
              <span>THERMAL THROTTLE THRESHOLD: 45.0 °C</span>
              <span>INTERNAL RESISTANCE: 118 mΩ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
