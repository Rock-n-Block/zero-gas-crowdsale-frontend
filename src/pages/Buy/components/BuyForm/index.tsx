import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';

import { ZeroGasIcon } from '@/assets/img';
import { Button, Dropdown, Progress, Typography } from '@/components';
import { TOption } from '@/components/Dropdown';
import { NumberInput } from '@/components/NumberInput';
import { ZEROGAS_DECIMALS } from '@/config/constants';
import { useShallowSelector } from '@/hooks';
import { useWalletConnectorContext } from '@/services';
import { buy, claim, refund } from '@/store/crowdsale/actions';
import { updateCrowdSaleState } from '@/store/crowdsale/reducer';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import { getCrowdsaleContract } from '@/store/crowdsale/utils';
import tokenSelectors from '@/store/tokens/selectors';
import userSelector from '@/store/user/selectors';
import { Stage, Token } from '@/types';
import { Buy } from '@/types/contracts/CrowdsaleAbi';
import { getDaysLeft } from '@/utils';
import { getDecimalTokenAmount, getNaturalTokenAmount } from '@/utils/getTokenAmount';

import { getFormatNumber } from '../../helper';

import s from './styles.module.scss';

const getTokenOption = (token: Token): TOption => ({
  value: token.address,
  icon: <img src={token.image} width={32} height={32} alt={`${token.symbol} logo`} />,
  label: token.symbol,
});

const getReceiveAmount = (sendAmount: number, sendPrice: number, receivePrice: number) => {
  return (sendAmount * sendPrice) / receivePrice;
};

export interface BuyFormProps {
  className?: string;
  stage: Stage;
}

export const BuyForm = ({ className, stage }: BuyFormProps) => {
  const [selectedToken, setSelectedToken] = useState<TOption | undefined>(undefined);
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [sendError, setSendError] = useState('');
  const [receiveError, setReceiveError] = useState('');

  const { tokens } = useShallowSelector(tokenSelectors.getTokens);
  const { tokenBalances } = useShallowSelector(userSelector.getUser);
  const {
    hardcap,
    softcap,
    totalBought,
    userBought,
    stage2EndDate,
    minPurchase,
    maxPurchase,
    zeroGasPrice,
  } = useShallowSelector(crowdSaleSelectors.getCrowdSale);
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  const tokenOptions = useMemo<TOption[]>(
    () => Object.values(tokens).map((token) => getTokenOption(token)),
    [tokens],
  );
  const sendToken = useMemo(() => selectedToken || tokenOptions[0], [selectedToken, tokenOptions]);
  const availableOptions = useMemo(
    () => tokenOptions.filter((token) => token.value !== sendToken?.value),
    [sendToken?.value, tokenOptions],
  );

  const totalAvailable = useMemo(() => hardcap - totalBought, [hardcap, totalBought]);

  const claimDaysLeft = useMemo(() => getDaysLeft(stage2EndDate), [stage2EndDate]);

  const canBuy = useMemo(
    () =>
      !!(
        (stage === Stage.FIRST || stage === Stage.SECOND) &&
        totalBought < hardcap &&
        receiveAmount &&
        !receiveError
      ),
    [stage, totalBought, hardcap, receiveAmount, receiveError],
  );
  const canClaim = useMemo(
    () => (new Date() > stage2EndDate || totalBought >= hardcap) && userBought > 0,
    [hardcap, stage2EndDate, totalBought, userBought],
  );
  const isRefund = useMemo(
    () => new Date() > stage2EndDate && totalBought < softcap,
    [softcap, stage2EndDate, totalBought],
  );
  const canRefund = useMemo(() => isRefund && userBought > 0, [isRefund, userBought]);
  const canInput = useMemo(() => stage !== Stage.END, [stage]);

  const handleValidateSendAmount = useCallback(
    (value: number, newToken?: TOption) => {
      if (value > tokenBalances[newToken?.value || sendToken?.value]) {
        setSendError(
          `Not enough amount on wallet (${tokens[newToken?.value || sendToken?.value].symbol})`,
        );
      } else {
        setSendError('');
      }
    },
    [sendToken?.value, tokenBalances, tokens],
  );

  const handleValidateReceiveAmount = useCallback(
    (value: number) => {
      if (value < minPurchase) {
        setReceiveError(`Must be at least ${minPurchase.toLocaleString()} 0GAS`);
      } else if (value > maxPurchase) {
        setReceiveError(`Must be at most ${maxPurchase.toLocaleString()} 0GAS`);
      } else if (value > totalAvailable) {
        setReceiveError(`Must be at most ${totalAvailable.toLocaleString()} 0GAS`);
      } else {
        setReceiveError('');
      }
    },
    [maxPurchase, minPurchase, totalAvailable],
  );

  const handleTokenChange = useCallback(
    (option: TOption) => {
      setSelectedToken(option);
      const newSendAmount = getReceiveAmount(
        +receiveAmount,
        zeroGasPrice,
        tokens[option?.value].value,
      );
      setSendAmount(newSendAmount.toString());
      handleValidateSendAmount(newSendAmount, option);
    },
    [handleValidateSendAmount, receiveAmount, tokens, zeroGasPrice],
  );

  const handleSendAmountChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setSendAmount(value);
      const newReceiveAmount = getReceiveAmount(
        +value,
        tokens[sendToken?.value].value,
        zeroGasPrice,
      );
      setReceiveAmount(newReceiveAmount.toString());

      handleValidateSendAmount(+value);
      handleValidateReceiveAmount(newReceiveAmount);
    },
    [handleValidateReceiveAmount, handleValidateSendAmount, sendToken?.value, tokens, zeroGasPrice],
  );

  const handleReceiveAmountChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setReceiveAmount(value);
      const newSendAmount = getReceiveAmount(+value, zeroGasPrice, tokens[sendToken?.value].value);
      setSendAmount(newSendAmount.toString());

      handleValidateSendAmount(newSendAmount);
      handleValidateReceiveAmount(+value);
    },
    [handleValidateReceiveAmount, handleValidateSendAmount, sendToken?.value, tokens, zeroGasPrice],
  );

  const handleBuy = useCallback(() => {
    dispatch(
      buy({
        amount: getDecimalTokenAmount(+receiveAmount, ZEROGAS_DECIMALS),
        tokenAddress: sendToken?.value,
        web3Provider: walletService.Web3(),
      }),
    );
  }, [dispatch, receiveAmount, sendToken?.value, walletService]);

  const handleClaim = useCallback(
    () =>
      dispatch(
        claim({
          web3Provider: walletService.Web3(),
        }),
      ),
    [dispatch, walletService],
  );

  const handleRefund = useCallback(
    () =>
      dispatch(
        refund({
          web3Provider: walletService.Web3(),
        }),
      ),
    [dispatch, walletService],
  );

  const handleBuyEvent = useCallback(
    (error: Error, result: Buy) => {
      if (error) {
        return;
      }

      dispatch(
        updateCrowdSaleState({
          totalBought:
            totalBought + getNaturalTokenAmount(+result.returnValues.bought, ZEROGAS_DECIMALS),
        }),
      );
    },
    [dispatch, totalBought],
  );

  useEffect(() => {
    const web3Provider = walletService.Web3();
    const crowdsaleContract = getCrowdsaleContract(web3Provider);
    crowdsaleContract.events.Buy(handleBuyEvent);
  }, [handleBuyEvent, walletService]);

  return (
    <div className={cn(s.card, className)}>
      <Progress value={Math.floor((totalBought / hardcap) * 100)} className={s.progress}>
        <Typography type="body2">
          Sold{' '}
          <Typography type="body2" weight={600} className={s.displayInline}>
            {totalBought}{' '}
          </Typography>
          out of{' '}
          <Typography type="body2" weight={600} className={s.displayInline}>
            {getFormatNumber(hardcap)}
          </Typography>{' '}
          0GAS
        </Typography>
      </Progress>
      <Typography type="body2" className={s.softCap}>
        The softcap amount is{' '}
        <Typography type="body2" weight={600} className={s.displayInline}>
          {softcap}
        </Typography>{' '}
        0GAS
      </Typography>

      <form className={s.form}>
        <NumberInput
          placeholder="Send"
          addon={
            <Dropdown options={availableOptions} value={sendToken} onChange={handleTokenChange} />
          }
          className={s.sendInput}
          value={sendAmount}
          onChange={handleSendAmountChange}
          errorText={sendError}
          maxLength={20}
          disabled={!canInput}
        />
        <NumberInput
          placeholder="Receive"
          addon={
            <div className={s.zeroGasCurrency}>
              <ZeroGasIcon width={32} height={32} />
              <Typography>0GAS</Typography>
            </div>
          }
          className={s.receiveInput}
          value={receiveAmount}
          onChange={handleReceiveAmountChange}
          errorText={receiveError}
          maxLength={20}
          disabled={!canInput}
        />
        <Typography type="body2" className={s.helpText}>
          You buy 0GAS Tokens by sending USDT to the contract
        </Typography>
        <Button variant="outlined" className={s.formButton} disabled={!canBuy} onClick={handleBuy}>
          <Typography type="body1" fontFamily="DrukCyr Wide" className={s.formButtonTypography}>
            Buy zerogas
          </Typography>
        </Button>
      </form>

      <div className={s.claim}>
        {isRefund ? (
          <>
            <Typography type="body2">
              Refund your
              <Typography type="body2" weight={600} className={s.displayInline}>
                {userBought}{' '}
              </Typography>{' '}
              0GAS tokens
            </Typography>
            <Button
              variant="outlined"
              className={s.claimButton}
              disabled={!canRefund}
              onClick={handleRefund}
            >
              <Typography type="body2" weight={700}>
                REFUND
              </Typography>
            </Button>
          </>
        ) : (
          <>
            <Typography type="body2">
              Claim your{' '}
              <Typography type="body2" weight={600} className={s.displayInline}>
                {userBought}
              </Typography>{' '}
              0GAS tokens
            </Typography>
            <Button
              variant="outlined"
              className={s.claimButton}
              disabled={!canClaim}
              onClick={handleClaim}
            >
              <Typography type="body2" weight={700}>
                {new Date() > stage2EndDate ? <>CLAIM</> : <>{claimDaysLeft} DAYS</>}
              </Typography>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
