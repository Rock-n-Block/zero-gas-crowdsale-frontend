import { ReactElement } from 'react';
import cn from 'clsx';

import { TClassNames } from './types';

import s from './styles.module.scss';

interface DividerProps {
  children: ReactElement;
  contained?: boolean;
  classNames?: TClassNames;
}

const Divider = ({ children, contained = true, classNames }: DividerProps) => {
  let content = children;
  if (contained || classNames?.container) {
    content = <div className={cn(s.container, classNames?.container)}>{children}</div>;
  }
  return <section className={cn(s.wrapper, classNames?.wrapper)}>{content}</section>;
};

export default Divider;
