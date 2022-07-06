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

import {
  getFormatFiat,
  getFormatNumber,
  getTimeLeftDate,
  getTokenImageUrl,
  stageTexts,
} from './helper';

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
  const tetherToken = useShallowSelector(tokenSelectors.getToken('TST')) as Token;
  const etherToken = useShallowSelector(tokenSelectors.getToken('ETH')) as Token;
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
          <div className={s.cards}>
            <div className={s.card}>
              <Progress value={Math.floor(totalBought / hardcap)} className={s.progress}>
                <Typography type="body2">
                  Sold{' '}
                  <Typography type="body2" weight={600} className={s.displayInline}>
                    {totalBought}{' '}
                  </Typography>
                  out of{' '}
                  <Typography type="body2" weight={600} className={s.displayInline}>
                    {getFormatNumber(hardcap)}
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
            <div className={s.card}>
              <Typography
                type="body1"
                fontFamily="DrukCyr Wide"
                weight={900}
                className={s.currentListTitle}
              >
                Current prices
              </Typography>
              <div className={s.currencyListItem}>
                <img
                  src={getTokenImageUrl('0x55d398326f99059fF775485246999027B3197955')}
                  alt="UCDT logo"
                  className={s.currencyListItemImage}
                  width={48}
                  height={48}
                />
                <Typography type="body1">Tether (USDT)</Typography>
                <Typography type="body1" className={s.currencyListItemPrice}>
                  ${getFormatFiat(tetherToken?.value)}
                </Typography>
              </div>
              <div className={s.currencyListItem}>
                <img
                  src={getTokenImageUrl('0x2170Ed0880ac9A755fd29B2688956BD959F933F8')}
                  alt="UCDT logo"
                  className={s.currencyListItemImage}
                  width={48}
                  height={48}
                />
                <Typography type="body1">Ethereum (ETH)</Typography>
                <Typography type="body1" className={s.currencyListItemPrice}>
                  ${getFormatFiat(etherToken?.value)}
                </Typography>
              </div>
              <div className={s.currencyListItem}>
                <ZeroGasIcon className={s.currencyListItemImage} width={48} height={48} />
                <Typography type="body1">Zerogas (0GAS)</Typography>
                <Typography type="body1" className={s.currencyListItemPrice}>
                  ${getFormatFiat(zeroGasPrice)}
                </Typography>
              </div>
            </div>
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
