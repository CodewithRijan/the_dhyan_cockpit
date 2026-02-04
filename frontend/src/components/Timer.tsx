
'use client';

import { Play, RotateCcw } from 'lucide-react';

interface TimerProps {
  minutes: number;
  seconds: number;
  isPlaying: boolean;
  onPlayClick: () => void;
  onRestartClick: () => void;
}

function Timer({
  minutes,
  seconds,
  isPlaying,
  onPlayClick,
  onRestartClick,
}: TimerProps) {
  const formatTime = (num: number): string => String(num).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Timer Label */}
      <div className="text-xs tracking-widest text-muted-foreground uppercase">
        Session Timer
      </div>

      {/* Timer Display */}
      <div className="text-8xl font-light text-foreground tracking-tight tabular-nums">
        {formatTime(minutes)}:{formatTime(seconds)}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 pt-4">
        {/* Play Button */}
        <button
          onClick={onPlayClick}
          className="flex items-center justify-center w-16 h-16 bg-accent hover:bg-orange-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <Play className="w-6 h-6 text-white fill-white" />
        </button>

        {/* Restart Button */}
        <button
          onClick={onRestartClick}
          className="flex items-center justify-center w-12 h-12 text-muted-foreground hover:text-foreground transition-colors duration-200"
          aria-label="Restart"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Timer;
