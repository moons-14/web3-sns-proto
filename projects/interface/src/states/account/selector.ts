import { selector } from "recoil";

import { web3AccountSelector } from "../web3";

import { firebaseUserState } from "./atom";
import type { Account } from "./types";

export const userSelector = selector<Account>({
  key: "userSelector",
  get: ({ get }) => {
    const user = get(firebaseUserState);
    const account = get(web3AccountSelector)[0];

    return { ...account, user };
  },
  dangerouslyAllowMutability: true,
});
