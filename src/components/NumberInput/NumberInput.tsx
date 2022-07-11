import { ChangeEvent, FC, useCallback } from 'react';

import { Input, InputProps } from '../Input';

export const NumberInput: FC<InputProps> = ({ onChange, ...rest }) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // Don't allow enter not a number
      if (Number.isNaN(+event.target.value)) {
        return;
      }

      onChange?.(event);
    },
    [onChange],
  );

  return <Input {...rest} onChange={handleChange} />;
};
