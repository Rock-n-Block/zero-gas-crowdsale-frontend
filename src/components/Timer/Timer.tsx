import { FC } from 'react';
import cn from 'clsx';

import s from './styles.module.scss';
import { Typography } from '../Typography';

export interface TimerProps {
  className?: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Timer: FC<TimerProps> = ({ className, days, hours, minutes, seconds }) => {
  return (
    <div className={cn(s.container, className)}>
      {[
        { label: 'days', value: days },
        { label: 'hours', value: hours },
        { label: 'minutes', value: minutes },
        { label: 'seconds', value: seconds },
      ].map(({ label, value }) => (
        <div key={label} className={s.cell}>
          <Typography type="h2" weight={600} className={s.pill}>
            {value}
          </Typography>
          <Typography className={s.label}>{label}</Typography>
        </div>
      ))}
    </div>
  );
};
