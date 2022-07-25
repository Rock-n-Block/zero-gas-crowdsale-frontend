import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { useWalletConnectorContext } from '@/services';
import { updateCrowdSaleOpenState } from '@/store/crowdsale/reducer';
import crowdSaleSelectors from '@/store/crowdsale/selectors';
import { getStage } from '@/store/crowdsale/utils';
import { setActiveModal } from '@/store/modals/reducer';
import userSelector from '@/store/user/selectors';
import { Modals, Stage } from '@/types';

import useShallowSelector from './useShallowSelector';

export default function useHandleBuyClick() {
  const isAuthenticated = useShallowSelector(userSelector.getIsAuthenticated);
  const { hardcap, stage1StartDate, stage1EndDate, stage2StartDate, stage2EndDate, totalBought } =
    useShallowSelector(crowdSaleSelectors.getCrowdSale);
  const dispatch = useDispatch();
  const { connect } = useWalletConnectorContext();

  const stage = useMemo(
    () =>
      getStage({
        stage1StartDate,
        stage1EndDate,
        stage2StartDate,
        stage2EndDate,
        totalBought,
        hardcap,
      }),
    [hardcap, stage1EndDate, stage1StartDate, stage2EndDate, stage2StartDate, totalBought],
  );

  const handleBuyClick = useCallback(() => {
    if (isAuthenticated || stage === Stage.UNINITIALIZED) {
      dispatch(updateCrowdSaleOpenState(true));
    } else {
      dispatch(
        setActiveModal({
          activeModal: Modals.Connect,
        }),
      );
    }
  }, [dispatch, isAuthenticated, stage]);

  return handleBuyClick;
}
