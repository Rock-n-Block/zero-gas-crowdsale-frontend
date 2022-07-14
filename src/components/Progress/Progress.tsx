import { FC, PropsWithChildren } from 'react';
import cn from 'clsx';

import { cssVariable } from '@/utils';

import s from './styles.module.scss';

export interface ProgressProps {
  className?: string;
  value: number;
}

export const Progress: FC<PropsWithChildren<ProgressProps>> = ({ children, className, value }) => {
  return (
    <div className={cn(s.container, className)}>
      <div className={s.bar} style={cssVariable({ width: `${value}%` })} />
      <div className={s.title}>{children}</div>
    </div>
  );
};
