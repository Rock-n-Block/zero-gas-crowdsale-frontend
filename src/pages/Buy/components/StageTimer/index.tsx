import cn from 'clsx';

import { Timer, Typography } from '@/components';
import { useShallowSelector } from '@/hooks';
import { useTimeLeft } from '@/hooks/useTimeLeft';
import crowdSaleSelectors from '@/store/crowdsale/selectors';

import { getTimeLeftDate, stageTexts } from '../../helper';

import s from './styles.module.scss';

export interface StageTimerProps {
  className?: string;
}

export const StageTimer = ({ className }: StageTimerProps) => {
  const { currentStage, stage1StartDate, stage1EndDate, stage2StartDate, stage2EndDate } =
    useShallowSelector(crowdSaleSelectors.getCrowdSale);

  const timeLeft = useTimeLeft(
    getTimeLeftDate({
      currentStage,
      stage1StartDate,
      stage1EndDate,
      stage2StartDate,
      stage2EndDate,
    }),
  );

  return (
    <div className={cn(s.card, className)}>
      <Typography type="body1" fontFamily="DrukCyr Wide" weight={900} className={s.stageWillStart}>
        {stageTexts[currentStage]}
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
