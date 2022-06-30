import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';

import { Modal } from '@/components';
import { useShallowSelector } from '@/hooks';
import { setActiveModal } from '@/store/modals/reducer';
import modalsSelectors from '@/store/modals/selectors';
import { Modals } from '@/types';

import { AboutUs, Main, Partners, RoadMap, Tokenomics } from './containers';

const Home = () => {
  const { activeModal } = useShallowSelector(modalsSelectors.getProp('modalState'));
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
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
      <Modal visible={activeModal === Modals.SignIn} onClose={handleClose}>
        <div style={{ padding: '15px', background: 'white' }}>haha</div>
      </Modal>
    </>
  );
};

export default Home;
