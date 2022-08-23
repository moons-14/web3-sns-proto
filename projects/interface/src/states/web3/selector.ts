import { chainParameters, chains } from "@crypteen/common";
import { providers, Signer } from "ethers";
import { selector } from "recoil";

import { accountsState, currentChainState, signerState } from "./atom";
import type { Account } from "./types";

export const currentChainIdSelector = selector<chains>({
  key: "currentChainIdSelector",
  get: ({ get }) => {
    const { chainId } = get(currentChainState);
    return chainId as chains;
  },
  set: ({ set, reset }, newChainId) => {
    if (typeof newChainId === "number") {
      set(currentChainState, chainParameters[newChainId]);
    } else {
      reset(currentChainState);
    }
  },
});

export const currentRpcProviderSelector =
  selector<providers.JsonRpcBatchProvider>({
    key: "currentRpcProviderSelector",
    get: ({ get }) => {
      const { rpcUrls, chainId } = get(currentChainState);
      const provider = new providers.JsonRpcBatchProvider(rpcUrls[0], chainId);
      return provider;
    },
  });

export const signerOrProviderSelector = selector<Signer | providers.Provider>({
  key: "providerSelector",
  get: ({ get }) => {
    const signer = get(signerState);
    return signer || get(currentRpcProviderSelector);
  },
});

export const accountSelector = selector<Account[]>({
  key: "accountSelector",
  get: ({ get }) => {
    const addresses = get(accountsState);
    return addresses.map((address) => ({
      address,
      ellipsisAddress: `${address.slice(0, 6)}...${address.slice(-4)}`,
    }));
  },
});
