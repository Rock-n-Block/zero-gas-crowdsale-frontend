import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from 'react';
import cn from 'clsx';

import s from './styles.module.scss';

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  addon?: ReactNode;
}

export const Input: FC<InputProps> = ({ className, addon, ...props }) => {
  return (
    <div className={cn(s.container, className)}>
      <input {...props} className={s.input} />
      {addon && <div className={s.addon}>{addon}</div>}
    </div>
  );
};
