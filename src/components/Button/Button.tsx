import { FC, PropsWithChildren, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import cn from 'clsx';

import { Loader } from '@/assets/img';

import { ColorTheme, VariantTheme } from './types';

import s from './styles.module.scss';

export interface ButtonProps {
  onClick?: () => void;
  color?: ColorTheme;
  variant?: VariantTheme;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
  href?: string;
}

/**
 * @param {ColorTheme} [color = 'blue'] - main color
 * @param {VariantTheme} [variant = 'filled'] - variant
 * * filled - with background
 * * outlined - only border
 * * text - button with only text [no padding, height, bg, etc]
 * @param {name} [startIcon = ''] - icon before text
 * @param {string} [className] - the wrapper class name
 * @param {string} [to] - create Link from react-router-dom element
 * @param {string} [href] - create native html link element
 * @param {boolean} [disabled] - disable state
 * @param {boolean} [loading] - loading state
 * @param {() => void} [onClick] - function which will be called when button has been clicked
 * @param {ReactElement} [children] - element to pass inside component
 */
export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  color = 'common',
  variant = 'filled',
  startIcon,
  endIcon,
  children,
  onClick,
  disabled,
  loading,
  href,
  to,
}) => {
  const button = (
    <button
      tabIndex={0}
      onClick={onClick}
      disabled={disabled || loading}
      type="button"
      className={cn(s.button, s[color], s[variant], !to && !href && className)}
    >
      {startIcon && <div className={s.startIcon}>{startIcon}</div>}
      {children}
      {endIcon && <div className={s.endIcon}>{loading ? <Loader /> : endIcon}</div>}
    </button>
  );

  if (to)
    return (
      <Link className={cn(s.link, className)} to={to}>
        {button}
      </Link>
    );
  if (href)
    return (
      <a
        type="button"
        className={cn(s.link, className)}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {button}
      </a>
    );

  return button;
};
