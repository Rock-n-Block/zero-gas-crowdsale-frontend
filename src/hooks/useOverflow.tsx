import { Context, createContext, ReactElement, useContext, useMemo, useState } from 'react';

interface IOverflowContext {
  overflow: string;
  setOverflow: (overflow: string) => void;
}

const OverflowContext = createContext<IOverflowContext | null>(null);

interface OverflowProviderProps {
  children: ReactElement;
}

export const OverflowProvider = ({ children }: OverflowProviderProps) => {
  const [overflow, setOverflow] = useState('auto');

  const value = useMemo(() => ({ overflow, setOverflow }), [overflow]);
  return <OverflowContext.Provider value={value}>{children}</OverflowContext.Provider>;
};

const useOverflow = () => useContext(OverflowContext as Context<IOverflowContext>);
export default useOverflow;
