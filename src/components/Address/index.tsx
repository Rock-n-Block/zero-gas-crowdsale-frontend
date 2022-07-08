import { useMemo } from 'react';

import s from './styles.module.scss';

interface AddressProps {
  address: string;
  start?: number;
  end?: number;
}

export const Address = ({ address, start = 5, end = 5 }: AddressProps) => {
  const normalizedAddress = useMemo(
    () => `${address.slice(0, start)}...${address.slice(end * -1)}`,
    [address, end, start],
  );
  return <span className={s.container}>{normalizedAddress}</span>;
};
