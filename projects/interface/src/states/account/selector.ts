import { selector } from "recoil";

import { web3AccountSelector } from "../web3";

import { firebaseUserState, profileState } from "./atom";
import type { Account } from "./types";

export const userSelector = selector<Account>({
  key: "userSelector",
  get: ({ get }) => {
    const user = get(firebaseUserState);
    const account = get(web3AccountSelector)[0];
    const profile = account?.address
      ? get(profileState(account?.address))
      : undefined;
    const name =
      profile?.name || account?.ens || account?.ellipsisAddress || "";

    return { ...account, ...profile, user, name };
  },
  dangerouslyAllowMutability: true,
});
