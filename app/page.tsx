'use client';

import { Zap } from 'lucide-react';
import MarathonCalculator from '@/components/MarathonCalculator';
import TrackCalculator from '@/components/TrackCalculator';
import PaceToTimeCalculator from '@/components/PaceToTimeCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <Zap className="w-8 h-8 text-[#ff6b35] relative z-10" />
                <div className="absolute inset-0 bg-[#ff6b35] blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              </div>
              <h1 className="text-3xl font-black tracking-tighter gradient-text italic">RUNPACE</h1>
            </div>
            <div className="hidden sm:block text-[#a3a3a3] text-sm font-medium tracking-widest uppercase">
              Precision Pacing for Athletes
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Main Calculators */}
          <div className="space-y-8">
            <MarathonCalculator />
          </div>

          {/* Secondary Calculators */}
          <div className="space-y-8">
            <PaceToTimeCalculator />
            <TrackCalculator />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center gap-4">
          <p className="font-bold text-[#a3a3a3] flex items-center gap-2">
            RunningBK <span className="text-[#ff6b35]">|</span> Run Together~!! <span className="animate-bounce">🏃‍♂️</span>
          </p>
          <p className="text-[#525252] text-xs">
            © {new Date().getFullYear()} RunPace. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
