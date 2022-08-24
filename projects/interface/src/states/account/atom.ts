import type { User } from "firebase/auth";
import { atom } from "recoil";

import { userSyncEffect } from "./effect";

export const firebaseUserState = atom<User | null>({
  key: "firebaseUserState",
  default: null,
  effects: [userSyncEffect],
});
