import { createElement, FC, PropsWithChildren } from 'react';
import cn from 'clsx';

import { cssVariable } from '@/utils';

import s from './styles.module.scss';

enum Types {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  body1 = 'p',
  body2 = 'p',
  sub1 = 'p',
  sub2 = 'p',
  label1 = 'p',
  label2 = 'p',
}

export interface TypographyProps {
  type: keyof typeof Types;
  align?: 'center' | 'left' | 'right';
  weight?: 400 | 500 | 600 | 700 | 800 | 900;
  lineHeight?: string;
  fontFamily?: 'Poppins' | 'DrukCyr' | 'PPRightSans';
  color?: 'dark-0';
  className?: string;
}

/**
 * @param {'center' | 'left' | 'right'} [align = 'left'] - text align
 * * center
 * * left
 * * right
 * @param {400 | 500 | 600 | 700 | 800 | 900} [weight = ''] - text font weight
 * @param {'normal' | 'medium' | 'semiBold' | 'bold'} [type = ''] - text type
 */
export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  type,
  align = 'left',
  weight,
  color = 'default',
  className,
  children,
  lineHeight,
  fontFamily = 'Poppins',
  ...rest
}) => {
  const props = {
    className: cn(s.typography, s[type], align && s[align], s[color], className),
    style: {
      ...cssVariable({
        'line-height': lineHeight,
        'font-weight': weight,
        'font-family': `'${fontFamily}'`,
      }),
    },
    ...rest,
  };
  return createElement(Types[type], props, children);
};
