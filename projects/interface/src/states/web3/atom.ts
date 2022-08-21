import { ChainParameter, chainParameters, chains } from "@crypteen/common";
import { atom, atomFamily } from "recoil";

import type { Connector } from "@/libs/connector";

export const connectorState = atom<Connector>({ key: "connectorState" });

export const accountsState = atom<string[]>({ key: "accountsState" });

export const chainsState = atomFamily<ChainParameter, chains>({
  key: "chainsStates",
  default: (name) => chainParameters[name],
});

export const connectingChainIdState = atom<number | null>({
  key: "connectingChainState",
  default: null,
});
