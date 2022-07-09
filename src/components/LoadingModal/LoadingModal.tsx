import { FC } from 'react';

import { CrossIcon } from '@/assets/img';

import { Modal, ModalProps } from '../Modal';
import { Typography } from '../Typography';

import s from './styles.module.scss';

export interface LoadingModalProps {
  className?: ModalProps['className'];
  visible: ModalProps['visible'];
}

export const LoadingModal: FC<LoadingModalProps> = ({ ...rest }) => {
  return (
    <Modal closeable={false} closeIcon={<CrossIcon />} {...rest}>
      <div className={s.container}>
        <Typography
          type="body1"
          fontFamily="DrukCyr Wide"
          weight={900}
          color="dark-0"
          className={s.title}
        >
          Loading...
        </Typography>
      </div>
    </Modal>
  );
};
