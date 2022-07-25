import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { CrossIcon, metamaskSrc, walletconnectSrc } from '@/assets/img';
import { useWalletConnectorContext } from '@/services';
import { closeModal } from '@/store/modals/reducer';
import { Chains, WalletProviders } from '@/types';

import { Button } from '../Button';
import { Modal, ModalProps } from '../Modal';
import { Typography } from '../Typography';

import s from './styles.module.scss';

export interface ConnectWalletModalProps {
  className?: ModalProps['className'];
  visible: ModalProps['visible'];
  onClose: ModalProps['onClose'];
}

export const ConnectWalletModal: FC<ConnectWalletModalProps> = ({ ...rest }) => {
  const { connect } = useWalletConnectorContext();
  const dispatch = useDispatch();

  const handleMetaMaskConnect = useCallback(() => {
    connect(WalletProviders.metamask, Chains.Kovan);
    dispatch(closeModal());
  }, [connect, dispatch]);

  const handleWalletConnectConnect = useCallback(() => {
    connect(WalletProviders.walletconnect, Chains.Kovan);
    dispatch(closeModal());
  }, [connect, dispatch]);

  return (
    <Modal closeable closeIcon={<CrossIcon />} {...rest}>
      <div className={s.container}>
        <Typography
          type="body1"
          fontFamily="DrukCyr Wide"
          weight={900}
          color="dark-0"
          className={s.title}
        >
          CONNECT WALLET
        </Typography>
        <Button variant="outlined" onClick={handleMetaMaskConnect} className={s.providerButton}>
          <img src={metamaskSrc} alt="metamask" />
          MetaMask
        </Button>
        <Button
          variant="outlined"
          onClick={handleWalletConnectConnect}
          className={s.providerButton}
        >
          <img src={walletconnectSrc} alt="wallet connect" />
          WalletConnect
        </Button>
      </div>
    </Modal>
  );
};
