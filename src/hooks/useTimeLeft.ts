import { useCallback, useEffect, useRef, useState } from 'react';

import { DateLike } from '@/types';

export interface ITimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MILLISECOND = 1;
const SECOND = 1000 * MILLISECOND;
const MINUTE = 60 * SECOND;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

/**
 * Calculates time left from endTime to now and splits into days, hours, minutes and seconds
 * @param endTime
 * @returns {
 *     days:number;
 *     hours:number;
 *     minutes:number;
 *     seconds:number;
 * } | null
 */
export const useTimeLeft = (endTime: DateLike, onTimerOut?: () => void) => {
  const timer = useRef<NodeJS.Timer | null>(null);
  const [timeLeft, setTimeLeft] = useState<ITimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = useCallback(() => {
    // If endTime is incorrect
    if (+endTime === 0) {
      return;
    }

    const difference = +endTime - Date.now();
    if (difference > 0) {
      let timeTracker = difference;
      const days = Math.floor(timeTracker / DAY);
      timeTracker -= days * DAY;
      const hours = Math.floor(timeTracker / HOUR);
      timeTracker -= hours * HOUR;
      const minutes = Math.floor(timeTracker / MINUTE);
      timeTracker -= minutes * MINUTE;
      const seconds = Math.floor(timeTracker / SECOND);
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    } else if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
      setTimeout(() => {
        onTimerOut?.();
      }, 1000);
    }
  }, [onTimerOut, endTime]);

  useEffect(() => {
    if (!timer.current) {
      timer.current = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
    }
  }, [calculateTimeLeft]);

  // If endTime is incorrect
  return +endTime === 0
    ? {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    : timeLeft;
};
