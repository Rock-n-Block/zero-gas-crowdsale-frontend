import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';

import { CrossIcon, ZeroGasIcon } from '@/assets/img';
import { Button, Typography } from '@/components';
import { LoadingModal } from '@/components/LoadingModal';
import { useShallowSelector } from '@/hooks';
import { useTimeLeft } from '@/hooks/useTimeLeft';
import crowdSaleActionType from '@/store/crowdsale/actionTypes';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import { getStage as getStageUtil } from '@/store/crowdsale/utils';
import uiSelectors from '@/store/ui/selectors';
import { RequestStatus } from '@/types';

import { BuyForm } from './components/BuyForm';
import { StageTimer } from './components/StageTimer';
import { TokenList } from './components/TokenList';
import { getTimeLeftEnd } from './helper';

import s from './styles.module.scss';

const Buy = () => {
  const dispatch = useDispatch();
  const handleClose = useCallback(() => {
    dispatch(updateCrowdSaleOpenState(false));
  }, [dispatch]);
  const {
    stage1StartDate,
    stage1EndDate,
    stage2StartDate,
    stage2EndDate,
    totalBought,
    hardcap,
    isOpen,
  } = useShallowSelector(crowdSaleSelectors.getCrowdSale);

  const { [crowdSaleActionType.GET_CROWDSALE_INFO]: getCrowdsaleInfoStatus } = useShallowSelector(
    uiSelectors.getUI,
  );

  const getStage = useCallback(
    () =>
      getStageUtil({
        stage1StartDate,
        stage1EndDate,
        stage2StartDate,
        stage2EndDate,
        totalBought,
        hardcap,
      }),
    [hardcap, stage1EndDate, stage1StartDate, stage2EndDate, stage2StartDate, totalBought],
  );

  const [stage, setStage] = useState(getStage());

  const handleTimerOut = useCallback(() => {
    setStage(getStage());
  }, [getStage]);

  const timeLeftEnd = useMemo(
    () =>
      getTimeLeftEnd({
        stage1StartDate,
        stage1EndDate,
        stage2StartDate,
        stage2EndDate,
        currentStage: stage,
      }),
    [stage, stage1EndDate, stage1StartDate, stage2EndDate, stage2StartDate],
  );

  // Seconds timer
  const timeLeft = useTimeLeft(timeLeftEnd, handleTimerOut);

  return (
    <>
      <div className={cn(s.wrapper, { [s.open]: isOpen })}>
        <div className={s.container}>
          <div className={s.head}>
            <div style={{ width: 50 }} />
            <div>
              <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
                Buy
              </Typography>
              <Typography className={s.title} type="h1" fontFamily="DrukCyr Wide" weight={900}>
                Zer <ZeroGasIcon className={s.zGasIcon} /> gas
              </Typography>
            </div>
            <Button className={s.exit} onClick={handleClose} variant="outlined">
              <CrossIcon />
            </Button>
          </div>
          <div className={s.content}>
            <StageTimer className={s.card} stage={stage} timeLeft={timeLeft} />

            <BuyForm className={s.card} stage={stage} />

            <TokenList className={s.card} />
          </div>
        </div>
      </div>
      <LoadingModal visible={getCrowdsaleInfoStatus === RequestStatus.REQUEST} />
    </>
  );
};

export default Buy;
