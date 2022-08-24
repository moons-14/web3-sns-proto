import { useRecoilValue } from "recoil";

import {} from "@/states/web3/atom";

import {
  addressesState,
  connectingChainIdState,
  connectorState,
  currentChainIdSelector,
  currentRpcProviderSelector,
  signerOrProviderSelector,
  signerState,
  useConnectWallet,
  useDisconnect,
  useSwitchChain,
  web3AccountSelector,
} from "@/states/web3";

export const useWeb3 = () => {
  const connectWallet = useConnectWallet();
  const switchChain = useSwitchChain();
  const disconnect = useDisconnect();
  const connector = useRecoilValue(connectorState);
  const signerOrProvider = useRecoilValue(signerOrProviderSelector);
  const fetchProvider = useRecoilValue(currentRpcProviderSelector);
  const signer = useRecoilValue(signerState);
  const addresses = useRecoilValue(addressesState);
  const accounts = useRecoilValue(web3AccountSelector);
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
    addresses,
    accounts,
    connectingChainId,
    currentChainId,
    isConnected,
  };
};
