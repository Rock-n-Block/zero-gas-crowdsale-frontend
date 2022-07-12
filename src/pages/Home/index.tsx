import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import { WalletModal } from '@/components';
import { Footer } from '@/containers';
import { useShallowSelector } from '@/hooks';
import { closeModal } from '@/store/modals/reducer';
import modalsSelectors from '@/store/modals/selectors';
import { Modals } from '@/types';

import { AboutUs, Main, Partners, RoadMap, Tokenomics } from './containers';

const Home = () => {
  const { activeModal } = useShallowSelector(modalsSelectors.getProp('modalState'));
  const dispatch = useDispatch();

  const handleActiveModalClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return (
    <>
      <Parallax pages={7.73} enabled>
        <ParallaxLayer offset={0} speed={0}>
          <Main />
        </ParallaxLayer>
        <ParallaxLayer offset={1.2} speed={0.5}>
          <AboutUs />
        </ParallaxLayer>
        <ParallaxLayer offset={2.9} speed={1}>
          <Tokenomics />
        </ParallaxLayer>
        <ParallaxLayer offset={3.9} speed={0.4}>
          <RoadMap />
        </ParallaxLayer>
        <ParallaxLayer offset={6.3} speed={1.3} factor={0.5}>
          <Partners />
          <Footer />
        </ParallaxLayer>
      </Parallax>

      <WalletModal visible={activeModal === Modals.Wallet} onClose={handleActiveModalClose} />
    </>
  );
};

export default Home;
