import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';

import { CrossIcon, ZeroGasIcon } from '@/assets/img';
import { Button, Dropdown, Input, Progress, Timer, Typography } from '@/components';
import { TOption } from '@/components/Dropdown';
import { useShallowSelector } from '@/hooks';
import { useTimeLeft } from '@/hooks/useTimeLeft';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import tokenSelectors from '@/store/tokens/selectors';
import { Token } from '@/types';

import { getFormatFiat, getFormatNumber, getTimeLeftDate, stageTexts } from './helper';

import s from './styles.module.scss';

const getTokenOption = (token: Token): TOption => ({
  value: token.address,
  icon: <img src={token.image} width={32} height={32} alt={`${token.symbol} logo`} />,
  label: token.symbol,
});

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

  const tokenOptions = useMemo<TOption[]>(
    () => Object.values(tokens).map((token) => getTokenOption(token)),
    [tokens],
  );

  const [selectedToken, setSelectedToken] = useState<TOption | undefined>(undefined);

  const handleTokenChange = useCallback((option: TOption) => setSelectedToken(option), []);

  const sendToken = useMemo(() => selectedToken || tokenOptions[0], [selectedToken, tokenOptions]);

  const availableOptions = useMemo(
    () => tokenOptions.filter((token) => token.value !== sendToken?.value),
    [sendToken?.value, tokenOptions],
  );

  return (
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
          <div className={cn(s.card, s.cardTimer)}>
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

          <div className={cn(s.card, s.cardForm)}>
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

            <form className={s.form}>
              <Input
                placeholder="Send"
                addon={
                  <Dropdown
                    options={availableOptions}
                    value={sendToken}
                    onChange={handleTokenChange}
                  />
                }
                className={s.sendInput}
              />

              <Input
                placeholder="Receive"
                readOnly
                value={100}
                addon={
                  <div className={s.zeroGasCurrency}>
                    <ZeroGasIcon width={32} height={32} />
                    <Typography>0GAS</Typography>
                  </div>
                }
                className={s.receiveInput}
              />

              <Typography type="body2" className={s.helpText}>
                You buy 0GAS Tokens by sending USDT to the contract
              </Typography>

              <Button className={s.formButton}>
                <Typography
                  type="body1"
                  fontFamily="DrukCyr Wide"
                  className={s.formButtonTypography}
                >
                  Buy zerogas
                </Typography>
              </Button>
            </form>
            <div className={s.claimIn}>
              <Typography type="body2">Claim your 1.000 0gas tokens in </Typography>
              <Button className={s.claimInButton}>
                <Typography type="body2" weight={700}>
                  29 DAYS
                </Typography>
              </Button>
            </div>
          </div>

          <div className={cn(s.card, s.cardPriceList)}>
            <Typography
              type="body1"
              fontFamily="DrukCyr Wide"
              weight={900}
              className={s.currentListTitle}
            >
              Current prices
            </Typography>
            {Object.values(tokens).map((token) => (
              <div key={token.address} className={s.currencyListItem}>
                <img
                  src={token.image}
                  alt={`${token.symbol} logo`}
                  className={s.currencyListItemImage}
                  width={48}
                  height={48}
                />
                <Typography type="body1">
                  {token.fullName} ({token.symbol})
                </Typography>
                <Typography type="body1" className={s.currencyListItemPrice}>
                  ${getFormatFiat(token?.value)}
                </Typography>
              </div>
            ))}
            <div className={s.currencyListItem}>
              <ZeroGasIcon className={s.currencyListItemImage} width={48} height={48} />
              <Typography type="body1">Zerogas (0GAS)</Typography>
              <Typography type="body1" className={s.currencyListItemPrice}>
                ${getFormatFiat(zeroGasPrice)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
