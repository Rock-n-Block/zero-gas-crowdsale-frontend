export type TAnimationDirection = 'ltr' | 'rtl';

export type TAnimationProps = {
  duration?: number;
  direction?: TAnimationDirection;
};

export type TClassNames = {
  wrapper?: string;
  container?: string;
  item?: string[];
};
