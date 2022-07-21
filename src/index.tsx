import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { App, OverlayProvider } from '@/containers';
import { WalletConnectContext } from '@/services';

import { isMainnet } from './config/constants';
import { OverflowProvider } from './hooks/useOverflow';
import store from './store/configureStore';
import { Buy } from './pages';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';

const root = document.getElementById('root');
const app = (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <Router>
        <WalletConnectContext>
          <OverlayProvider overlayChildren={[<Buy key="buy" />]}>
            <ParallaxProvider>
              <ToastContainer hideProgressBar />
              <OverflowProvider>
                <App />
              </OverflowProvider>
            </ParallaxProvider>
          </OverlayProvider>
        </WalletConnectContext>
      </Router>
    </PersistGate>
  </Provider>
);

(async () => {
  // Dynamically add eruda
  if (!isMainnet) {
    await import('./eruda');
  }

  ReactDOM.render(app, root);
})();
