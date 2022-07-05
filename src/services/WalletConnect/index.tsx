/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Subscription } from 'rxjs';

import { networkDataForAddToMetamask } from '@/config';
import { useShallowSelector } from '@/hooks';
import { WalletService } from '@/services';
import { disconnectWalletState, updateUserState } from '@/store/user/reducer';
import userSelector from '@/store/user/selectors';
import { Chains, State, UserState, WalletProviders } from '@/types';
import { notify } from '@/utils';
import { IConnect } from '@amfi/connect-wallet/src/interface';
import { getUserInfo, login } from '@/store/user/actions';

interface IContextValue {
  connect: (provider: WalletProviders, chain: Chains) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
}

const Web3Context = createContext({} as IContextValue);

const WalletConnectContext: FC<PropsWithChildren<any>> = ({ children }) => {
  const [currentSubsriber, setCurrentSubsciber] = useState<Subscription | null>(null);
  const WalletConnect = useMemo(() => new WalletService(), []);
  const dispatch = useDispatch();
  const {
    provider: WalletProvider,
    // from local storage
    address,
    key,
  } = useShallowSelector<State, UserState>(userSelector.getUser);

  const disconnect = useCallback(() => {
    dispatch(disconnectWalletState());
    localStorage.removeItem('walletconnect');
    WalletConnect.resetConnect();
    currentSubsriber?.unsubscribe();
    setCurrentSubsciber(null);
  }, [WalletConnect, currentSubsriber, dispatch]);

  const subscriberSuccess = useCallback(
    (data: any) => {
      if (document.visibilityState !== 'visible') {
        disconnect();
        return;
      }

      if (data.name === 'accountsChanged') {
        dispatch(updateUserState({ address: data.address }));
      }
    },
    [WalletConnect, disconnect, dispatch],
  );

  const subscriberError = useCallback(
    (err: any) => {
      console.error(err);
      if (err.code === 4) {
        notify.error('You changed to wrong network. Please choose Kovan');
        disconnect();
      }
    },
    [disconnect],
  );

  const connect = useCallback(
    async (provider: WalletProviders, chain: Chains) => {
      const connected = await WalletConnect.initWalletConnect(provider, chain);

      if (connected) {
        try {
          if (!currentSubsriber) {
            const sub = WalletConnect.eventSubscribe().subscribe(
              subscriberSuccess,
              subscriberError,
            );
            setCurrentSubsciber(sub);
          }

          // Get basic metamask account info
          const accountInfo = (await WalletConnect.getAccount()) as IConnect;

          // If user connected account
          if (accountInfo.address) {
            // If already logged-in (redux-persist) with the same account
            if (key.length && address === accountInfo.address) {
              dispatch(getUserInfo({ web3Provider: WalletConnect.Web3() }));
            } else {
              // Save basic info into redux store + fetch additional data + authenticate on backend
              dispatch(
                updateUserState({ provider: accountInfo.type, address: accountInfo.address }),
              );
              dispatch(getUserInfo({ web3Provider: WalletConnect.Web3() }));
              dispatch(login({ web3Provider: WalletConnect.Web3(), address: accountInfo.address }));
            }
          }
        } catch (error: any) {
          console.log(error);
          // metamask doesn't installed,
          // redirect to download MM or open MM on mobile
          if (!window.ethereum) {
            window.open(
              `https://metamask.app.link/dapp/${
                window.location.hostname + window.location.pathname
              }/?utm_source=mm`,
            );
            return;
          }
          // HOTFIX FOR OUR LIB, CHANGE LIB TYPES LATER
          if (error.code === 4) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [networkDataForAddToMetamask],
            });
          }
        }
      }
    },
    [WalletConnect, dispatch, subscriberError, subscriberSuccess, currentSubsriber],
  );

  useEffect(() => {
    // connect user if he connected previously
    if (WalletProvider && connect) {
      connect(WalletProviders.metamask, Chains.Kovan);
    }
  }, []);

  const walletConnectValue = useMemo(() => {
    return { connect, disconnect, walletService: WalletConnect };
  }, [connect, disconnect, WalletConnect]);

  return <Web3Context.Provider value={walletConnectValue}>{children}</Web3Context.Provider>;
};

const useWalletConnectorContext = () => useContext(Web3Context);

export { WalletConnectContext, useWalletConnectorContext };
