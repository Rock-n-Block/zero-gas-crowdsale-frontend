import { InfinityLine, Typography } from '@/components';
import { Divider } from '@/containers';

import { BuyButton } from '../../components';

import { RoadStage } from './components';
import { currentStage, roadMap } from './mock';

import s from './styles.module.scss';

export const RoadMap = () => {
  return (
    <div className={s.wrapper} id="roadmap">
      <div className={s.container}>
        <Typography className={s.title} type="h2" fontFamily="DrukCyr Wide" weight={900}>
          Roadmap
        </Typography>
        <div className={s.roadMap}>
          {roadMap.map((item) => (
            <RoadStage key={item.id} {...item} activeStage={currentStage} />
          ))}
        </div>
      </div>
      <Divider contained={false}>
        <InfinityLine animation={{ duration: 50 }}>
          <BuyButton />
        </InfinityLine>
      </Divider>
    </div>
  );
};
