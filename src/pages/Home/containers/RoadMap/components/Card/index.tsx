import cn from 'clsx';

import { Typography } from '@/components';

import { RoadMapItem } from '../../mock';

import s from './styles.module.scss';

interface CardProps extends RoadMapItem {
  className?: string;
}

export const Card = ({ title, content, className }: CardProps) => {
  const paragraphs = content.split('\n').filter((c) => c.length !== 0);
  return (
    <div className={cn(s.wrapper, className)}>
      <Typography type="h3" fontFamily="DrukCyr Wide" weight={900} className={s.title}>
        {title}
      </Typography>
      {paragraphs.length === 1 ? (
        <Typography>{paragraphs[0]}</Typography>
      ) : (
        <ul className={s.list}>
          {paragraphs.map((paragraph) => (
            <li className={s.listItem} key={paragraph}>
              <Typography>{paragraph}</Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
