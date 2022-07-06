import { useMemo } from 'react';
import cn from 'clsx';

import s from './styles.module.scss';

type DataSetItem = {
  percent: number;
  color?: string;
};

interface ChartProps {
  data: DataSetItem[];
  className?: string;
}

export const Chart = ({ data, className }: ChartProps) => {
  const dataset = useMemo(() => {
    let accPercent = 0;
    const normalizedSet = data.map((d) => {
      accPercent += d.percent;
      return {
        ...d,
        percent: accPercent,
      };
    });
    normalizedSet.sort((a, b) => b.percent - a.percent);
    return normalizedSet;
  }, [data]);
  return (
    <div className={cn(s.wrapper, className)}>
      <svg height="210" width="210" viewBox="0 0 210 210">
        <circle cx="105" cy="105" r="100" stroke="black" strokeWidth="1" fill="transparent" />
        <circle cx="105" cy="105" r="50" stroke="black" strokeWidth="1" fill="transparent" />
        {dataset.map((element) => (
          <circle
            key={element.percent}
            cx="105"
            cy="105"
            strokeDasharray="475"
            strokeDashoffset={475 - 475 * (element.percent / 100)}
            r="75"
            stroke={element.color}
            strokeWidth="50"
            fill="transparent"
          />
        ))}
      </svg>
    </div>
  );
};
