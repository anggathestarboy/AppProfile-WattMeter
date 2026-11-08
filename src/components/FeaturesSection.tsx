import React from 'react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      code: 'SYS_NODE_01',
      title: 'Direct Kernel Telemetry',
      description:
        'Reads raw micro-amperes directly from Linux kernel power supply sysfs nodes without intermediary OEM translation layers or lag.',
      specs: ['/sys/class/power_supply/battery', '1000ms sampling cycle', '±1mA precision'],
    },
    {
      code: 'COULOMB_02',
      title: 'Coulomb Counter Degradation',
      description:
        'Calculates real physical battery health by integrating amp-second charge throughput over time rather than trusting vendor hardcoded health flags.',
      specs: ['Full charge cycle tracking', 'Milliamphour (mAh) delta', 'Chemical health %'],
    },
    {
      code: 'THERMAL_03',
      title: 'Dual Thermistor Guard',
      description:
        'Continuous temperature tracking of battery cells and charging ICs with configurable acoustic alerts when approaching critical 42°C thresholds.',
      specs: ['0.1°C resolution', 'High-temp throttling alert', 'Sub-ambient chill alerts'],
    },
    {
      code: 'PROTOCOL_04',
      title: 'Protocol Handshake Sniffer',
      description:
        'Identifies exact fast-charging protocols including USB-PD 3.0 PPS, Qualcomm Quick Charge 4+, VOOC/Dart, and Samsung Super Fast Charging.',
      specs: ['Voltage step detection (20mV)', 'PPS negotiation log', 'Cable resistance check'],
    },
    {
      code: 'ALARM_05',
      title: '80% Lifespan Protection Alarm',
      description:
        'Stops battery stress at 80% state of charge (SoC). Alerts you to unplug and triples Li-ion anode longevity by eliminating voltage saturation strain.',
      specs: ['Customizable threshold', 'Vibration & tone profiles', 'Notification channel'],
    },
    {
      code: 'DAEMON_06',
      title: 'Ultra-Lean Daemon Architecture',
      description:
        'Runs as an ultra-lightweight foreground service consuming less than 12MB RAM and &lt;0.08% battery per 24 hours. Zero network permission requested.',
      specs: ['No INTERNET permission in manifest', 'GPLv3 Open Source', 'Offline & Private'],
    },
  ];

  return (
    <section id="features" className="py-28 border-t border-white/[0.08] bg-[#07080c] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00ff66]">
            CAPABILITIES & ARCHITECTURE
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-white">
            Everything About Your Battery.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed">
            Engineered from scratch for transparency, privacy, and technical rigor. No ads, no tracking SDKs, no bloatware.
          </p>
        </div>

        {/* Feature Grid: Clean Industrial Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => (
            <div
              key={feat.code}
              className="bg-[#0b0d13] border border-white/10 hover:border-[#00ff66]/40 p-8 rounded-sm transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] text-[#00ff66] tracking-widest uppercase">
                    {feat.code}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-[#00ff66] transition-colors" />
                </div>
                <h3 className="font-display text-xl font-bold text-white group-hover:text-[#00ff66] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.06] space-y-1.5 font-mono text-[11px] text-neutral-400">
                {feat.specs.map((spec, sidx) => (
                  <div key={sidx} className="flex items-center gap-2">
                    <span className="text-[#00ff66]">›</span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
