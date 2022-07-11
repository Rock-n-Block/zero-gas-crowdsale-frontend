import { ChangeEvent, FC, useCallback } from 'react';

import { Input, InputProps } from '../Input';

export const NumberInput: FC<InputProps> = ({ value, onChange, ...rest }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // Don't allow enter not a number
      if (
        Number.isNaN(+event.target.value) ||
        event.target.value.includes(' ') ||
        event.target.value === '00'
      ) {
        return;
      }

      onChange?.(event);
    },
    [onChange],
  );

  return <Input {...rest} value={(!!value && +value) || ''} onChange={handleChange} />;
};
