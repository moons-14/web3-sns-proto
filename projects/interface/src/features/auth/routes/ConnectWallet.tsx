import { chainParameters } from "@/../../common/dist";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MetamaskLogo from "@/assets/logo/metamask.svg";
import WalletConnectLogo from "@/assets/logo/walletconnect.svg";
import { useWeb3 } from "@/hooks";
import { login } from "@/libs/auth";
import {
  BrowserConnector,
  Connector,
  MetamaskConnector,
} from "@/libs/connector";
import { useWalletData } from "@/states/wallet";

export const ConnectWallet = () => {
  const { connectWallet, currentChainId } = useWeb3();
  const { walletData, setWalletData } = useWalletData();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const progress = async (promise: Promise<unknown>) => {
    try {
      setIsLoading(true);
      await promise;
    } finally {
      setIsLoading(false);
    }
  };

  const connect = (connector: Connector) =>
    login(connectWallet(connector))
      .then(() => navigate("/"))
      .catch(console.error);

  const connectBrowserWallet = () => {
    if (walletData) {
      return BrowserConnector.connect(
        walletData.seedPhrase,
        chainParameters[currentChainId]
      ).then(connect);
    } else {
      return BrowserConnector.createWallet(chainParameters[currentChainId])
        .then((connector) => {
          setWalletData({
            address: connector.wallet.address,
            seedPhrase: connector.wallet.mnemonic.phrase,
          });
          return connector;
        })
        .then(connect);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Connect Wallet</h1>
      <div className="flex w-full flex-col gap-2">
        <button
          className="btn btn-outline justify-start gap-1 pr-12 normal-case"
          disabled={isLoading}
          onClick={() => progress(MetamaskConnector.connect().then(connect))}
        >
          <img
            src={MetamaskLogo}
            className={clsx("aspect-square h-10", isLoading && "opacity-50")}
          />
          Metamask
        </button>
        <button
          className="btn btn-outline justify-start gap-1 pr-12 normal-case"
          disabled={isLoading}
        >
          <img
            src={WalletConnectLogo}
            className={clsx("aspect-square h-10", isLoading && "opacity-50")}
          />
          WalletConnect
        </button>
        <button
          className="btn btn-outline justify-start gap-2 pr-12 normal-case"
          disabled={isLoading}
          onClick={() => progress(connectBrowserWallet())}
        >
          <GlobeAltIcon className="aspect-square h-8" />
          BrowserWallet
        </button>
      </div>
    </div>
  );
};
