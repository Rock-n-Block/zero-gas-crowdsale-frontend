import { Button, InfinityLine, Typography } from '@/components';
import { Divider } from '@/containers';

import { ProsList } from '../../components';

import { partners } from './mock';

import s from './styles.module.scss';

export const Partners = () => {
  return (
    <div className={s.wrapper} id="partners">
      <div className={s.container}>
        <Typography className={s.title} type="h2" fontFamily="DrukCyr Wide" weight={900}>
          Partners and investors
        </Typography>
        <div className={s.grid}>
          {partners.map((partner) => (
            <Button key={partner.id} variant="outlined" href={partner.href} className={s.partner}>
              <img src={partner.image} alt={`partner ${partner.id}`} className={s.partnerImage} />
            </Button>
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
