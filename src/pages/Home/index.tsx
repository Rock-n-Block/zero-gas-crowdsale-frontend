import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import { WalletModal } from '@/components';
import { useShallowSelector } from '@/hooks';
import { setActiveModal } from '@/store/modals/reducer';
import modalsSelectors from '@/store/modals/selectors';
import { Modals } from '@/types';

import { AboutUs, Main, Partners, RoadMap, Tokenomics } from './containers';

const Home = () => {
  const { activeModal } = useShallowSelector(modalsSelectors.getProp('modalState'));
  const dispatch = useDispatch();

  const handleActiveModalClose = useCallback(() => {
    dispatch(
      setActiveModal({
        activeModal: Modals.init,
      }),
    );
  }, [dispatch]);

  return (
    <>
      <Main />
      <AboutUs />
      <Tokenomics />
      <RoadMap />
      <Partners />

      <WalletModal visible={activeModal === Modals.Wallet} onClose={handleActiveModalClose} />
    </>
  );
};

export default Home;
