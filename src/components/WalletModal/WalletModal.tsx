import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { CopyIcon, CrossIcon } from '@/assets/img';
import { useShallowSelector } from '@/hooks';
import { useWalletConnectorContext } from '@/services';
import { closeModal } from '@/store/modals/reducer';
import userSelector from '@/store/user/selectors';
import { copyToClipboard } from '@/utils';

import { Address } from '../Address';
import { Button } from '../Button';
import { Modal, ModalProps } from '../Modal';
import { Typography } from '../Typography';

import s from './styles.module.scss';

export interface WalletModalProps {
  className?: ModalProps['className'];
  visible: ModalProps['visible'];
  onClose: ModalProps['onClose'];
}

export const WalletModal: FC<WalletModalProps> = ({ ...rest }) => {
  const userAddress = useShallowSelector(userSelector.getProp('address'));
  const { disconnect } = useWalletConnectorContext();
  const dispatch = useDispatch();

  const handleCopyAddress = useCallback(() => copyToClipboard(userAddress), [userAddress]);

  const handleDisconnect = useCallback(() => {
    disconnect();

    dispatch(closeModal());
  }, []);

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
          Disable your
          <br /> wallet?
        </Typography>

        <Button variant="text" className={s.walletConnect} onClick={handleCopyAddress}>
          <Typography type="body2" weight={900} fontFamily="DrukCyr Wide">
            <Address address={userAddress} />
          </Typography>
          <button type="button" className={s.copy}>
            <CopyIcon className={s.icon} />
          </button>
        </Button>

        <Button variant="outlined" className={s.button} onClick={handleDisconnect}>
          <Typography type="body1" className={s.buttonText} weight={900} fontFamily="DrukCyr Wide">
            Disconnect
          </Typography>
        </Button>
      </div>
    </Modal>
  );
};
