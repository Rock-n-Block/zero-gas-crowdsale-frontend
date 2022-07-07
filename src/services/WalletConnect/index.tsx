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
import { IConnect } from '@amfi/connect-wallet/src/interface';
import { Subscription } from 'rxjs';

import { chains, networkDataForAddToMetamask } from '@/config';
import { useShallowSelector } from '@/hooks';
import { WalletService } from '@/services';
import { getUserInfo, login } from '@/store/user/actions';
import { disconnectWalletState, updateUserState } from '@/store/user/reducer';
import userSelector from '@/store/user/selectors';
import { Chains, State, UserState, WalletProviders } from '@/types';
import { notify } from '@/utils';

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
      }

      // On MetaMask Accounts => Change / Disconnect / Connect
      if (data.name === 'accountsChanged') {
        disconnect();
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        connect(WalletProviders.metamask, Chains.Kovan);
      }
    },
    [disconnect],
  );

  const subscriberError = useCallback(
    (err: any) => {
      console.error(err);
      if (err.code === 4) {
        notify.error(
          `You changed to wrong network. Please choose ${chains[Chains.Kovan].network.chainName}`,
        );
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

          // Get basic currently connected account information
          const accountInfo = (await WalletConnect.getAccount()) as IConnect;

          // If user connected account
          if (accountInfo.address) {
            // If already logged-in (redux-persist) with the same account
            if (key.length && address === accountInfo.address) {
              // Refresh backend data
              dispatch(getUserInfo({ web3Provider: WalletConnect.Web3() }));
            } else {
              // If auth on backend => fetch and save backend data
              dispatch(
                login({
                  web3Provider: WalletConnect.Web3(),
                  provider: accountInfo.type as string,
                  address: accountInfo.address,
                }),
              );
            }
          }
        } catch (error: any) {
          console.error(error);
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
