import cn from 'clsx';

import { TokenomicData, tokenomics } from '@/appConstants';
import { zeroGasGifSrc } from '@/assets/img';
import { InfinityLine, Typography } from '@/components';
import { Divider } from '@/containers';
import { cssVariable } from '@/utils';

import { ProsList } from '../../components';

import { mock } from './components/Info/mock';
import { Chart, Info } from './components';

import s from './styles.module.scss';

interface TokenomicLabelProps {
  data: TokenomicData;
  align?: 'left' | 'right';
  className?: string;
}

const TokenomicLabel = ({ data, className, align = 'left' }: TokenomicLabelProps) => {
  return (
    <div className={cn(s.labelWrapper, className, s[align])}>
      <div className={cn(s.labelCircleArea)}>
        <div className={cn(s.labelCircle)}>
          <div className={cn(s.labelCircleColor)} style={cssVariable({ bgColor: data.color })} />
        </div>
      </div>
      <div className={cn(s.labelData)}>
        <Typography type="h2" className={s.labelPercent}>
          {data.percent}%
        </Typography>
        <Typography type="body2">{data.title}</Typography>
      </div>
    </div>
  );
};

export const Tokenomics = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.under}>
        <InfinityLine animation={{ duration: 20 }}>
          <Typography className={s.underText} type="h1" fontFamily="DrukCyr Wide" weight={900}>
            TOKENOMICS
          </Typography>
        </InfinityLine>
      </div>
      <div className={s.container} id="tokenomics">
        <Typography className={s.title} type="h2" fontFamily="DrukCyr Wide" weight={900}>
          TOKENOMICS
        </Typography>
        <div className={s.chartWrapper}>
          <div className={s.chartContent}>
            <Chart className={s.chart} data={tokenomics} />
            <img className={s.icon} src={zeroGasGifSrc} alt="zerogas" />
          </div>
          <div className={s.overlay}>
            <div className={s.overlayContent}>
              <TokenomicLabel className={s.percentFirst} data={tokenomics[3]} />
              <TokenomicLabel className={s.percentSecond} align="right" data={tokenomics[2]} />
              <TokenomicLabel className={s.percentThird} data={tokenomics[1]} />
              <TokenomicLabel className={s.percentFourth} align="right" data={tokenomics[0]} />
            </div>
          </div>
        </div>
        <Info {...mock} />
      </div>
      <Divider contained={false}>
        <InfinityLine animation={{ duration: 50 }}>
          <ProsList />
        </InfinityLine>
      </Divider>
    </div>
  );
};
