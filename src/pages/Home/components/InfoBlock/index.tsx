import { ReactElement } from 'react';
import cn from 'clsx';

import { Typography } from '@/components';

import s from './styles.module.scss';

interface InfoBlockProps {
  title: string | ReactElement;
  content: string | ReactElement;
  className?: string;
}

export const InfoBlock = ({ title, content, className }: InfoBlockProps) => {
  return (
    <div className={cn(s.wrapper, className)}>
      <Typography className={s.title} weight={900} type="h3" fontFamily="DrukCyr Wide">
        {title}
      </Typography>
      <div className={s.content}>{content}</div>
    </div>
  );
};
