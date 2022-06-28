import { ReactElement } from 'react';

import { PlusIcon } from '@/assets/img';

import s from './styles.module.scss';

interface AdvantageProps {
  children: ReactElement;
}

export const Advantage = ({ children }: AdvantageProps) => {
  return (
    <div className={s.advantage}>
      <div className={s.icon}>
        <PlusIcon />
      </div>
      <div className={s.info}>{children}</div>
    </div>
  );
};
