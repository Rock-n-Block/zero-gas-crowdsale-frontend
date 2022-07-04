import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';

import { Button, Progress, Timer, Typography } from '@/components';
import { CrossIcon, ZeroGasIcon } from '@/assets/img';
import { useShallowSelector } from '@/hooks';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import crowdSaleSelectors from '@/store/crowdsale/selectors';

import s from './styles.module.scss';
import { useTimeLeft } from '@/hooks/useTimeLeft';
import { stageTexts, getTimeLeftDate } from './helper';

const Buy = () => {
  const {
    isOpen,
    hardcap,
    totalBought,
    currentStage,
    stage1StartDate,
    stage1EndDate,
    stage2StartDate,
    stage2EndDate,
  } = useShallowSelector(crowdSaleSelectors.getCrowdSale);
  const dispatch = useDispatch();
  const timeLeft = useTimeLeft(
    getTimeLeftDate({
      currentStage,
      stage1StartDate,
      stage1EndDate,
      stage2StartDate,
      stage2EndDate,
    }),
  );

  const handleClose = useCallback(() => {
    dispatch(updateCrowdSaleOpenState(false));
  }, [dispatch]);

  return (
    <div className={cn(s.wrapper, { [s.open]: isOpen })}>
      <div className={s.container}>
        <div className={s.head}>
          <Button className={s.exit} onClick={handleClose} variant="outlined">
            <CrossIcon />
          </Button>
        </div>
        <div className={s.content}>
          <div>
            <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
              Buy
            </Typography>
            <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
              Zer <ZeroGasIcon className={s.zGasIcon} /> gas
            </Typography>
          </div>
          <div className={s.card}>
            <Progress value={Math.floor(totalBought / hardcap)} className={s.progress}>
              <Typography type="body2">
                Sold{' '}
                <Typography type="body2" weight={600} className={s.displayInline}>
                  {totalBought}{' '}
                </Typography>
                out of{' '}
                <Typography type="body2" weight={600} className={s.displayInline}>
                  {hardcap.toLocaleString().replace(',', ' ')}
                </Typography>
              </Typography>
            </Progress>
          </div>
          <div className={s.card}>
            <Typography
              type="body1"
              fontFamily="DrukCyr Wide"
              weight={900}
              className={s.stageWillStart}
            >
              {currentStage && stageTexts[currentStage]}
            </Typography>
            <Timer
              days={timeLeft.days}
              hours={timeLeft.hours}
              minutes={timeLeft.minutes}
              seconds={timeLeft.seconds}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
