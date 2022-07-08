import { FC, ReactElement, useCallback, useRef, useState } from 'react';
import cn from 'clsx';

import { ArrowDownIcon } from '@/assets/img';
import { useOutsideClick } from '@/hooks';

import s from './styles.module.scss';

export type TOption = {
  value: string;
  label?: string | ReactElement;
  icon?: ReactElement;
};

interface DropDownProps {
  options: TOption[];
  value: TOption;
  onChange: (opt: TOption) => void;
  closeOnSelect?: boolean;
  closeOnOutsideClick?: boolean;
  disableSelected?: boolean;
  wrapperClassName?: string;
  onlyIcon?: boolean;
}

interface DropdownValueProps {
  value: TOption;
  onClick?: (opt: TOption) => void;
  selected?: boolean;
  disableSelected?: boolean;
  className?: string;
  onlyIcon?: boolean;
}

const DropdownValue: FC<DropdownValueProps> = ({
  value,
  onClick,
  selected,
  disableSelected,
  className,
  onlyIcon,
}) => {
  return (
    <button
      type="button"
      disabled={disableSelected ? selected : false}
      onClick={() => onClick?.(value)}
      className={cn(s.item_wrapper, className)}
    >
      {value?.icon && (
        <div className={cn(s.item_wrapper_icon, { [s.onlyIcon]: onlyIcon })}>{value?.icon}</div>
      )}
      <div className={cn(s.item_wrapper_value, { [s.onlyIcon]: onlyIcon })}>
        {value?.label || value?.value}
      </div>
    </button>
  );
};

export const Dropdown: FC<DropDownProps> = ({
  options,
  value,
  onChange,
  closeOnSelect = true,
  disableSelected = true,
  closeOnOutsideClick = true,
  wrapperClassName,
  onlyIcon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const headRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback(() => {
    if (closeOnOutsideClick) {
      setIsOpen(false);
    }
  }, [closeOnOutsideClick]);

  useOutsideClick(bodyRef, handleOutsideClick, headRef);

  const handleSelectOption = useCallback(
    (opt: TOption) => {
      onChange(opt);
      if (closeOnSelect) {
        setIsOpen(false);
      }
    },
    [closeOnSelect, onChange],
  );

  const handleHeadClick = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  return (
    <div ref={headRef} className={cn(s.wrapper, { [s.open]: isOpen }, wrapperClassName)}>
      <div
        tabIndex={0}
        role="button"
        onKeyDown={() => {}}
        onClick={handleHeadClick}
        className={s.head}
      >
        <DropdownValue onlyIcon={onlyIcon} className={s.head_content} value={value} />

        <div className={cn(s.arrow)}>
          <ArrowDownIcon />
        </div>
      </div>
      <div ref={bodyRef} className={s.body}>
        {options.map((opt) => (
          <DropdownValue
            onlyIcon={onlyIcon}
            disableSelected={disableSelected}
            key={opt.value}
            value={opt}
            selected={value?.value === opt.value}
            onClick={handleSelectOption}
          />
        ))}
      </div>
    </div>
  );
};
