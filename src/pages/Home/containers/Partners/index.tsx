import { InfinityLine, Typography } from '@/components';
import { Divider } from '@/containers';

import { ProsList } from '../../components';
import { partners } from './mock';

import s from './styles.module.scss';

export const Partners = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Typography className={s.title} type="h2" fontFamily="DrukCyr Wide" weight={900}>
          Partners and investors
        </Typography>
        <div className={s.grid}>
          {partners.map((partner) => (
            <div className={s.partner} key={partner.id}>
              {partner.title}
            </div>
          ))}
        </div>
      </div>
      <Divider contained={false}>
        <InfinityLine animation={{ duration: 250 }}>
          <ProsList />
        </InfinityLine>
      </Divider>
    </div>
  );
};
