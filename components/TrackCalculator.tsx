'use client';

import { useState } from 'react';
import { Target } from 'lucide-react';
import { calculateTrackSplits, TrackSplit } from '@/lib/paceUtils';

export default function TrackCalculator() {
  const [trackTime, setTrackTime] = useState<string>('90');
  const { pace: trackPace, splits: trackSplits }: { pace: string; splits: TrackSplit[] } =
    calculateTrackSplits(Number(trackTime));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#141414] border border-[#ffd23f]/20 p-6 shadow-[0_0_15px_rgba(255,210,63,0.1)] hover:shadow-[0_0_25px_rgba(255,210,63,0.2)] transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-5 h-5 text-[#ffd23f]" />
          <h2 className="text-xl font-bold">400m Track Training</h2>
        </div>

        <div className="flex items-center gap-3 mb-6 justify-center">
          <input
            type="number"
            inputMode="numeric"
            value={trackTime}
            onChange={(e) => setTrackTime(e.target.value)}
            className="w-28 h-20 text-3xl font-bold text-center bg-[#1a1a1a] border-2 border-[#ffd23f]/30 rounded-xl focus:border-[#ffd23f] focus:outline-none focus:ring-2 focus:ring-[#ffd23f]/20 transition-all duration-300 tabular-nums"
            min="0"
            placeholder="90"
          />
          <span className="text-xl text-[#a3a3a3]">seconds</span>
        </div>

        {trackPace && (
          <div className="bg-gradient-to-r from-[#ffd23f] to-[#ff6b35] rounded-xl p-6 text-center animate-fade-in shadow-lg">
            <p className="text-black/80 text-sm font-bold mb-1">TARGET PACE</p>
            <p className="text-5xl font-bold text-black tabular-nums tracking-tighter">{trackPace}</p>
            <p className="text-black/80 text-sm font-semibold mt-1">per kilometer</p>
          </div>
        )}
      </div>

      {trackSplits.length > 0 && (
        <div className="rounded-2xl bg-[#141414] border border-[#ffd23f]/20 p-6 shadow-[0_0_15px_rgba(255,210,63,0.1)] hover:shadow-[0_0_25px_rgba(255,210,63,0.2)] transition-all duration-300">
          <h3 className="text-lg font-bold mb-4 text-center">Track Visualization</h3>

          <svg viewBox="0 0 500 300" className="w-full h-auto drop-shadow-2xl">
            <defs>
              <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="50%" stopColor="#ffd23f" />
                <stop offset="100%" stopColor="#ff6b35" />
              </linearGradient>

              <linearGradient id="segment1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="segment2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffd23f" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffd23f" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="segment3" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="segment4" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            <rect x="50" y="50" width="400" height="200" rx="100" ry="100"
              fill="none" stroke="#1a1a1a" strokeWidth="40" />

            <rect x="50" y="50" width="400" height="200" rx="100" ry="100"
              fill="none" stroke="url(#trackGradient)" strokeWidth="3" />

            <rect x="250" y="70" width="180" height="40" fill="url(#segment1)" rx="5" />
            <path d="M 430 110 Q 450 110, 450 150 Q 450 190, 430 190"
              fill="url(#segment2)" opacity="0.5" />
            <rect x="70" y="190" width="180" height="40" fill="url(#segment3)" rx="5" />
            <path d="M 70 190 Q 50 190, 50 150 Q 50 110, 70 110"
              fill="url(#segment4)" opacity="0.5" />

            <line x1="250" y1="70" x2="250" y2="230" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.1" strokeDasharray="5,5" />

            <g>
              <rect x="245" y="225" width="10" height="30" fill="#10b981" rx="2" />
              <text x="250" y="270" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">
                START/FINISH
              </text>
              <text x="250" y="285" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" className="tabular-nums">
                400m: {trackSplits[3]?.time}
              </text>
            </g>

            <g>
              <circle cx="430" cy="90" r="8" fill="#ffd23f" className="animate-pulse" />
              <rect x="380" y="45" width="100" height="45" fill="#1a1a1a" fillOpacity="0.8" rx="8" />
              <text x="430" y="62" textAnchor="middle" fill="#ffd23f" fontSize="12" fontWeight="bold">
                100m
              </text>
              <text x="430" y="82" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold" className="tabular-nums">
                {trackSplits[0]?.time}
              </text>
            </g>

            <g>
              <circle cx="70" cy="90" r="8" fill="#ff6b35" className="animate-pulse" />
              <rect x="20" y="45" width="100" height="45" fill="#1a1a1a" fillOpacity="0.8" rx="8" />
              <text x="70" y="62" textAnchor="middle" fill="#ff6b35" fontSize="12" fontWeight="bold">
                200m
              </text>
              <text x="70" y="82" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold" className="tabular-nums">
                {trackSplits[1]?.time}
              </text>
            </g>

            <g>
              <circle cx="70" cy="210" r="8" fill="#a855f7" className="animate-pulse" />
              <rect x="20" y="215" width="100" height="45" fill="#1a1a1a" fillOpacity="0.8" rx="8" />
              <text x="70" y="232" textAnchor="middle" fill="#a855f7" fontSize="12" fontWeight="bold">
                300m
              </text>
              <text x="70" y="252" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold" className="tabular-nums">
                {trackSplits[2]?.time}
              </text>
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
