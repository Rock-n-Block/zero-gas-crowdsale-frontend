import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';

import { Button, Progress, Typography } from '@/components';
import { CrossIcon, ZeroGasIcon } from '@/assets/img';
import { useShallowSelector } from '@/hooks';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import crowdSaleSelectors from '@/store/crowdsale/selectors';

import s from './styles.module.scss';

const Buy = () => {
  const { isOpen, hardcap, totalBuyed } = useShallowSelector(crowdSaleSelectors.getCrowdSale);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(updateCrowdSaleOpenState(false));
  }, [dispatch]);

  return (
    <div className={cn(s.wrapper, { [s.open]: isOpen })}>
      <div className={s.container}>
        <div className={s.head}>
          <Button className={s.exit} onClick={handleClose} variant="outlined">
            <CrossIcon />
          </Button>
        </div>
        <div className={s.content}>
          <div>
            <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
              Buy
            </Typography>
            <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
              Zer <ZeroGasIcon className={s.zGasIcon} /> gas
            </Typography>
          </div>
          <div className={s.card}>
            <Progress value={Math.floor(totalBuyed / hardcap)} className={s.progress}>
              <Typography type="body2">
                Sold{' '}
                <Typography type="body2" weight={600} className={s.displayInline}>
                  {totalBuyed}{' '}
                </Typography>
                out of{' '}
                <Typography type="body2" weight={600} className={s.displayInline}>
                  {hardcap.toLocaleString().replace(',', ' ')}
                </Typography>
              </Typography>
            </Progress>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
