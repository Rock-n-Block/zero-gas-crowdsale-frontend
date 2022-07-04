import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Footer, Header, RouterManager } from '@/containers';
import { useAnchorLink, useShallowSelector } from '@/hooks';
import crowdSaleSelectors from '@/store/crowdsale/selectors';

import { useOverlay } from '../Overlay';

import s from './App.module.scss';
import { getCrowdsaleInfo } from '@/store/crowdsale/actions';
import { useWalletConnectorContext } from '@/services';

const App: FC = () => {
  const isBuyOpen = useShallowSelector(crowdSaleSelectors.getProp('isOpen'));
  useAnchorLink();
  const { setShouldRender } = useOverlay();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  useEffect(() => {
    setShouldRender(isBuyOpen);
  }, [isBuyOpen, setShouldRender]);

  useEffect(() => {
    dispatch(getCrowdsaleInfo({ web3Provider: walletService.Web3() }));
  }, [dispatch, walletService]);

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
