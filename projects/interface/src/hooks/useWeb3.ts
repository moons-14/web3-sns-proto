import { useRecoilValue } from "recoil";

import { connectingChainIdState } from "./../states/web3/atom";

import {
  accountSelector,
  connectorState,
  currentChainIdSelector,
  currentRpcProviderSelector,
  signerOrProviderSelector,
  signerState,
  useConnectWallet,
  useDisconnect,
  useSwitchChain,
} from "@/states/web3";

export const useWeb3 = () => {
  const connectWallet = useConnectWallet();
  const switchChain = useSwitchChain();
  const disconnect = useDisconnect();
  const connector = useRecoilValue(connectorState);
  const signerOrProvider = useRecoilValue(signerOrProviderSelector);
  const fetchProvider = useRecoilValue(currentRpcProviderSelector);
  const signer = useRecoilValue(signerState);
  const accounts = useRecoilValue(accountSelector);
  const connectingChainId = useRecoilValue(connectingChainIdState);
  const currentChainId = useRecoilValue(currentChainIdSelector);
  const isConnected = Boolean(signer);

  return {
    connectWallet,
    switchChain,
    disconnect,
    connector,
    signerOrProvider,
    fetchProvider,
    signer,
    accounts,
    connectingChainId,
    currentChainId,
    isConnected,
  };
};
