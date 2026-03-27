export interface SplitTime {
  distance: string;
  time: string;
  pace: string;
}

export interface TrackSplit {
  distance: number;
  time: string;
  seconds: number;
}

/**
 * Converts hours, minutes, and seconds to total seconds.
 */
export const toTotalSeconds = (h: string | number, m: string | number, s: string | number): number => {
  return (Number(h) || 0) * 3600 + (Number(m) || 0) * 60 + (Number(s) || 0);
};

/**
 * Formats total seconds into H:MM:SS or MM:SS string.
 */
export const formatDuration = (totalSeconds: number, includeHours = true): string => {
  const roundedSeconds = Math.round(totalSeconds);
  const h = Math.floor(roundedSeconds / 3600);
  const m = Math.floor((roundedSeconds % 3600) / 60);
  const s = roundedSeconds % 60;

  if (includeHours || h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
};

/**
 * Calculates average pace (MM:SS per km) from total seconds and distance.
 */
export const calculateAveragePace = (totalSeconds: number, distanceKm: number): string => {
  if (totalSeconds === 0 || distanceKm === 0) return '';
  const pacePerKmSeconds = totalSeconds / distanceKm;
  const m = Math.floor(pacePerKmSeconds / 60);
  const s = Math.round(pacePerKmSeconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

/**
 * Generates splits for marathon distances.
 */
export const generateMarathonSplits = (totalSeconds: number): SplitTime[] => {
  if (totalSeconds === 0) return [];
  
  const distanceFull = 42.195;
  const pacePerKmSeconds = totalSeconds / distanceFull;
  const paceStr = calculateAveragePace(totalSeconds, distanceFull);
  
  const distances = [5, 10, 15, 20, 25, 30, 35, 40, 42.195];
  
  return distances.map((distance) => {
    const splitSeconds = pacePerKmSeconds * distance;
    const distanceStr = distance === 42.195 ? 'Full' : `${distance}km`;
    
    return {
      distance: distanceStr,
      time: formatDuration(splitSeconds),
      pace: paceStr,
    };
  });
};

/**
 * Calculates track splits for a given lap time (400m).
 */
export const calculateTrackSplits = (lapSeconds: number): { pace: string; splits: TrackSplit[] } => {
  if (lapSeconds === 0) return { pace: '', splits: [] };

  const pacePerKmSeconds = lapSeconds / 0.4;
  const paceMinutes = Math.floor(pacePerKmSeconds / 60);
  const paceSeconds = Math.round(pacePerKmSeconds % 60);
  const paceStr = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;

  const distances = [100, 200, 300, 400];
  const splits = distances.map((distance) => {
    const splitSeconds = (lapSeconds / 400) * distance;
    const s = Math.floor(splitSeconds);
    const ms = Math.round((splitSeconds - s) * 10);

    return {
      distance,
      time: `${s}.${ms}s`,
      seconds: splitSeconds,
    };
  });

  return { pace: paceStr, splits };
};
