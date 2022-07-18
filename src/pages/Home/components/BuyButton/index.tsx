import { Button, Typography } from '@/components';
import { useHandleBuyClick } from '@/hooks';

import s from './styles.module.scss';

export const BuyButton = () => {
  const handleBuyClick = useHandleBuyClick();

  return (
    <Button className={s.wrapper} onClick={handleBuyClick} variant="text">
      <Typography className={s.content} type="body1" fontFamily="DrukCyr Wide">
        buy zerogas
      </Typography>
    </Button>
  );
};
