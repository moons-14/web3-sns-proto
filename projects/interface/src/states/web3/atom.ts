import { ChainParameter, chainParameters } from "@crypteen/common";
import type { Signer } from "ethers";
import { atom } from "recoil";

import type { Connector } from "@/libs/connector";

export const connectorState = atom<Connector | null>({
  key: "connectorState",
  default: null,
});

export const signerState = atom<Signer | null>({
  key: "signerState",
  default: null,
});

export const accountsState = atom<string[]>({
  key: "accountsState",
  default: [],
});

export const currentChainState = atom<ChainParameter>({
  key: "chainsStates",
  default: chainParameters[592],
});

export const connectingChainIdState = atom<number | null>({
  key: "connectingChainState",
  default: null,
});
