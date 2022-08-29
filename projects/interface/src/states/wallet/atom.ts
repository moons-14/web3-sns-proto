import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

import type { WalletData } from "./types";

const { persistAtom } = recoilPersist();

export const walletDataState = atom<WalletData | null>({
  key: "walletDataState",
  default: null,
  effects: [persistAtom],
});
