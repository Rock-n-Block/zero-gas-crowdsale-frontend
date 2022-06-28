import { pros } from '@/appConstants';
import { Typography } from '@/components';

import s from './styles.module.scss';

export const ProsList = () => {
  return (
    <div className={s.wrapper}>
      {pros.map((el) => (
        <Typography type="body1" fontFamily="DrukCyr Wide" weight={900} className={s.item} key={el}>
          {el}
        </Typography>
      ))}
    </div>
  );
};
