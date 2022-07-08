import { useCallback, useMemo, useState } from 'react';
import cn from 'clsx';

import { ZeroGasIcon } from '@/assets/img';
import { Button, Dropdown, Input, Progress, Typography } from '@/components';
import { TOption } from '@/components/Dropdown';
import { useShallowSelector } from '@/hooks';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import tokenSelectors from '@/store/tokens/selectors';
import { Token } from '@/types';

import { getFormatNumber } from '../../helper';

import s from './styles.module.scss';

const getTokenOption = (token: Token): TOption => ({
  value: token.address,
  icon: <img src={token.image} width={32} height={32} alt={`${token.symbol} logo`} />,
  label: token.symbol,
});

export interface BuyFormProps {
  className?: string;
}

export const BuyForm = ({ className }: BuyFormProps) => {
  const [selectedToken, setSelectedToken] = useState<TOption | undefined>(undefined);

  const { tokens } = useShallowSelector(tokenSelectors.getTokens);
  const { hardcap, totalBought } = useShallowSelector(crowdSaleSelectors.getCrowdSale);

  const tokenOptions = useMemo<TOption[]>(
    () => Object.values(tokens).map((token) => getTokenOption(token)),
    [tokens],
  );
  const sendToken = useMemo(() => selectedToken || tokenOptions[0], [selectedToken, tokenOptions]);
  const availableOptions = useMemo(
    () => tokenOptions.filter((token) => token.value !== sendToken?.value),
    [sendToken?.value, tokenOptions],
  );

  const handleTokenChange = useCallback((option: TOption) => setSelectedToken(option), []);

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
          <Typography type="body1" fontFamily="DrukCyr Wide" className={s.formButtonTypography}>
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
  );
};
