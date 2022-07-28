import { FC, useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { ErrorModal, Loader, SuccessModal } from '@/components';
import { ConnectWalletModal } from '@/components/ConnectWalletModal';
import { LoadingModal } from '@/components/LoadingModal';
import { Header, RouterManager } from '@/containers';
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
import { Modals, RequestStatus } from '@/types';

import { useOverlay } from '../Overlay';

import s from './App.module.scss';
import { ConnectWalletModal } from '@/components/ConnectWalletModal';

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
    [CrowdSaleActionType.CLAIM_RISED]: claimRisedStatus,
  } = useShallowSelector(uiSelectors.getUI);
  const {
    modalState: { txHash },
  } = useShallowSelector(modalsSelectors.getModals);
  const { activeModal } = useShallowSelector(modalsSelectors.getProp('modalState'));

  useEffect(() => {
    setShouldRender(isBuyOpen);
  }, [isBuyOpen, setShouldRender]);

  useEffect(() => {
    // If the user is authenticated fetch profile
    // TODO: redundant to authenticated getUserInfo in WalletConnect/useEffect/connect
    if (isAuthenticated) {
      dispatch(getUserInfo({ web3Provider: walletService.Web3() }));
    }

    dispatch(getCrowdsaleInfo({ web3Provider: walletService.Web3() }));
  }, [dispatch, isAuthenticated, walletService]);

  const handleInterval = useCallback(() => {
    dispatch(getTokens({ web3Provider: walletService.Web3() }));
  }, [dispatch, walletService]);

  useInterval(handleInterval, 60 * 1000);

  const handleCloseModal = useCallback(() => {
    dispatch(apiActions.reset(CrowdSaleActionType.BUY));
    dispatch(apiActions.reset(CrowdSaleActionType.CLAIM));
    dispatch(apiActions.reset(CrowdSaleActionType.REFUND));
    dispatch(apiActions.reset(CrowdSaleActionType.CLAIM_RISED));
    dispatch(closeModal());
  }, [dispatch]);

  const shouldShowLoader = useMemo(
    () => getUserInfoStatus === RequestStatus.REQUEST,
    [getUserInfoStatus],
  );
  const shouldShowLoading = useMemo(
    () => [buyStatus, claimStatus, refundStatus, claimRisedStatus].includes(RequestStatus.REQUEST),
    [buyStatus, claimRisedStatus, claimStatus, refundStatus],
  );
  const shouldShowSuccess = useMemo(
    () => [buyStatus, claimStatus, refundStatus, claimRisedStatus].includes(RequestStatus.SUCCESS),
    [buyStatus, claimRisedStatus, claimStatus, refundStatus],
  );
  const shouldShowError = useMemo(
    () => [buyStatus, claimStatus, refundStatus, claimRisedStatus].includes(RequestStatus.ERROR),
    [buyStatus, claimRisedStatus, claimStatus, refundStatus],
  );

  const handleActiveModalClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <>
      <div className={s.mainWrapper}>
        <Header />

        <div className={s.pageWrapper}>
          <RouterManager />
        </div>
      </div>

      <Loader visible={shouldShowLoader} />
      <LoadingModal visible={shouldShowLoading} onClose={handleCloseModal} />
      <SuccessModal
        visible={shouldShowSuccess}
        transactionHash={txHash}
        onClose={handleCloseModal}
      />
      <ErrorModal visible={shouldShowError} onClose={handleCloseModal} />
      <ConnectWalletModal
        visible={!isAuthenticated && activeModal === Modals.Connect}
        onClose={handleActiveModalClose}
      />
    </>
  );
};
export default App;
