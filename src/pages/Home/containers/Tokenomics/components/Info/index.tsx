import { ReactElement } from 'react';

import { zeroGasGifSrc } from '@/assets/img';
import { Typography } from '@/components';

import s from './styles.module.scss';

export interface InfoProps {
  symbol: string;
  totalSupply: number;
  presale: number;
  uniswap: number;
  team: number;
  vesting: number;
  price: number;
  minBuy: number;
  maxBuy: number;
  listingPrice: number;
  listingProfit: number;
  softCap: number;
  hardCap: number;
}

interface ElementProps {
  title: string;
  value: string | number | ReactElement;
  softness?: 'soft' | 'hard';
}

const Element = ({ title, value, softness = 'soft' }: ElementProps) => {
  return (
    <div className={s.element}>
      <Typography
        className={s.title}
        fontFamily="Poppins"
        type="body2"
        weight={softness === 'hard' ? 600 : 400}
      >
        {title}
      </Typography>
      <Typography
        className={s.value}
        fontFamily="Poppins"
        type="body2"
        weight={softness === 'hard' ? 600 : 400}
        align="right"
      >
        {value}
      </Typography>
    </div>
  );
};

export const Info = ({
  symbol,
  totalSupply,
  presale,
  uniswap,
  team,
  vesting,
  price,
  minBuy,
  maxBuy,
  listingPrice,
  listingProfit,
  softCap,
  hardCap,
}: InfoProps) => {
  return (
    <div className={s.wrapper}>
      <Element
        title="TOKEN SYMBOL"
        value={
          <>
            <img className={s.logo} src={zeroGasGifSrc} alt="zerogas" />
            {symbol}
          </>
        }
        softness="hard"
      />
      <hr />
      <Element title="Total supply" value={totalSupply.toLocaleString()} softness="hard" />
      <Element
        title="Presales (10% Website crowdsale, 40% listed on exchanges)"
        value={`${presale}%`}
      />
      <Element title="Uniswap" value={`${uniswap}%`} />
      <Element title="ZEROGAS team " value={`${team}%`} />
      <Element title="Vesting for exchanges" value={`${vesting}%`} />
      <hr />
      <Element title="Presale price" value={`$${price}`} softness="hard" />
      <Element title="Min Buy" value={`$${minBuy.toLocaleString()} Value`} softness="hard" />
      <Element title="Max Buy" value={`$${maxBuy.toLocaleString()} Value`} softness="hard" />
      <hr />
      <Element
        title="Listing price"
        value={`${listingProfit}% profit = ${listingPrice.toLocaleString()}$`}
        softness="hard"
      />
      <hr />
      <Element title="Soft Cap" value={`${softCap.toLocaleString()} 0GAS Value`} softness="hard" />
      <Element title="Hard Cap" value={`${hardCap.toLocaleString()} 0GAS Value`} softness="hard" />
    </div>
  );
};
