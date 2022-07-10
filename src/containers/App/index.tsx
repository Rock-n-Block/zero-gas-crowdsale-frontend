import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { ErrorModal, SuccessModal } from '@/components';
import { LoadingModal } from '@/components/LoadingModal';
import { Footer, Header, RouterManager } from '@/containers';
import { useAnchorLink, useInterval, useShallowSelector } from '@/hooks';
import { useWalletConnectorContext } from '@/services';
import apiActions from '@/store/api/actions';
import { getCrowdsaleInfo } from '@/store/crowdsale/actions';
import CrowdSaleActionType from '@/store/crowdsale/actionTypes';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import { closeModal } from '@/store/modals/reducer';
import modalsSelectors from '@/store/modals/selectors';
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
  const {
    [userActionTypes.GET_USER_INFO]: getUserInfoStatus,
    [CrowdSaleActionType.BUY]: buyStatus,
    [CrowdSaleActionType.CLAIM]: claimStatus,
    [CrowdSaleActionType.REFUND]: refundStatus,
  } = useShallowSelector(uiSelectors.getUI);
  const {
    modalState: { txHash },
  } = useShallowSelector(modalsSelectors.getModals);

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

  const handleCloseModal = useCallback(() => {
    dispatch(apiActions.reset(CrowdSaleActionType.BUY));
    dispatch(apiActions.reset(CrowdSaleActionType.CLAIM));
    dispatch(apiActions.reset(CrowdSaleActionType.REFUND));
    dispatch(closeModal());
  }, [dispatch]);

  const shouldShowLoading = useMemo(
    () => [getUserInfoStatus, buyStatus, claimStatus, refundStatus].includes(RequestStatus.REQUEST),
    [buyStatus, claimStatus, getUserInfoStatus, refundStatus],
  );

  const shouldShowSuccess = useMemo(
    () => [buyStatus, claimStatus, refundStatus].includes(RequestStatus.SUCCESS),
    [buyStatus, claimStatus, refundStatus],
  );

  const shouldShowError = useMemo(
    () => [buyStatus, claimStatus, refundStatus].includes(RequestStatus.ERROR),
    [buyStatus, claimStatus, refundStatus],
  );

  return (
    <>
      <div className={s.mainWrapper}>
        <Header />

        <div className={s.pageWrapper}>
          <RouterManager />
        </div>

        <Footer />
      </div>

      <LoadingModal visible={shouldShowLoading} />
      <SuccessModal
        visible={shouldShowSuccess}
        transactionHash={txHash}
        onClose={handleCloseModal}
      />
      <ErrorModal visible={shouldShowError} onClose={handleCloseModal} />
    </>
  );
};
export default App;
