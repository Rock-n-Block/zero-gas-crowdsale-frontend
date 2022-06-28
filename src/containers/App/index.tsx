import { FC, useEffect } from 'react';

import { Footer, Header, RouterManager } from '@/containers';
import { useAnchorLink, useShallowSelector } from '@/hooks';
import crowdSaleSelectors from '@/store/crowdsale/selectors';

import { useOverlay } from '../Overlay';

import s from './App.module.scss';

const App: FC = () => {
  const isBuyOpen = useShallowSelector(crowdSaleSelectors.getProp('isOpen'));
  useAnchorLink();

  const { setShouldRender } = useOverlay();

  useEffect(() => {
    setShouldRender(isBuyOpen);
  }, [isBuyOpen, setShouldRender]);

  return (
    <div className={s.mainWrapper}>
      <Header />

      <div className={s.pageWrapper}>
        <RouterManager />
      </div>

      <Footer />
    </div>
  );
};
export default App;
