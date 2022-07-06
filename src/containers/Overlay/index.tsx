import {
  Context,
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import cn from 'clsx';

import { useScroll } from '@/hooks';

import s from './styles.module.scss';

interface IOverlayContext {
  shouldRender: boolean;
  setShouldRender: (state: boolean) => void;
}

const OverlayContext = createContext<IOverlayContext | null>(null);

interface OverlayProviderProps {
  children: ReactElement | string;
  overlayChildren?: ReactElement[];
}

export const OverlayProvider = ({ children, overlayChildren }: OverlayProviderProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const { setIsScrollActive } = useScroll({});

  useEffect(() => {
    setIsScrollActive(!shouldRender);
  }, [shouldRender, setIsScrollActive]);

  const value = useMemo(() => ({ shouldRender, setShouldRender }), [shouldRender]);
  return (
    <OverlayContext.Provider value={value}>
      {children}
      <div className={cn(s.overlay, { [s.render]: shouldRender })}>
        <div className={s.overlayContent}>
          {overlayChildren?.map((overlayChild) => overlayChild)}
        </div>
      </div>
    </OverlayContext.Provider>
  );
};

export const useOverlay = () => useContext(OverlayContext as Context<IOverlayContext>);
