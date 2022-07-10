import { FC, useCallback } from 'react';

import { CopyIcon, CrossIcon } from '@/assets/img';
import { copyToClipboard } from '@/utils';

import { Address } from '../Address';
import { Button } from '../Button';
import { Modal, ModalProps } from '../Modal';
import { Typography } from '../Typography';

import s from './styles.module.scss';

export interface SuccessModalProps {
  className?: ModalProps['className'];
  visible: ModalProps['visible'];
  onClose: ModalProps['onClose'];
  transactionHash?: string;
}

export const SuccessModal: FC<SuccessModalProps> = ({ transactionHash, ...rest }) => {
  const handleCopyAddress = useCallback(() => copyToClipboard(transactionHash), [transactionHash]);

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
          Successful
          <br />
          transaction
        </Typography>

        {transactionHash && (
          <Button variant="outlined" className={s.transactionHash} onClick={handleCopyAddress}>
            <Typography type="body2" weight={900} fontFamily="DrukCyr Wide">
              <Address address={transactionHash} />
            </Typography>
            <button type="button" className={s.copy}>
              <CopyIcon />
            </button>
          </Button>
        )}
      </div>
    </Modal>
  );
};
