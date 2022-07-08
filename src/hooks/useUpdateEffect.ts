import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * A custom useEffect hook that triggers on updates and not on initial mount
 */
export default function useUpdateEffect(effect: EffectCallback, deps: DependencyList = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }

    return () => {};
  }, deps);
}
