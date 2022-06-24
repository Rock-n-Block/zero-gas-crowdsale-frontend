import { createElement, FC, PropsWithChildren } from 'react';
import cn from 'clsx';

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
  weight?: 'normal' | 'medium' | 'semiBold' | 'bold';
  height?: number | string;
  spacing?: number | string;
  color?:
    | 'default'
    | 'white'
    | 'accent'
    | 'label1'
    | 'label2'
    | 'details'
    | 'pink'
    | 'blue'
    | 'gray'
    | 'purple';
  isUpper?: boolean;
  className?: string;
}

/**
 * @param {'center' | 'left' | 'right'} [align = 'left'] - text align
 * * center
 * * left
 * * right
 * @param {'normal' | 'medium' | 'semiBold' | 'bold'} [weight = ''] - text font weight
 * * normal = 400
 * * medium = 500
 * * semiBold = 600
 * * bold = 700
 * @param {'normal' | 'medium' | 'semiBold' | 'bold'} [type = ''] - text type
 * * h1 = h1 / 34px,
 * * h2 = h2 / 29px,
 * * h3 = h3 / 28px,
 * * h4 = h4 / 21px,
 * * h5 = h5 / 18px,
 * * h6 = h6 / 17px,
 * * body1 = p / 16px,
 * * body2 = p / 14px,
 * * sub1 = p / 13px,
 * * sub2 = p / 12px,
 * * label1 = p / 11px,
 * * label2 = p / 10px,
 */
export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  type,
  align = 'left',
  weight,
  height,
  spacing,
  color = 'default',
  isUpper = false,
  className,
  children,
  ...rest
}) => {
  const styles = {
    lineHeight: height && `${height}px`,
    letterSpacing: spacing && `${spacing}em`,
    textTransform: isUpper && 'uppercase',
  };
  const props = {
    className: cn(
      s.typography,
      s[type],
      align && s[align],
      weight && s[weight],
      s[color],
      className,
    ),
    style: styles,
    ...rest,
  };
  return createElement(Types[type], props, children);
};
