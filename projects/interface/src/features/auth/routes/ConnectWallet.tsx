import { GlobeAltIcon } from "@heroicons/react/outline";

import MetamaskLogo from "@/assets/logo/metamask.svg";
import WalletConnectLogo from "@/assets/logo/walletconnect.svg";
import { useWeb3 } from "@/hooks";
import { MetamaskConnector } from "@/libs/connector";

export const ConnectWallet = () => {
  const { connectWallet, accounts, connectingChainId } = useWeb3();
  console.log(accounts, connectingChainId);
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Connect Wallet</h1>
      <div className="flex w-full flex-col gap-2">
        <button
          className="btn btn-outline justify-start gap-1 pr-12 normal-case"
          onClick={() => void MetamaskConnector.connect().then(connectWallet)}
        >
          <img src={MetamaskLogo} className="aspect-square h-10" />
          Metamask
        </button>
        <button className="btn btn-outline justify-start gap-1 pr-12 normal-case">
          <img src={WalletConnectLogo} className="aspect-square h-10" />
          WalletConnect
        </button>
        <button className="btn btn-outline justify-start gap-2 pr-12 normal-case">
          <GlobeAltIcon className="text-neutral aspect-square h-8" />
          BrowserWallet
        </button>
      </div>
    </div>
  );
};
