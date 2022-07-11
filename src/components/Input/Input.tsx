import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from 'react';
import cn from 'clsx';

import s from './styles.module.scss';

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  addon?: ReactNode;
  errorText?: string;
}

export const Input: FC<InputProps> = ({ className, addon, errorText, ...props }) => {
  return (
    <div className={cn(s.wrapper, className)}>
      <div className={cn(s.container, { [s.error]: !!errorText })}>
        <input {...props} className={s.input} />
        {addon && <div className={s.addon}>{addon}</div>}
      </div>
      <div className={s.errorText}>{errorText}</div>
    </div>
  );
};
