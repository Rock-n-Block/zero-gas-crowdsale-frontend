import { FC } from 'react';

import { CrossIcon } from '@/assets/img';

import { Modal, ModalProps } from '../Modal';
import { Typography } from '../Typography';

import s from './styles.module.scss';

export interface ErrorModalProps {
  className?: ModalProps['className'];
  visible: ModalProps['visible'];
  onClose: ModalProps['onClose'];
}

export const ErrorModal: FC<ErrorModalProps> = ({ ...rest }) => {
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
          Transaction <br />
          error
        </Typography>
      </div>
    </Modal>
  );
};
