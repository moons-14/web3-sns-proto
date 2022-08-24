import { PropsWithChildren, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { useWeb3 } from "@/hooks";
import { MetamaskConnector } from "@/libs/connector";
import { connectMethodState } from "@/states/web3";

export const SyncAccountProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const lastConnectMethod = useRecoilValue(connectMethodState);
  const { connectWallet } = useWeb3();

  const connectWalletMethods = {
    MetamaskConnector: () => MetamaskConnector.connect().then(connectWallet),
  };

  useEffect(() => {
    if (lastConnectMethod in connectWalletMethods)
      void connectWalletMethods[
        lastConnectMethod as keyof typeof connectWalletMethods
      ]();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
