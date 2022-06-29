import { InfinityLine, Typography } from '@/components';
import { Divider } from '@/containers';

import { ProsList } from '../../components';

import s from './styles.module.scss';

export const Partners = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Typography className={s.title} type="h2" fontFamily="DrukCyr Wide" weight={900}>
          Partners and investors
        </Typography>
        <div className={s.grid}>
          <div className={s.partner}>Abc</div>
          <div className={s.partner}>Abc</div>
          <div className={s.partner}>Abc</div>
          <div className={s.partner}>Abc</div>
          <div className={s.partner}>Abc</div>
          <div className={s.partner}>Abc</div>
          <div className={s.partner}>Abc</div>
          <div className={s.partner}>Abc</div>
        </div>
      </div>
      <Divider contained={false}>
        <InfinityLine animation={{ duration: 15 }}>
          <ProsList />
        </InfinityLine>
      </Divider>
    </div>
  );
};
