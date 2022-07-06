import { useCallback, useEffect, useState } from 'react';

export type TUseBreakpoints = (sizes: number[]) => boolean[];
const useBreakpoints: TUseBreakpoints = (sizes) => {
  const [windowSize, setWindowSizes] = useState<boolean[]>([]);

  const onWindowResize = useCallback(() => {
    const width = window.innerWidth;
    const newWindowSizes = sizes.map((s) => s > width);
    if (windowSize.some((s, k) => s !== newWindowSizes[k]) || !windowSize.length) {
      setWindowSizes(newWindowSizes);
    }
  }, [sizes, windowSize]);

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  useEffect(() => {
    onWindowResize();
  }, [onWindowResize]);

  return windowSize;
};

export default useBreakpoints;
