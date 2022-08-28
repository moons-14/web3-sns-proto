import { selector } from "recoil";

import { addressesState, web3AccountSelector } from "../web3";

import { firebaseUserState, profileState } from "./atom";
import type { Account, Profile } from "./types";

export const profileSelector = selector<Profile | null>({
  key: "profileSelector",
  get: ({ get }) => {
    const address = get(addressesState)[0];
    const profile = address ? get(profileState(address)) : null;
    return profile;
  },
});

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
