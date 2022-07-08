import cn from 'clsx';

import { ZeroGasIcon } from '@/assets/img';
import { Typography } from '@/components';
import { useShallowSelector } from '@/hooks';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import tokenSelectors from '@/store/tokens/selectors';

import { getFormatFiat } from '../../helper';

import s from './styles.module.scss';

export interface TokenListProps {
  className?: string;
}

export const TokenList = ({ className }: TokenListProps) => {
  const { zeroGasPrice } = useShallowSelector(crowdSaleSelectors.getCrowdSale);
  const { tokens } = useShallowSelector(tokenSelectors.getTokens);

  return (
    <div className={cn(s.card, className)}>
      <Typography type="body1" fontFamily="DrukCyr Wide" weight={900} className={s.cardTitle}>
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
  );
};
