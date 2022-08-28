import type { User } from "firebase/auth";
import { atom, atomFamily } from "recoil";

import { profileSyncEffect, userSyncEffect } from "./effect";
import type { Profile } from "./types";

export const firebaseUserState = atom<User | null>({
  key: "firebaseUserState",
  default: null,
  effects: [userSyncEffect],
  dangerouslyAllowMutability: true,
});

export const profileState = atomFamily<Profile | null, string>({
  key: "profileState",
  default: null,
  effects: (address: string) => [profileSyncEffect(address)],
});
