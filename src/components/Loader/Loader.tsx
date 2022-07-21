import { FC, useEffect } from 'react';
import cn from 'clsx';
import Dialog from 'rc-dialog/lib/Dialog';

import { zeroGasGifSrc } from '@/assets/img';
import { useOverflow } from '@/hooks';

import { Typography } from '../Typography';

import '../Modal/styles.module.scss';
import s from './styles.module.scss';

export interface LoaderProps {
  className?: string;
  visible: boolean;
}

export const Loader: FC<LoaderProps> = ({ className, visible }) => {
  const overflowContext = useOverflow();

  useEffect(() => {
    overflowContext?.setOverflow(visible ? 'hidden' : 'auto');
  }, [overflowContext, visible]);

  return (
    <Dialog
      prefixCls="modal"
      zIndex={1000}
      destroyOnClose
      maskClosable
      closable={false}
      visible={visible}
      getOpenCount={() => 1}
      wrapClassName={cn(s.modal, className)}
    >
      <div className={s.container}>
        <img src={zeroGasGifSrc} alt="0" className={s.zeroGasGif} />
        <div className={s.loading}>
          <div className={s.loadingBar} />
          <Typography
            type="body1"
            fontFamily="DrukCyr Wide"
            weight={900}
            color="dark-0"
            className={s.title}
          >
            Loading
          </Typography>
        </div>
      </div>
    </Dialog>
  );
};
