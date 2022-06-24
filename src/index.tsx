import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from '@/containers';
import { WalletConnectContext } from '@/services';

import store from './store/configureStore';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/index.scss';

const root = document.getElementById('root');
const app = (
  <Provider store={store.store}>
    <PersistGate loading={null} persistor={store.persistor}>
      <Router>
        <WalletConnectContext>
          <ToastContainer hideProgressBar />
          <App />
        </WalletConnectContext>
      </Router>
    </PersistGate>
  </Provider>
);
ReactDOM.render(app, root);
