import cn from 'clsx';

import { Typography } from '@/components';
import { useBreakpoints } from '@/hooks';

import { RoadMapItem } from '../../mock';
import { Card } from '../Card';

import s from './styles.module.scss';

interface RoadStage extends RoadMapItem {
  activeStage: number;
}

export const RoadStage = ({ id, activeStage, ...rest }: RoadStage) => {
  const [isTablet] = useBreakpoints([1110]);
  return (
    <div className={cn(s.wrapper, s[id % 2 === 0 || isTablet ? 'right' : 'left'])}>
      <Card {...rest} id={id} />
      <div className={s.delimiter} />
      <div className={cn(s.stage, { [s.active]: activeStage >= id })}>
        <Typography className={s.stageText} type="h2">
          {id.toString().padStart(2, '0')}
        </Typography>
      </div>
    </div>
  );
};
