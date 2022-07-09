import { FC, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { LoadingModal } from '@/components/LoadingModal';
import { Footer, Header, RouterManager } from '@/containers';
import { useAnchorLink, useInterval, useShallowSelector } from '@/hooks';
import { useWalletConnectorContext } from '@/services';
import { getCrowdsaleInfo } from '@/store/crowdsale/actions';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import { getTokens } from '@/store/tokens/actions';
import uiSelectors from '@/store/ui/selectors';
import { getUserInfo } from '@/store/user/actions';
import userActionTypes from '@/store/user/actionTypes';
import userSelector from '@/store/user/selectors';
import { RequestStatus } from '@/types';

import { useOverlay } from '../Overlay';

import s from './App.module.scss';

const App: FC = () => {
  const isAuthenticated = useShallowSelector(userSelector.getIsAuthenticated);
  const isBuyOpen = useShallowSelector(crowdSaleSelectors.getProp('isOpen'));
  useAnchorLink();
  const { setShouldRender } = useOverlay();
  const dispatch = useDispatch();
  const { walletService } = useWalletConnectorContext();
  const { [userActionTypes.GET_USER_INFO]: getUserInfoStatus } = useShallowSelector(
    uiSelectors.getUI,
  );

  useEffect(() => {
    setShouldRender(isBuyOpen);
  }, [isBuyOpen, setShouldRender]);

  useEffect(() => {
    // If the user is authenticated fetch profile and crowdsale data
    if (isAuthenticated) {
      dispatch(getUserInfo({ web3Provider: walletService.Web3() }));
      dispatch(getCrowdsaleInfo({ web3Provider: walletService.Web3() }));
    }
  }, [dispatch, isAuthenticated, walletService]);

  const handleInterval = useCallback(() => {
    dispatch(getTokens({ web3Provider: walletService.Web3() }));
  }, [dispatch, walletService]);

  useInterval(handleInterval, 60 * 1000);

  return (
    <>
      <div className={s.mainWrapper}>
        <Header />

        <div className={s.pageWrapper}>
          <RouterManager />
        </div>

        <Footer />
      </div>

      <LoadingModal visible={getUserInfoStatus === RequestStatus.REQUEST} />
    </>
  );
};
export default App;
