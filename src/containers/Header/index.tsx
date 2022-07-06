import { FC, useEffect, useState } from 'react';

import { useBreakpoints } from '@/hooks';

import Divider from '../Divider';

import { LinksList, Menu } from './components';

import s from './Header.module.scss';

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTablet] = useBreakpoints([768]);

  useEffect(() => {
    // if window size is larger than 768px, update open menu state
    if (!isTablet) {
      setIsOpen(false);
    }
  }, [isTablet]);

  return (
    <header className={s.headerWrapper}>
      <Divider classNames={{ container: s.headerContent, wrapper: s.headerContentWrapper }}>
        <>
          <LinksList isOpen={isOpen} setIsOpen={setIsOpen} />
          <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      </Divider>
    </header>
  );
};

export default Header;
