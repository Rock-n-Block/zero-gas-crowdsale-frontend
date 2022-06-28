/* eslint-disable no-plusplus */
import { FC, PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import cn from 'clsx';

import { cssVariable, logger } from '@/utils';

import { TAnimationDirection, TAnimationProps, TClassNames } from './types';

import s from './styles.module.scss';

export interface InfinityLineProps {
  animation?: TAnimationProps;
  className?: TClassNames;
}

const minimalQueue = 2;

const defaultConf: Required<TAnimationProps> = {
  direction: 'rtl',
  duration: 10,
};

const getAnimationName = (animName: TAnimationDirection | undefined) => {
  switch (animName) {
    case 'ltr': {
      return s[animName];
    }
    case 'rtl': {
      return s[animName];
    }
    default: {
      return animName;
    }
  }
};

const normalizeAnimationConfig = (animation: TAnimationProps | undefined) => {
  const animConf = animation || {};
  if (!animConf.direction) {
    animConf.direction = defaultConf.direction;
  }
  if (!animConf.duration) {
    animConf.duration = defaultConf.duration;
  }
  return animConf as Required<TAnimationProps>;
};

/**
 * @description generate the infinity line component
 * @param {TClassNames} [className] - object which contains list of classes
 * * **wrapper** - the wrapper class name
 * * **items** - list of classes for each element
 * @param {TAnimationProps} [animation] - animation configuration
 * * **duration** - duration of the animation
 * * **direction** - ltr | rtl  or any other class which contains animation name
 */
export const InfinityLine: FC<PropsWithChildren<InfinityLineProps>> = ({
  className,
  animation,
  children,
}) => {
  const idx = useRef(0);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const animConf = useMemo(() => normalizeAnimationConfig(animation), [animation]);
  const [countOfCopies, setCountOfCopies] = useState(minimalQueue);

  useEffect(() => {
    return () => {
      idx.current = 0;
    };
  }, []);

  const calcElements = useCallback(() => {
    if (wrapperRef.current && containerRef.current) {
      const wrapperWidth = wrapperRef.current.offsetWidth;
      const contentWidth = containerRef.current.offsetWidth;
      if (wrapperWidth - contentWidth > 0) {
        setCountOfCopies(countOfCopies + 1);
      }
    }
  }, [countOfCopies]);

  useEffect(() => {
    calcElements();
    window.addEventListener('resize', calcElements);
    return () => {
      window.removeEventListener('resize', calcElements);
    };
  }, [calcElements]);

  if (!children) {
    logger({
      module: 'Infinity line',
      msg: 'Where is nothing to infinite, so the component return null',
      type: 'warn',
    });
    return null;
  }

  const queue = new Array(countOfCopies).fill(children).map((child, id) => {
    return (
      <div
        className={cn(
          s.infinityLineItem,
          className?.item?.[id],
          getAnimationName(animConf.direction),
        )}
        style={{ ...cssVariable({ id, duration: animConf.duration }) }}
        key={idx.current++}
      >
        {child}
      </div>
    );
  });

  return (
    <div className={cn(s.infinityLine, className?.wrapper)} ref={wrapperRef}>
      <div className={cn(s.infinityLineContainer, className?.container)} ref={containerRef}>
        {queue}
      </div>
    </div>
  );
};
