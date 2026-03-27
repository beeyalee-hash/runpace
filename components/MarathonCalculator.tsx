'use client';

import { useState } from 'react';
import { Timer, TrendingUp } from 'lucide-react';
import { toTotalSeconds, generateMarathonSplits, calculateAveragePace, SplitTime } from '@/lib/paceUtils';

export default function MarathonCalculator() {
  const [hours, setHours] = useState<string>('3');
  const [minutes, setMinutes] = useState<string>('30');
  const [seconds, setSeconds] = useState<string>('0');
  const totalSeconds = toTotalSeconds(hours, minutes, seconds);
  const averagePace = totalSeconds === 0 ? '' : calculateAveragePace(totalSeconds, 42.195);
  const splitTimes: SplitTime[] = totalSeconds === 0 ? [] : generateMarathonSplits(totalSeconds);

  const formatTimeInput = (value: string, max: number): string => {
    const num = parseInt(value) || 0;
    return Math.min(num, max).toString();
  };

  const setGoalTime = (h: number, m: number, s: number) => {
    setHours(h.toString());
    setMinutes(m.toString());
    setSeconds(s.toString());
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-[#141414] border border-[#ff6b35]/20 p-6 shadow-[0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[0_0_25px_rgba(249,115,22,0.2)] transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Timer className="w-5 h-5 text-[#ff6b35]" />
            <h2 className="text-xl font-bold">Marathon Goal</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setGoalTime(2, 59, 59)}
              className="px-2 py-1 text-xs font-bold bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/30 rounded-md hover:bg-[#ff6b35] hover:text-black transition-colors"
            >
              Sub-3
            </button>
            <button 
              onClick={() => setGoalTime(3, 30, 0)}
              className="px-2 py-1 text-xs font-bold bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/30 rounded-md hover:bg-[#ff6b35] hover:text-black transition-colors"
            >
              3:30
            </button>
            <button 
              onClick={() => setGoalTime(4, 0, 0)}
              className="px-2 py-1 text-xs font-bold bg-[#ff6b35]/10 text-[#ff6b35] border border-[#ff6b35]/30 rounded-md hover:bg-[#ff6b35] hover:text-black transition-colors"
            >
              4:00
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex flex-col items-center">
            <input
              type="number"
              inputMode="numeric"
              value={hours}
              onChange={(e) => setHours(formatTimeInput(e.target.value, 9))}
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
              onChange={(e) => setMinutes(formatTimeInput(e.target.value, 59))}
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
              onChange={(e) => setSeconds(formatTimeInput(e.target.value, 59))}
              className="w-16 h-16 text-2xl font-bold text-center bg-[#1a1a1a] border-2 border-[#ff6b35]/30 rounded-xl focus:border-[#ff6b35] focus:outline-none focus:ring-2 focus:ring-[#ff6b35]/20 transition-all duration-300 tabular-nums"
              min="0"
              max="59"
            />
            <span className="text-[#a3a3a3] text-xs mt-2">S</span>
          </div>
        </div>

        {averagePace && (
          <div className="bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] rounded-xl p-6 text-center animate-fade-in shadow-lg">
            <p className="text-black/80 text-sm font-bold mb-1">AVERAGE PACE</p>
            <p className="text-5xl font-bold text-black tabular-nums tracking-tighter">{averagePace}</p>
            <p className="text-black/80 text-sm font-semibold mt-1">per kilometer</p>
          </div>
        )}
      </div>

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
                className="bg-[#1a1a1a] rounded-xl p-4 border border-[#ff6b35]/20 hover:border-[#ff6b35]/50 hover:bg-[#1a1a1a]/80 transition-all duration-300 hover:scale-[1.02] cursor-default group"
              >
                <div className="text-[#ffd23f] font-bold text-sm mb-1 text-center">
                  {split.distance}
                </div>
                <div className="text-2xl font-bold text-center group-hover:text-[#ff6b35] transition-colors tabular-nums">
                  {split.time}
                </div>
                <div className="mt-2 h-1 bg-[#0a0a0a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#ff6b35] to-[#ffd23f] transition-all duration-700 ease-out"
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
  );
}
