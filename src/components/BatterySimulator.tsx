import React, { useState } from 'react';

export const BatterySimulator: React.FC = () => {
  const [mode, setMode] = useState<'charging' | 'discharging'>('charging');
  const [wattageInput, setWattageInput] = useState<number>(45);
  const [batteryLevel, setBatteryLevel] = useState<number>(68);
  const [ambientTemp, setAmbientTemp] = useState<number>(24);

  // Calculated values
  const cellVoltageMv = mode === 'charging' 
    ? 3800 + (batteryLevel / 100) * 550
    : 4200 - ((100 - batteryLevel) / 100) * 600;

  const currentMa = Math.round(((wattageInput * (mode === 'charging' ? 1 : -1)) / (cellVoltageMv / 1000)) * 1000);
  
  // Heat dissipation estimate
  const internalResistanceOhm = 0.12;
  const iSquaredRWatts = Math.pow(Math.abs(currentMa) / 1000, 2) * internalResistanceOhm;
  const estimatedTempC = Math.min(52, ambientTemp + iSquaredRWatts * 4.5 + (wattageInput > 30 ? 5 : 0));
  const isThermalThrottling = estimatedTempC >= 42;

  // Time estimate
  const remainingMah = mode === 'charging' 
    ? (5000 * (100 - batteryLevel)) / 100 
    : (5000 * batteryLevel) / 100;
  
  const hoursLeft = Math.abs(currentMa) > 50 ? remainingMah / Math.abs(currentMa) : 99;
  const minutesLeft = Math.round(hoursLeft * 60);

  return (
    <section id="simulator" className="py-24 border-t border-white/[0.08] bg-[#08090e] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-[#00ff66]">
            INTERACTIVE HARDWARE LAB
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-white">
            Simulate Your Battery Dynamics.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 font-normal">
            Adjust wattage, charge states, and thermal environments to see how Wattmeter calculates real-time current flow, internal resistance heat dissipation, and charging curves.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel (5 cols) */}
          <div className="lg:col-span-5 bg-[#0c0e14] border border-white/10 p-6 sm:p-8 rounded-sm space-y-6">
            {/* Mode Toggle */}
            <div>
              <label className="font-mono text-xs text-neutral-400 uppercase tracking-widest block mb-2">
                OPERATIONAL STATE
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMode('charging');
                    setWattageInput(45);
                  }}
                  className={`py-2.5 px-4 text-xs font-mono font-semibold uppercase tracking-wider rounded-sm transition-all border ${
                    mode === 'charging'
                      ? 'bg-[#00ff66] text-black border-[#00ff66]'
                      : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white'
                  }`}
                >
                  ⚡ Charging
                </button>
                <button
                  onClick={() => {
                    setMode('discharging');
                    setWattageInput(12);
                  }}
                  className={`py-2.5 px-4 text-xs font-mono font-semibold uppercase tracking-wider rounded-sm transition-all border ${
                    mode === 'discharging'
                      ? 'bg-[#00ff66] text-black border-[#00ff66]'
                      : 'bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white'
                  }`}
                >
                  🔋 Discharging
                </button>
              </div>
            </div>

            {/* Wattage Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="text-neutral-400 uppercase tracking-wider">
                  {mode === 'charging' ? 'CHARGER INPUT POWER' : 'DEVICE WORKLOAD POWER'}
                </span>
                <span className="text-white font-bold text-sm">{wattageInput} W</span>
              </div>
              <input
                type="range"
                min={mode === 'charging' ? 5 : 1}
                max={mode === 'charging' ? 120 : 25}
                step={mode === 'charging' ? 1 : 0.5}
                value={wattageInput}
                onChange={(e) => setWattageInput(parseFloat(e.target.value))}
                className="w-full accent-[#00ff66] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>{mode === 'charging' ? '5W (USB 2.0)' : '1W (Audio playback)'}</span>
                <span>{mode === 'charging' ? '65W (PD PPS)' : '10W (120Hz Video)'}</span>
                <span>{mode === 'charging' ? '120W (HyperCharge)' : '25W (Max AnTuTu)'}</span>
              </div>
            </div>

            {/* Battery Level Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="text-neutral-400 uppercase tracking-wider">CURRENT CHARGE LEVEL</span>
                <span className="text-white font-bold text-sm">{batteryLevel}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={batteryLevel}
                onChange={(e) => setBatteryLevel(parseInt(e.target.value))}
                className="w-full accent-[#00ff66] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>0% Empty</span>
                <span>50%</span>
                <span>100% Saturated</span>
              </div>
            </div>

            {/* Ambient Temperature Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center font-mono text-xs">
                <span className="text-neutral-400 uppercase tracking-wider">AMBIENT ENVIRONMENT</span>
                <span className="text-white font-bold text-sm">{ambientTemp} °C</span>
              </div>
              <input
                type="range"
                min="15"
                max="40"
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(parseInt(e.target.value))}
                className="w-full accent-[#00ff66] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                <span>15°C (AC Room)</span>
                <span>25°C (Standard)</span>
                <span>40°C (Direct Sunlight)</span>
              </div>
            </div>
          </div>

          {/* Results Telemetry Screen (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c0e14] border border-white/10 p-6 sm:p-8 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                SIMULATED WATTMETER TELEMETRY
              </span>
              <span
                className={`font-mono text-xs px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                  isThermalThrottling
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-[#00ff66]/10 text-[#00ff66] border border-[#00ff66]/30'
                }`}
              >
                {isThermalThrottling ? '⚠ THERMAL THROTTLING RISK' : '✓ SAFE OPERATING MARGIN'}
              </span>
            </div>

            {/* Big Readouts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#08090d] border border-white/5 p-4 rounded-sm">
                <div className="font-mono text-[10px] text-neutral-400 uppercase">CALCULATED CURRENT</div>
                <div className="font-display text-2xl sm:text-3xl font-black text-[#00ff66] mt-1">
                  {currentMa > 0 ? `+${currentMa}` : currentMa} <span className="text-xs font-mono text-white">mA</span>
                </div>
              </div>

              <div className="bg-[#08090d] border border-white/5 p-4 rounded-sm">
                <div className="font-mono text-[10px] text-neutral-400 uppercase">CELL POTENTIAL</div>
                <div className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
                  {cellVoltageMv.toFixed(0)} <span className="text-xs font-mono text-neutral-400">mV</span>
                </div>
              </div>

              <div className="bg-[#08090d] border border-white/5 p-4 rounded-sm">
                <div className="font-mono text-[10px] text-neutral-400 uppercase">ESTIMATED CELL TEMP</div>
                <div
                  className={`font-display text-2xl sm:text-3xl font-black mt-1 ${
                    isThermalThrottling ? 'text-amber-400' : 'text-white'
                  }`}
                >
                  {estimatedTempC.toFixed(1)} <span className="text-xs font-mono text-neutral-400">°C</span>
                </div>
              </div>

              <div className="bg-[#08090d] border border-white/5 p-4 rounded-sm">
                <div className="font-mono text-[10px] text-neutral-400 uppercase">
                  {mode === 'charging' ? 'TIME TO FULL' : 'TIME TO DRAIN'}
                </div>
                <div className="font-display text-2xl sm:text-3xl font-black text-white mt-1">
                  {minutesLeft > 60
                    ? `${Math.floor(minutesLeft / 60)}h ${minutesLeft % 60}m`
                    : `${minutesLeft} min`}
                </div>
              </div>
            </div>

            {/* Explanation box */}
            <div className="p-5 bg-[#08090d] border border-white/5 rounded-sm font-mono text-xs text-neutral-300 space-y-2">
              <div className="text-neutral-400 uppercase tracking-wider text-[11px]">
                DIAGNOSTIC ANALYSIS LOG:
              </div>
              <p>
                • Cell voltage curve estimated at <strong className="text-white">{cellVoltageMv.toFixed(0)} mV</strong> for a nominal 5000 mAh Li-ion pouch cell.
              </p>
              <p>
                • Internal resistance (120 mΩ) generates <strong className="text-white">~{iSquaredRWatts.toFixed(2)} W</strong> Joule heat dissipation.
              </p>
              {isThermalThrottling ? (
                <p className="text-amber-400">
                  • ⚠ Alert: Temperature exceeds 42°C. Wattmeter recommends capping charging speed to prevent dendrite growth and SEI layer degradation.
                </p>
              ) : (
                <p className="text-[#00ff66]">
                  • ✓ Cell operates safely inside manufacturer electrochemical window. Cycle lifespan degradation index is minimal.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
