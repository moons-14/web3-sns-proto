import { PropsWithChildren, useCallback, useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";

import { useWeb3 } from "@/hooks";
import { MetamaskConnector } from "@/libs/connector";
import { connectMethodState } from "@/states/web3";

export const SyncAccountProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [lastConnectMethod, setConnectMethod] =
    useRecoilState(connectMethodState);
  const { connectWallet } = useWeb3();

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
    }),
    [connectWallet, resetConnectMethod]
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
