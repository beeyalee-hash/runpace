'use client';

import { useState, useEffect } from 'react';
import { Timer, TrendingUp, Zap, Target } from 'lucide-react';

interface SplitTime {
  distance: string;
  time: string;
  pace: string;
}

interface TrackSplit {
  distance: number;
  time: string;
  seconds: number;
}

export default function Home() {
  // Marathon Calculator State
  const [hours, setHours] = useState<string>('3');
  const [minutes, setMinutes] = useState<string>('30');
  const [seconds, setSeconds] = useState<string>('0');
  const [averagePace, setAveragePace] = useState<string>('');
  const [splitTimes, setSplitTimes] = useState<SplitTime[]>([]);

  // Track Calculator State
  const [trackTime, setTrackTime] = useState<string>('90');
  const [trackPace, setTrackPace] = useState<string>('');
  const [trackSplits, setTrackSplits] = useState<TrackSplit[]>([]);

  useEffect(() => {
    calculatePace();
  }, [hours, minutes, seconds]);

  useEffect(() => {
    calculateTrackPace();
  }, [trackTime]);

  const calculatePace = () => {
    const totalSeconds =
      (parseInt(hours) || 0) * 3600 +
      (parseInt(minutes) || 0) * 60 +
      (parseInt(seconds) || 0);

    if (totalSeconds === 0) {
      setAveragePace('');
      setSplitTimes([]);
      return;
    }

    const pacePerKmSeconds = totalSeconds / 42.195;
    const paceMinutes = Math.floor(pacePerKmSeconds / 60);
    const paceSeconds = Math.floor(pacePerKmSeconds % 60);
    setAveragePace(`${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`);

    const splits: SplitTime[] = [];
    const distances = [5, 10, 15, 20, 25, 30, 35, 40, 42.195];

    distances.forEach((distance) => {
      const splitSeconds = pacePerKmSeconds * distance;
      const h = Math.floor(splitSeconds / 3600);
      const m = Math.floor((splitSeconds % 3600) / 60);
      const s = Math.floor(splitSeconds % 60);

      const timeStr = `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      const distanceStr = distance === 42.195 ? 'Full' : `${distance}km`;

      splits.push({
        distance: distanceStr,
        time: timeStr,
        pace: `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`
      });
    });

    setSplitTimes(splits);
  };

  const calculateTrackPace = () => {
    const lapSeconds = parseInt(trackTime) || 0;

    if (lapSeconds === 0) {
      setTrackPace('');
      setTrackSplits([]);
      return;
    }

    const pacePerKmSeconds = (lapSeconds / 0.4);
    const paceMinutes = Math.floor(pacePerKmSeconds / 60);
    const paceSeconds = Math.floor(pacePerKmSeconds % 60);
    setTrackPace(`${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`);

    const splits: TrackSplit[] = [];
    const distances = [100, 200, 300, 400];

    distances.forEach((distance) => {
      const splitSeconds = (lapSeconds / 400) * distance;
      const s = Math.floor(splitSeconds);
      const ms = Math.floor((splitSeconds - s) * 10);

      splits.push({
        distance,
        time: `${s}.${ms}s`,
        seconds: splitSeconds
      });
    });

    setTrackSplits(splits);
  };

  const formatTime = (value: string, max: number): string => {
    const num = parseInt(value) || 0;
    return Math.min(num, max).toString();
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-[#ff6b35]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Zap className="w-7 h-7 text-[#ff6b35]" />
            <h1 className="text-3xl font-bold gradient-text">RunPace</h1>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Column 1: Marathon Section */}
          <div className="space-y-6">
            {/* Marathon Card */}
            <div className="rounded-2xl bg-[#141414] border border-[#ff6b35]/20 p-6 shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <Timer className="w-5 h-5 text-[#ff6b35]" />
                <h2 className="text-xl font-bold">Marathon Goal</h2>
              </div>

              {/* Time Inputs */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={hours}
                    onChange={(e) => setHours(formatTime(e.target.value, 9))}
                    className="w-16 h-16 text-2xl font-bold text-center bg-[#1a1a1a] border-2 border-[#ff6b35]/30 rounded-xl focus:border-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 tabular-nums"
                    min="0"
                    max="9"
                  />
                  <span className="text-[#a3a3a3] text-xs mt-2">H</span>
                </div>

                <span className="text-2xl font-bold text-[#ff6b35] mb-5">:</span>

                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={minutes}
                    onChange={(e) => setMinutes(formatTime(e.target.value, 59))}
                    className="w-16 h-16 text-2xl font-bold text-center bg-[#1a1a1a] border-2 border-[#ff6b35]/30 rounded-xl focus:border-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 tabular-nums"
                    min="0"
                    max="59"
                  />
                  <span className="text-[#a3a3a3] text-xs mt-2">M</span>
                </div>

                <span className="text-2xl font-bold text-[#ff6b35] mb-5">:</span>

                <div className="flex flex-col items-center">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={seconds}
                    onChange={(e) => setSeconds(formatTime(e.target.value, 59))}
                    className="w-16 h-16 text-2xl font-bold text-center bg-[#1a1a1a] border-2 border-[#ff6b35]/30 rounded-xl focus:border-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 tabular-nums"
                    min="0"
                    max="59"
                  />
                  <span className="text-[#a3a3a3] text-xs mt-2">S</span>
                </div>
              </div>

              {/* Average Pace Display - Enhanced Visibility */}
              {averagePace && (
                <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-xl p-6 text-center animate-fade-in">
                  <p className="text-black/80 text-sm font-bold mb-2">AVERAGE PACE</p>
                  <p className="text-5xl font-bold text-black tabular-nums tracking-tight">{averagePace}</p>
                  <p className="text-black/80 text-sm font-semibold mt-2">per kilometer</p>
                </div>
              )}
            </div>

            {/* Split Times Card */}
            {splitTimes.length > 0 && (
              <div className="rounded-2xl bg-[#141414] border border-[#ff6b35]/20 p-6 shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp className="w-5 h-5 text-[#ffd23f]" />
                  <h2 className="text-xl font-bold">Split Times</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {splitTimes.map((split, index) => (
                    <div
                      key={index}
                      className="bg-[#1a1a1a] rounded-xl p-5 border border-[#ff6b35]/20 hover:border-[#ff6b35]/50 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:scale-105 cursor-pointer group"
                    >
                      <div className="text-[#ffd23f] font-bold text-sm mb-2 text-center">
                        {split.distance}
                      </div>
                      <div className="text-2xl font-bold text-center group-hover:text-[#ff6b35] transition-colors tabular-nums">
                        {split.time}
                      </div>
                      <div className="mt-3 h-1.5 bg-[#0a0a0a] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] transition-all duration-1000"
                          style={{
                            width: `${((index + 1) / splitTimes.length) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Track Section */}
          <div className="space-y-6">
            {/* Track Input Card */}
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

              {/* Track Pace Display - Enhanced Visibility */}
              {trackPace && (
                <div className="bg-gradient-to-r from-[#ffd23f] to-[#ff6b35] rounded-xl p-6 text-center animate-fade-in">
                  <p className="text-black/80 text-sm font-bold mb-2">TARGET PACE</p>
                  <p className="text-5xl font-bold text-black tabular-nums tracking-tight">{trackPace}</p>
                  <p className="text-black/80 text-sm font-semibold mt-2">per kilometer</p>
                </div>
              )}
            </div>

            {/* Track Visualization Card */}
            {trackSplits.length > 0 && (
              <div className="rounded-2xl bg-[#141414] border border-[#ffd23f]/20 p-6 shadow-[0_0_15px_rgba(255,210,63,0.1)] hover:shadow-[0_0_25px_rgba(255,210,63,0.2)] transition-all duration-300">
                <h3 className="text-lg font-bold mb-4 text-center">Track Visualization</h3>

                <svg viewBox="0 0 500 300" className="w-full h-auto">
                  <defs>
                    {/* Gradients */}
                    <linearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff6b35" />
                      <stop offset="50%" stopColor="#ffd23f" />
                      <stop offset="100%" stopColor="#ff6b35" />
                    </linearGradient>

                    {/* Segment Highlights */}
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

                  {/* Standard Track Shape (Rounded Rectangle) */}
                  {/* Track Background */}
                  <rect x="50" y="50" width="400" height="200" rx="100" ry="100"
                    fill="none" stroke="#1a1a1a" strokeWidth="40" />

                  {/* Track Outline */}
                  <rect x="50" y="50" width="400" height="200" rx="100" ry="100"
                    fill="none" stroke="url(#trackGradient)" strokeWidth="3" />

                  {/* 100m Segments with Highlights */}
                  {/* Segment 1: 0-100m (Right Straight) */}
                  <rect x="250" y="70" width="180" height="40" fill="url(#segment1)" rx="5" />

                  {/* Segment 2: 100-200m (Top Curve) */}
                  <path d="M 430 110 Q 450 110, 450 150 Q 450 190, 430 190"
                    fill="url(#segment2)" opacity="0.5" />

                  {/* Segment 3: 200-300m (Left Straight) */}
                  <rect x="70" y="190" width="180" height="40" fill="url(#segment3)" rx="5" />

                  {/* Segment 4: 300-400m (Bottom Curve) */}
                  <path d="M 70 190 Q 50 190, 50 150 Q 50 110, 70 110"
                    fill="url(#segment4)" opacity="0.5" />

                  {/* Lane Lines */}
                  <line x1="250" y1="70" x2="250" y2="230" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="5,5" />

                  {/* Start/Finish Line (Bottom Right) */}
                  <g>
                    <rect x="245" y="225" width="10" height="30" fill="#10b981" />
                    <text x="250" y="270" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">
                      START/FINISH
                    </text>
                    <text x="250" y="285" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold" className="tabular-nums">
                      0m / 400m: {trackSplits[3]?.time}
                    </text>
                  </g>

                  {/* 100m Marker (Top Right) */}
                  <g>
                    <circle cx="430" cy="90" r="8" fill="#ffd23f" />
                    <rect x="380" y="60" width="100" height="40" fill="#1a1a1a" fillOpacity="0.8" rx="5" />
                    <text x="430" y="75" textAnchor="middle" fill="#ffd23f" fontSize="13" fontWeight="bold">
                      100m
                    </text>
                    <text x="430" y="90" textAnchor="middle" fill="#ffd23f" fontSize="16" fontWeight="bold" className="tabular-nums">
                      {trackSplits[0]?.time}
                    </text>
                  </g>

                  {/* 200m Marker (Top Left) */}
                  <g>
                    <circle cx="70" cy="90" r="8" fill="#ff6b35" />
                    <rect x="20" y="60" width="100" height="40" fill="#1a1a1a" fillOpacity="0.8" rx="5" />
                    <text x="70" y="75" textAnchor="middle" fill="#ff6b35" fontSize="13" fontWeight="bold">
                      200m
                    </text>
                    <text x="70" y="90" textAnchor="middle" fill="#ff6b35" fontSize="16" fontWeight="bold" className="tabular-nums">
                      {trackSplits[1]?.time}
                    </text>
                  </g>

                  {/* 300m Marker (Bottom Left) */}
                  <g>
                    <circle cx="70" cy="210" r="8" fill="#a855f7" />
                    <rect x="20" y="200" width="100" height="40" fill="#1a1a1a" fillOpacity="0.8" rx="5" />
                    <text x="70" y="215" textAnchor="middle" fill="#a855f7" fontSize="13" fontWeight="bold">
                      300m
                    </text>
                    <text x="70" y="230" textAnchor="middle" fill="#a855f7" fontSize="16" fontWeight="bold" className="tabular-nums">
                      {trackSplits[2]?.time}
                    </text>
                  </g>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-[#a3a3a3] text-sm">
        <p className="font-semibold">RunningBK, Run Together~!! 🏃‍♂️</p>
      </footer>
    </main>
  );
}
