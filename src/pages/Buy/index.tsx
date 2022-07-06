import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';

import { CrossIcon, ZeroGasIcon } from '@/assets/img';
import { Button, Progress, Timer, Typography } from '@/components';
import { useShallowSelector } from '@/hooks';
import { useTimeLeft } from '@/hooks/useTimeLeft';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import tokenSelectors from '@/store/tokens/selectors';
import { Token } from '@/types';

import { getFormatFiat, getFormatNumber, getTimeLeftDate, stageTexts } from './helper';

import s from './styles.module.scss';

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
    zeroGasPrice,
  } = useShallowSelector(crowdSaleSelectors.getCrowdSale);
  const { tokens } = useShallowSelector(tokenSelectors.getTokens);
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
          <Typography type="h2" className={s.comingSoon}>
            Coming soon
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Buy;
