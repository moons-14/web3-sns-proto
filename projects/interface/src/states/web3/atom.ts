import { ChainParameter, chainParameters } from "@crypteen/common";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import type { Connector, TypedSigner } from "@/libs/connector";

const { persistAtom } = recoilPersist();

export const connectMethodState = atom<string>({
  key: "connectMethodState",
  default: "",
  effects: [persistAtom],
});

export const connectorState = atom<Connector | null>({
  key: "connectorState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const signerState = atom<TypedSigner | null>({
  key: "signerState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const addressesState = atom<string[]>({
  key: "addressesState",
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
