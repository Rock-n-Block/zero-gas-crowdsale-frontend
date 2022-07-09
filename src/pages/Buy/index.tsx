import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';

import { CrossIcon, ZeroGasIcon } from '@/assets/img';
import { Button, Typography } from '@/components';
import { LoadingModal } from '@/components/LoadingModal';
import { useShallowSelector } from '@/hooks';
import crowdSaleActionType from '@/store/crowdsale/actionTypes';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import uiSelectors from '@/store/ui/selectors';
import { RequestStatus } from '@/types';

import { BuyForm } from './components/BuyForm';
import { StageTimer } from './components/StageTimer';
import { TokenList } from './components/TokenList';

import s from './styles.module.scss';

const Buy = () => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(updateCrowdSaleOpenState(false));
  }, [dispatch]);
  const { isOpen } = useShallowSelector(crowdSaleSelectors.getCrowdSale);
  const { [crowdSaleActionType.GET_CROWDSALE_INFO]: getCrowdsaleInfoStatus } = useShallowSelector(
    uiSelectors.getUI,
  );

  return (
    <>
      <div className={cn(s.wrapper, { [s.open]: isOpen })}>
        <div className={s.container}>
          <div className={s.head}>
            <div style={{ width: 50 }} />
            <div>
              <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
                Buy
              </Typography>
              <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
                Zer <ZeroGasIcon className={s.zGasIcon} /> gas
              </Typography>
            </div>
            <Button className={s.exit} onClick={handleClose} variant="outlined">
              <CrossIcon />
            </Button>
          </div>
          <div className={s.content}>
            <StageTimer className={s.card} />

            <BuyForm className={s.card} />

            <TokenList className={s.card} />
          </div>
        </div>
      </div>
      <LoadingModal visible={getCrowdsaleInfoStatus === RequestStatus.REQUEST} />
    </>
  );
};

export default Buy;
