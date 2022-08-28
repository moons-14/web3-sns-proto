import type { User } from "firebase/auth";
import { atom } from "recoil";

import { userSyncEffect } from "./effect";
import type { Profile } from "./types";

export const firebaseUserState = atom<User | null>({
  key: "firebaseUserState",
  default: null,
  effects: [userSyncEffect],
});

export const profileState = atom<Profile | null>({
  key: "profileState",
  default: null,
  effects: [],
});
