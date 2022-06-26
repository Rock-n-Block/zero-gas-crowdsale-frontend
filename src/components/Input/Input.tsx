import { FC, ReactElement, useCallback } from 'react';
import cn from 'clsx';

import { Loader } from '@/assets/img';
import { validateOnlyNumbers } from '@/utils/validateOnlyNumbers';

import s from './styles.module.scss';

export interface InputProps {
  onChange: (newValue: string) => void;
  value: string;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  onlyNumbers?: boolean;
  className?: string;
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
  loading,
  disabled,
  onlyNumbers,
  placeholder = '',
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
      <input
        placeholder={placeholder}
        value={value}
        disabled={disabled || loading}
        onChange={(e) => handleChangeInput(e.target.value)}
        className={cn(s.input, { [s.withIcon]: loading }, inputClassName)}
      />
      <span className={cn(s.startIcon)}>{loading && <Loader />}</span>
    </div>
  );
};
