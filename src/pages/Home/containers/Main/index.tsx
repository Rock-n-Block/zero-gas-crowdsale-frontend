import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';

import {
  ArrowRightIcon,
  msgFallingTx,
  msgHighFee,
  msgWaitingFee,
  zeroGasGifSrc,
} from '@/assets/img';
import { Button, InfinityLine, Typography } from '@/components';
import { Divider } from '@/containers';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';

import { Advantage, ProsList } from '../../components';

import s from './styles.module.scss';

export const Main = () => {
  const dispatch = useDispatch();
  const handleBuyClick = useCallback(() => {
    dispatch(updateCrowdSaleOpenState(true));
  }, [dispatch]);
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
          Zer <img src={zeroGasGifSrc} className={s.zGasIcon} alt="0" /> gas
        </Typography>
        <Advantage>
          <>
            <Typography type="h2">
              We’ve
              <Typography type="h2" weight={500} className={s.infoHighlight} customTag="span">
                {' '}
                created
              </Typography>{' '}
              a solution that changes trading on Ethereum{' '}
              <Typography type="h2" weight={500} className={s.infoHighlight} customTag="span">
                forever
              </Typography>
              .
            </Typography>
            <Button
              onClick={handleBuyClick}
              className={s.buy}
              variant="outlined"
              endIcon={<ArrowRightIcon />}
            >
              <Typography type="body2" fontFamily="DrukCyr Wide" weight={900} className={s.buyText}>
                buy zerogas
              </Typography>
            </Button>
          </>
        </Advantage>
        <div className={s.overlay}>
          <div className={s.overlayContent}>
            <div className={s.fallingTx}>
              <img
                className={s.detail}
                src={msgFallingTx}
                alt="Failing transactions, losing gas fees for nothing?"
              />
            </div>
            <div className={s.highFee}>
              <img
                className={s.detail}
                src={msgHighFee}
                alt="Covering the Ethereum high gas fees?"
              />
            </div>
            <div className={s.waitingFee}>
              <img className={s.detail} src={msgWaitingFee} alt="Waiting for the gas drop?" />
            </div>
          </div>
        </div>
      </div>
      <Divider contained={false}>
        <InfinityLine animation={{ duration: 50 }}>
          <ProsList />
        </InfinityLine>
      </Divider>
    </div>
  );
};
