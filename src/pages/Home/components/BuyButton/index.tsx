import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Typography } from '@/components';
import { useShallowSelector } from '@/hooks';
import { useWalletConnectorContext } from '@/services';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import userSelector from '@/store/user/selectors';
import { Chains, WalletProviders } from '@/types';

import s from './styles.module.scss';

export const BuyButton = () => {
  const userAddress = useShallowSelector(userSelector.getProp('address'));
  const dispatch = useDispatch();
  const { connect } = useWalletConnectorContext();

  const handleClickBuy = useCallback(() => {
    if (userAddress) {
      dispatch(updateCrowdSaleOpenState(true));
    } else {
      connect(WalletProviders.metamask, Chains.Kovan);
    }
  }, [connect, dispatch, userAddress]);

  return (
    <Button className={s.wrapper} onClick={handleClickBuy} variant="text">
      <Typography className={s.content} type="body1" fontFamily="DrukCyr Wide">
        buy zerogas
      </Typography>
    </Button>
  );
};
