import cn from 'clsx';

import { Timer, Typography } from '@/components';
import { ITimeLeft } from '@/hooks/useTimeLeft';
import { Stage } from '@/types';

import { stageTexts } from '../../helper';

import s from './styles.module.scss';

export interface StageTimerProps {
  className?: string;
  stage: Stage;
  timeLeft: ITimeLeft;
}

export const StageTimer = ({ className, stage, timeLeft }: StageTimerProps) => {
  return (
    <div className={cn(s.card, className)}>
      <Typography type="body1" fontFamily="DrukCyr Wide" weight={900} className={s.stageWillStart}>
        {stageTexts[stage]}
      </Typography>
      <Timer
        days={timeLeft.days}
        hours={timeLeft.hours}
        minutes={timeLeft.minutes}
        seconds={timeLeft.seconds}
      />
    </div>
  );
};
