import { useEffect, useState } from 'react';

interface useScrollProps {
  element?: HTMLElement;
  overflow?: ('x' | 'y')[];
}

const useScroll = ({ element = document.body, overflow = ['x', 'y'] }: useScrollProps) => {
  const [isScrollActive, setIsScrollActive] = useState(true);

  useEffect(() => {
    if (element) {
      overflow.forEach((type) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element.style[`overflow${type.toUpperCase()}`] = isScrollActive ? 'auto' : 'hidden';
      });
    }
  }, [element, isScrollActive, overflow]);

  return { isScrollActive, setIsScrollActive };
};

export default useScroll;