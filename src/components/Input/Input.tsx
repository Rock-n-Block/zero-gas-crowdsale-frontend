import { ReactElement, useCallback, FC } from 'react';
import cn from 'clsx';

import { Loader } from '@/assets/img';
import { validateOnlyNumbers } from '@/utils/validateOnlyNumbers';

import s from './styles.module.scss';

export interface InputProps {
  onChange: (newValue: string) => void;
  value: string;
  color?: 'gray' | 'white';
  placeholder?: string;
  label?: ReactElement | string;
  labelEnd?: ReactElement | string;
  variant?: 'default' | 'rounded';
  startIcon?: ReactElement | string;
  loading?: boolean;
  disabled?: boolean;
  onlyNumbers?: boolean;
  className?: string;
  labelEndClassName?: string;
  inputClassName?: string;
}

/**
 * @param {(newValue: string) => void} [onChange] - function which will be called when value has been changed
 * @param {'white' | 'gray'} [color = 'gray'] - main color
 * * white - white background
 * * gray - gray background
 * @param {string} [placeholder = ''] - placeholder for input
 * @param {string} [label] - label at the start
 * @param {string | ReactElement} [labelEnd] - label at the end
 * @param {boolean} [loading] - if loading then input has a <Loader /> svg
 * @param {boolean} [disabled] - if input disabled
 * @param {boolean} [onlyNumbers] - validate only numbers with regExp
 * @param {'default' | 'rounded'} [variant = 'gray'] - main color
 * * default - height = 56px, border-radius = 10px
 * * rounded - height = 40px, border-radius = 20px
 */
export const Input: FC<InputProps> = ({
  className,
  value,
  onChange,
  label,
  startIcon,
  loading,
  disabled,
  color = 'gray',
  variant = 'default',
  labelEnd,
  onlyNumbers,
  placeholder = '',
  labelEndClassName,
  inputClassName,
}) => {
  const handleChangeInput = useCallback(
    (changeValue: string) => {
      if (!onlyNumbers) onChange(changeValue);

      if (validateOnlyNumbers(changeValue)) onChange(changeValue);
    },
    [onlyNumbers, onChange],
  );

  return (
    <div className={cn(s.inputWrapper, className)}>
      {(label || labelEnd) && (
        <div className={s.labelWrapper}>
          <span className={cn(s.label)}>{label}</span>
          <span className={cn(s.labelEnd, labelEndClassName)}>{labelEnd}</span>
        </div>
      )}
      <input
        placeholder={placeholder}
        value={value}
        disabled={disabled || loading}
        onChange={(e) => handleChangeInput(e.target.value)}
        className={cn(
          s.input,
          s[color],
          s[variant],
          { [s.withIcon]: startIcon || loading },
          inputClassName,
        )}
      />
      <span className={cn(s.startIcon)}>{(loading && <Loader />) || startIcon}</span>
    </div>
  );
};
