import { Dispatch, SetStateAction, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { BurgerIcon } from '@/assets/img';
import { Address, Button, Typography } from '@/components';
import { useShallowSelector } from '@/hooks';
import { useWalletConnectorContext } from '@/services';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import { setActiveModal } from '@/store/modals/reducer';
import userSelector from '@/store/user/selectors';
import { Chains, Modals, WalletProviders } from '@/types';

import s from './styles.module.scss';

interface MenuProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Menu = ({ setIsOpen }: MenuProps) => {
  const userAddress = useShallowSelector(userSelector.getProp('address'));
  const dispatch = useDispatch();
  const { connect } = useWalletConnectorContext();

  const handleClickConnect = useCallback(() => {
    if (userAddress) {
      dispatch(setActiveModal({
        activeModal: Modals.SignIn,
      }));
    } else {
      connect(WalletProviders.metamask, Chains.Kovan);
    }
  }, [connect, dispatch, userAddress]);

  const handleClickBuy = useCallback(() => {
    if (userAddress) {
      dispatch(updateCrowdSaleOpenState(true));
    } else {
      connect(WalletProviders.metamask, Chains.Kovan);
    }
  }, [connect, dispatch, userAddress]);

  const handleBurgerClick = useCallback(() => {
    setIsOpen((state) => !state);
  }, [setIsOpen]);

  return (
    <section className={s.wrapper}>
      <div className={s.content}>
        <Button variant="text" className={s.walletConnect} onClick={handleClickConnect}>
          <Typography type="body2" weight={900} fontFamily="DrukCyr Wide">
            {userAddress ? <Address address={userAddress} /> : 'Connect wallet'}
          </Typography>
        </Button>
        <Button onClick={handleClickBuy} className={s.buy}>
          <Typography type="body2" weight={900} fontFamily="DrukCyr Wide">
            Buy
          </Typography>
        </Button>
        <Button className={s.burger} variant="text" onClick={handleBurgerClick}>
          <BurgerIcon />
        </Button>
      </div>
    </section>
  );
};
