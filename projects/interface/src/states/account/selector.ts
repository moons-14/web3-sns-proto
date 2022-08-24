import { selector } from "recoil";

import { accountSelector } from "../web3";

import { firebaseUserState } from "./atom";

export const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    const user = get(firebaseUserState);
    const account = get(accountSelector)[0];

    return { user, account };
  },
});
