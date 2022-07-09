import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import cn from 'clsx';

import { ZeroGasIcon } from '@/assets/img';
import { Button, Dropdown, Input, Progress, Typography } from '@/components';
import { TOption } from '@/components/Dropdown';
import { useShallowSelector } from '@/hooks';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import tokenSelectors from '@/store/tokens/selectors';
import userSelector from '@/store/user/selectors';
import { Token } from '@/types';
import { getDaysLeft } from '@/utils';

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
}

export const BuyForm = ({ className }: BuyFormProps) => {
  const [selectedToken, setSelectedToken] = useState<TOption | undefined>(undefined);
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [sendError, setSendError] = useState('');
  const [receiveError, setReceiveError] = useState('');

  const { tokens } = useShallowSelector(tokenSelectors.getTokens);
  const { tokenBalances } = useShallowSelector(userSelector.getUser);
  const { hardcap, totalBought, userBought, sellEnd, minPurchase, maxPurchase, zeroGasPrice } =
    useShallowSelector(crowdSaleSelectors.getCrowdSale);

  const tokenOptions = useMemo<TOption[]>(
    () => Object.values(tokens).map((token) => getTokenOption(token)),
    [tokens],
  );
  const sendToken = useMemo(() => selectedToken || tokenOptions[0], [selectedToken, tokenOptions]);
  const availableOptions = useMemo(
    () => tokenOptions.filter((token) => token.value !== sendToken?.value),
    [sendToken?.value, tokenOptions],
  );

  const claimDaysLeft = useMemo(() => getDaysLeft(sellEnd), [sellEnd]);

  const handleValidateSendAmount = useCallback(
    (value: number, newToken?: TOption) => {
      if (value > tokenBalances[newToken?.value || sendToken.value]) {
        setSendError(
          `Not enough amount on wallet (${tokens[newToken?.value || sendToken.value].symbol})`,
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
      } else {
        setReceiveError('');
      }
    },
    [maxPurchase, minPurchase],
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
      // Don't allow enter not a number
      if (Number.isNaN(+value) || value.length > 20) {
        return;
      }
      setSendAmount(value);
      const newReceiveAmount = getReceiveAmount(
        +value,
        tokens[sendToken.value].value,
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
      // Don't allow enter not a number
      if (Number.isNaN(+value) || value.length > 20) {
        return;
      }
      setReceiveAmount(value);
      const newSendAmount = getReceiveAmount(+value, zeroGasPrice, tokens[sendToken.value].value);
      setSendAmount(newSendAmount.toString());

      handleValidateSendAmount(newSendAmount);
      handleValidateReceiveAmount(+value);
    },
    [handleValidateReceiveAmount, handleValidateSendAmount, sendToken?.value, tokens, zeroGasPrice],
  );

  return (
    <div className={cn(s.card, className)}>
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
            <Dropdown options={availableOptions} value={sendToken} onChange={handleTokenChange} />
          }
          className={s.sendInput}
          value={sendAmount}
          onChange={handleSendAmountChange}
          errorText={sendError}
        />
        <Input
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
        />
        <Typography type="body2" className={s.helpText}>
          You buy 0GAS Tokens by sending USDT to the contract
        </Typography>
        <Button className={s.formButton} disabled={!receiveAmount || !!receiveError}>
          <Typography type="body1" fontFamily="DrukCyr Wide" className={s.formButtonTypography}>
            Buy zerogas
          </Typography>
        </Button>
      </form>

      <div className={s.claimIn}>
        <Typography type="body2">Claim your {userBought} 0GAS tokens in </Typography>
        <Button className={s.claimInButton} disabled>
          <Typography type="body2" weight={700}>
            {claimDaysLeft} DAYS
          </Typography>
        </Button>
      </div>
    </div>
  );
};
