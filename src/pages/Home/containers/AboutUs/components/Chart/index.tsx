/* eslint-disable react/no-unused-prop-types */
import { ReactElement, useMemo } from 'react';

import { zeroGasGifSrc } from '@/assets/img';
import { Typography } from '@/components';
import { cssVariable, trigonometricMath } from '@/utils';

import s from './styles.module.scss';

const FULL_CIRCLE_DEGREE = 360;

const calcPosition = (degree: number, radius: number) => {
  return {
    x: radius * (1 - Math.cos(trigonometricMath.toRadians(degree))),
    y: radius * (1 + Math.sin(trigonometricMath.toRadians(degree))),
  };
};

interface ChartSphereProps {
  children: ReactElement | string;
  degree: number;
  radius: number;
  offset: number;
}
const ChartSphere = ({ children, degree, radius, offset }: ChartSphereProps) => {
  return (
    <div
      className={s.chartElement}
      style={{ ...cssVariable(calcPosition(degree + offset, radius)) }}
    >
      {children}
    </div>
  );
};

interface ChartProps {
  radius?: number;
  elements?: (string | ReactElement)[];
  offset?: number;
}

const defaultConfig: Required<ChartProps> = {
  radius: 200,
  elements: [
    <Typography key="$" className={s.element}>
      $
    </Typography>,
    <Typography key="%" className={s.element}>
      %
    </Typography>,
  ],
  offset: -45,
};

const normalizeConfig = (config: ChartProps) => {
  return { ...defaultConfig, ...config };
};

export const Chart = (props: ChartProps) => {
  const { elements, radius, offset } = useMemo(() => normalizeConfig(props), [props]);
  const mainAngel = FULL_CIRCLE_DEGREE / elements.length;
  return (
    <div className={s.wrapper}>
      <img className={s.logo} src={zeroGasGifSrc} alt="zerogas" />
      <div className={s.content}>
        {elements.map((element, key) => (
          <ChartSphere
            key={JSON.stringify(element)}
            degree={mainAngel * key}
            offset={offset}
            radius={radius}
          >
            {element}
          </ChartSphere>
        ))}
      </div>
    </div>
  );
};
