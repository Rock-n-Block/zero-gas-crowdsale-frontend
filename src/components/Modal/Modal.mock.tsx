import { PropsWithChildren } from 'react';
import { noop } from 'rxjs';

import { ModalProps } from './Modal';

export const modalPropsMocked: PropsWithChildren<ModalProps> = {
  visible: true,
  onClose: noop,
  closeable: true,
  children: <div>Hello world</div>,
};
