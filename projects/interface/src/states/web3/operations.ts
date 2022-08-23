import type { ChainParameter } from "@/../../common/dist";
import { useRecoilCallback } from "recoil";

import {
  accountsState,
  connectingChainIdState,
  connectorState,
  signerState,
} from "./atom";

import type { Connector } from "@/libs/connector";
import { curry, invariant } from "@/utils";

export const useConnectWallet = () => {
  const connectWallet = useRecoilCallback(
    ({ set }) =>
      (connector: Connector) => {
        set(connectorState, connector);
        connector.on("signerChanged", curry(set, signerState));
        connector.on("accountsChanged", curry(set, accountsState));
        connector.on("chainChanged", curry(set, connectingChainIdState));
        connector.on("disconnect", () => {
          set(signerState, null);
          set(accountsState, []);
          set(connectingChainIdState, null);
        });
      }
  );
  return connectWallet;
};

export const useSwitchChain = () => {
  const switchChain = useRecoilCallback(
    ({ snapshot }) =>
      async (param: ChainParameter) => {
        const connector = snapshot.getLoadable(connectorState).getValue();
        invariant(connector);
        await connector.switch(param);
      }
  );
  return switchChain;
};

export const useDisconnect = () => {
  const disconnect = useRecoilCallback(({ set }) => () => {
    set(signerState, null);
    set(accountsState, []);
    set(connectingChainIdState, null);
  });
  return disconnect;
};
