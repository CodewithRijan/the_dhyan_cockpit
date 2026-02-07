
'use client';

import type { timer } from '@/types';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface TimerProps {
  timer: {
    minutes: number,
    seconds: number
  };
}

function Timer({
  timer,
}: TimerProps) {


  const [localTimer, setLocalTimer] = useState<timer>({
    minutes: timer.minutes,
    seconds: timer.seconds,
    timer_status: "not_started"
  });

  const [intervalId, setIntervalId] = useState<number>(0);


  const formatTime = (num: number): string => String(num).padStart(2, '0');

  const onPlayClick = () => {


    setLocalTimer((prevTimer) => {
      return {
        ...prevTimer,
        timer_status: "playing"
      }
    });

    let id = startIntervalHelperFunction();
    setIntervalId(id);

  }

  const startIntervalHelperFunction = () => {

    return setInterval(() => {


      // Logic for the timer here...

      setLocalTimer((prevTimer) => {

        if (prevTimer.seconds > 0) {
          return {
            ...prevTimer,
            seconds: prevTimer.seconds - 1
          }
        } else {
          return {
            ...prevTimer,
            minutes: prevTimer.minutes - 1,
            seconds: 59,
          }
        }

      });
    }, 1000);

  }


  useEffect(() => {

    console.log(`Timer.tsx re-rendered!!! with minutes data ${timer.minutes} and seconds: ${timer.seconds}`);

    if (localTimer.timer_status === "not_started") {
      clearInterval(intervalId);
    }

    if (localTimer.minutes == 0 && localTimer.seconds == 0) {

      console.log("Session Completed succesfully!");

      toast.success("Session Commpleted succesfully!", { position: "top-right" });

      clearInterval(intervalId);

      setLocalTimer((prevTimer) => {
        return {
          minutes: timer.minutes,
          seconds: timer.seconds,
          timer_status: "not_started"
        }
      })
    }

  });

  useEffect(() => {
    setLocalTimer({
      minutes: timer.minutes,
      seconds: timer.seconds,
      timer_status: "not_started"
    });
  }, [timer]);


  const onRestartClick = () => {

    clearInterval(intervalId);

    setLocalTimer({
      ...localTimer,
      minutes: timer.minutes,
      seconds: timer.seconds,
      timer_status: "not_started"
    });

  }

  const handleEndTimer = () => {

    onRestartClick();

    toast.info("Session ended!!", { position: "top-right" });
  }

  const onPauseClick = () => {

    if (localTimer.timer_status === "playing") {
      console.log("Timer is paused right now...");
      clearInterval(intervalId);

      setLocalTimer((prevTimer) => {
        return {
          ...prevTimer,
          timer_status: "paused"
        }
      });

    }

    if (localTimer.timer_status === "paused") {

      console.log("Paused Timer has started playing again.");

      let id = startIntervalHelperFunction();
      setIntervalId(id);

      setLocalTimer((prevTimer) => {
        return {
          ...prevTimer,
          timer_status: "playing"
        }
      });

    }


  }

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {/* Timer Label */}
      <div className="text-xs tracking-widest text-muted-foreground uppercase">
        <p className='font-mono'>
          Session Timer
        </p>
      </div>

      {/* Timer Display */}
      <div className="  text-8xl font-light text-foreground tracking-tight tabular-nums">
        <p className='font-mono'>
          {formatTime(localTimer.minutes)}:{formatTime(localTimer.seconds)}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 pt-4">
        {/* Play Button */}
        {localTimer.timer_status === "playing" && (

          // When timer is playing now...
          <button
            onClick={onPauseClick}
            className="flex items-center justify-center w-16 h-16 bg-accent hover:bg-orange-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Pause className="w-6 h-6 text-white fill-white" />
          </button>

        )}

        {localTimer.timer_status === "not_started" && (
          // When timer is not started... 
          <button
            onClick={onPlayClick}
            className="flex items-center justify-center w-16 h-16 bg-accent hover:bg-orange-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Play className="w-6 h-6 text-white fill-white" />
          </button>
        )}


        {localTimer.timer_status === "paused" && (

          // When timer is paused now...
          <button
            onClick={onPauseClick}
            className="flex items-center justify-center w-16 h-16 bg-accent hover:bg-orange-600 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
          >
            <Play className="w-6 h-6 text-white fill-white" />
          </button>

        )}

        {/* Restart Button */}

        {(localTimer.timer_status === "playing" || localTimer.timer_status === "paused") && (

          <button
            onClick={onRestartClick}
            className="cursor-pointer flex items-center justify-center w-12 h-12 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Restart"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}


        {(localTimer.timer_status === "playing" || localTimer.timer_status === "paused") && (
          <Button variant="destructive" onClick={handleEndTimer}>
            End Timer
          </Button>
        )}

      </div>
    </div>
  );
}

export default Timer;
