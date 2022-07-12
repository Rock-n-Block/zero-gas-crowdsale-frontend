import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Parallax } from 'react-scroll-parallax';

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
      <Parallax>
        <Main />
      </Parallax>
      <Parallax speed={15}>
        <AboutUs />
      </Parallax>
      <Parallax speed={-13}>
        <Tokenomics />
      </Parallax>
      <Parallax speed={20}>
        <RoadMap />
      </Parallax>
      <Parallax speed={-10}>
        <Partners />
      </Parallax>
      <Parallax speed={0}>
        <Footer />
      </Parallax>
      <WalletModal visible={activeModal === Modals.Wallet} onClose={handleActiveModalClose} />
    </>
  );
};

export default Home;
