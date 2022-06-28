import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';

import { Button, Typography } from '@/components';
import { useShallowSelector } from '@/hooks';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import crowdSaleSelectors from '@/store/crowdsale/selectors';

import s from './styles.module.scss';

const Buy = () => {
  const isOpen = useShallowSelector(crowdSaleSelectors.getProp('isOpen'));
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(updateCrowdSaleOpenState(false));
  }, [dispatch]);

  return (
    <div className={cn(s.wrapper, { [s.open]: isOpen })}>
      <div className={s.container}>
        <div className={s.head}>
          <Button className={s.exit} onClick={handleClose} variant="outlined">
            <Typography type="body2" weight={900} fontFamily="DrukCyr Wide">
              Exit
            </Typography>
          </Button>
        </div>
        <div className={s.content}>
          <Typography type="h2">Coming soon</Typography>
        </div>
      </div>
    </div>
  );
};

export default Buy;
