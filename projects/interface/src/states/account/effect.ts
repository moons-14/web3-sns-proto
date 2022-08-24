import { onAuthStateChanged, User } from "firebase/auth";
import type { AtomEffect } from "recoil";

import { auth } from "@/libs/firebase";

export const userSyncEffect: AtomEffect<User | null> = ({ setSelf }) => {
  const unSub = onAuthStateChanged(auth, setSelf);
  return unSub;
};
