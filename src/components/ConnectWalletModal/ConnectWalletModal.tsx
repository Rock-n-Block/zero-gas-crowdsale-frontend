import { FC, useCallback } from 'react';

import { CrossIcon, metamaskSrc, walletconnectSrc } from '@/assets/img';
import { useWalletConnectorContext } from '@/services';
import { Chains, WalletProviders } from '@/types';

import { Button } from '../Button';
import { Modal, ModalProps } from '../Modal';
import { Typography } from '../Typography';

import s from './styles.module.scss';

export interface SuccessModalProps {
  className?: ModalProps['className'];
  visible: ModalProps['visible'];
  onClose: ModalProps['onClose'];
}

export const ConnectWalletModal: FC<SuccessModalProps> = ({ ...rest }) => {
  const { connect } = useWalletConnectorContext();

  const handleMetaMaskConnect = useCallback(
    () => connect(WalletProviders.metamask, Chains.Kovan),
    [connect],
  );

  const handleWalletConnectConnect = useCallback(
    () => connect(WalletProviders.walletconnect, Chains.Kovan),
    [connect],
  );

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
        <Button onClick={handleMetaMaskConnect} className={s.providerButton}>
          <img src={metamaskSrc} alt="metamask" />
          MetaMask
        </Button>
        <Button onClick={handleWalletConnectConnect} className={s.providerButton}>
          <img src={walletconnectSrc} alt="wallet connect" />
          Wallet Connect
        </Button>
      </div>
    </Modal>
  );
};
