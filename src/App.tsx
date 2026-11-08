/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductShowcase } from './components/ProductShowcase';
import { BatterySimulator } from './components/BatterySimulator';
import { FeaturesSection } from './components/FeaturesSection';
import { OpenSourceSection } from './components/OpenSourceSection';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans selection:bg-[#00ff66] selection:text-black">
      {/* Top Fixed Typography Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 1: Hero with 3D Smartphone and Direct Download */}
        <HeroSection />

        {/* Section 2: Large Asymmetric Product Showcase */}
        <ProductShowcase />

        {/* Section 3: Interactive Live Telemetry Lab */}
        <BatterySimulator />

        {/* Section 4: Deep Feature Breakdown */}
        <FeaturesSection />

        {/* Section 5: Built in the Open / Open Source Philosophy */}
        <OpenSourceSection />

        {/* Section 6: Direct Download & Installation Checksums */}
        <DownloadSection />
      </main>

      {/* Typography-Only Footer */}
      <Footer />
    </div>
  );
}
