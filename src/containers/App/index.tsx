import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Footer, Header, RouterManager } from '@/containers';
import { useAnchorLink, useShallowSelector } from '@/hooks';
import { useWalletConnectorContext } from '@/services';
import { getCrowdsaleInfo } from '@/store/crowdsale/actions';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import { getUserInfo } from '@/store/user/actions';
import userSelector from '@/store/user/selectors';

import { useOverlay } from '../Overlay';

import s from './App.module.scss';

const App: FC = () => {
  const { address } = useShallowSelector(userSelector.getUser);
  const isBuyOpen = useShallowSelector(crowdSaleSelectors.getProp('isOpen'));
  useAnchorLink();
  const { setShouldRender } = useOverlay();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();

  useEffect(() => {
    setShouldRender(isBuyOpen);
  }, [isBuyOpen, setShouldRender]);

  useEffect(() => {
    // If the user is authenticated fetch profile and crowdsale data
    if (address) {
      dispatch(getUserInfo({ web3Provider: walletService.Web3() }));
      dispatch(getCrowdsaleInfo({ web3Provider: walletService.Web3() }));
    }
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
