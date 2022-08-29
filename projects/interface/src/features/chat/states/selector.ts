import { selector } from "recoil";

import { channelsStates } from "./atom";

import { userSelector } from "@/states/account";

export const channelsSelector = selector({
  key: "channelsSelector",
  get: ({ get }) => {
    const { address } = get(userSelector);
    return address ? get(channelsStates(address)) : [];
  },
});
