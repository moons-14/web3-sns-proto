import { chainParameters } from "@crypteen/common";
import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";

import { useWeb3 } from "@/hooks";
import { BrowserConnector, MetamaskConnector } from "@/libs/connector";
import { useWalletData } from "@/states/wallet";
import { connectMethodState } from "@/states/web3";

export const SyncAccountProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [lastConnectMethod, setConnectMethod] =
    useRecoilState(connectMethodState);
  const { connectWallet, currentChainId } = useWeb3();
  const { walletData } = useWalletData();

  const resetConnectMethod = useCallback(
    () => setConnectMethod(""),
    [setConnectMethod]
  );

  const connectWalletMethods = useMemo(
    () => ({
      MetamaskConnector: () =>
        MetamaskConnector.connect()
          .then(connectWallet)
          .catch(resetConnectMethod),
      BrowserConnector: () =>
        walletData &&
        BrowserConnector.connect(
          walletData.seedPhrase,
          chainParameters[currentChainId]
        )
          .then(connectWallet)
          .catch(resetConnectMethod),
    }),
    [connectWallet, resetConnectMethod, walletData, currentChainId]
  );

  useEffect(() => {
    if (lastConnectMethod in connectWalletMethods)
      void connectWalletMethods[
        lastConnectMethod as keyof typeof connectWalletMethods
      ]();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
