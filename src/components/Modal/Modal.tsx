import { PropsWithChildren, ReactNode, VFC } from 'react';
import cn from 'clsx';
import Dialog from 'rc-dialog';

import s from './styles.module.scss';

export interface ModalProps {
  className?: string;
  visible: boolean;
  closeable: boolean;
  onClose?: () => void;
  closeIcon?: ReactNode;
}
export const Modal: VFC<PropsWithChildren<ModalProps>> = ({
  className,
  visible,
  closeable,
  onClose,
  children,
  closeIcon,
}) => {
  return (
    <Dialog
      prefixCls="modal"
      zIndex={1000}
      destroyOnClose
      maskClosable
      closable={closeable}
      className={cn(s, className)}
      visible={visible}
      closeIcon={closeIcon}
      onClose={onClose}
    >
      {children}
    </Dialog>
  );
};
