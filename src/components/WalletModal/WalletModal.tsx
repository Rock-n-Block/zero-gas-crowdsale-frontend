import { FC, PropsWithChildren, useCallback } from 'react';
import cn from 'clsx';

import s from './styles.module.scss';
import { Modal, ModalProps } from '../Modal';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { CrossIcon } from '@/assets/img';
import { Address } from '../Address';
import { copyToClipboard } from '@/utils';

export interface WalletModalProps {
  address: string;
  className?: ModalProps['className'];
  visible: ModalProps['visible'];
  onClose: ModalProps['onClose'];
}

export const WalletModal: FC<WalletModalProps> = ({ address, ...rest }) => {
  const handleCopyAddress = useCallback(() => copyToClipboard(address), [address]);

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
          Disable you wallet?
        </Typography>

        <Button variant="outlined" className={s.address} onClick={handleCopyAddress}>
          <Address address={address} start={10} end={5} />
        </Button>

        <Button variant="outlined" className={s.button}>
          <Typography type="body1" className={s.buttonText} weight={900}>
            Disconnect
          </Typography>
        </Button>
      </div>
    </Modal>
  );
};
