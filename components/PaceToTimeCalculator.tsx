'use client';

import { useState } from 'react';
import { Clock } from 'lucide-react';
import { formatDuration } from '@/lib/paceUtils';

export default function PaceToTimeCalculator() {
  const [paceMinutes, setPaceMinutes] = useState<string>('5');
  const [paceSeconds, setPaceSeconds] = useState<string>('00');
  const [distance, setDistance] = useState<string>('10');
  const pM = parseInt(paceMinutes) || 0;
  const pS = parseInt(paceSeconds) || 0;
  const dist = parseFloat(distance) || 0;
  const resultTime =
    dist === 0 || (pM === 0 && pS === 0)
      ? ''
      : formatDuration((pM * 60 + pS) * dist);

  const setStandardDistance = (d: number) => {
    setDistance(d.toString());
  };

  return (
    <div className="rounded-2xl bg-[#141414] border border-[#a855f7]/20 p-6 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.2)] transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#a855f7]" />
          <h2 className="text-xl font-bold">Pace to Time</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setStandardDistance(5)}
            className="px-2 py-1 text-xs font-bold bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/30 rounded-md hover:bg-[#a855f7] hover:text-white transition-colors"
          >
            5K
          </button>
          <button 
            onClick={() => setStandardDistance(10)}
            className="px-2 py-1 text-xs font-bold bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/30 rounded-md hover:bg-[#a855f7] hover:text-white transition-colors"
          >
            10K
          </button>
          <button 
            onClick={() => setStandardDistance(21.0975)}
            className="px-2 py-1 text-xs font-bold bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/30 rounded-md hover:bg-[#a855f7] hover:text-white transition-colors"
          >
            Half
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#a3a3a3] uppercase tracking-wider">Target Pace (min/km)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={paceMinutes}
              onChange={(e) => setPaceMinutes(e.target.value)}
              className="w-full h-12 text-xl font-bold text-center bg-[#1a1a1a] border-2 border-[#a855f7]/30 rounded-xl focus:border-[#a855f7] focus:outline-none transition-all tabular-nums"
              placeholder="5"
            />
            <span className="text-xl font-bold text-[#a855f7]">:</span>
            <input
              type="number"
              value={paceSeconds}
              onChange={(e) => setPaceSeconds(e.target.value)}
              className="w-full h-12 text-xl font-bold text-center bg-[#1a1a1a] border-2 border-[#a855f7]/30 rounded-xl focus:border-[#a855f7] focus:outline-none transition-all tabular-nums"
              placeholder="00"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#a3a3a3] uppercase tracking-wider">Distance (km)</label>
          <input
            type="number"
            step="0.001"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full h-12 text-xl font-bold text-center bg-[#1a1a1a] border-2 border-[#a855f7]/30 rounded-xl focus:border-[#a855f7] focus:outline-none transition-all tabular-nums"
            placeholder="10"
          />
        </div>
      </div>

      {resultTime && (
        <div className="bg-gradient-to-r from-[#a855f7] to-[#ff6b35] rounded-xl p-6 text-center animate-fade-in shadow-lg">
          <p className="text-white/80 text-sm font-bold mb-1">EXPECTED FINISH TIME</p>
          <p className="text-5xl font-bold text-white tabular-nums tracking-tighter">{resultTime}</p>
          <p className="text-white/80 text-sm font-semibold mt-1">based on {paceMinutes}:{paceSeconds.toString().padStart(2, '0')}/km pace</p>
        </div>
      )}
    </div>
  );
}
