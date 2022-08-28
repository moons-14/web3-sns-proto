import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import type { AtomEffect } from "recoil";

import { normalize } from "./../../utils/normalize";
import type { Profile } from "./types";

import { auth, db } from "@/libs/firebase";

export const userSyncEffect: AtomEffect<User | null> = ({ setSelf }) => {
  const unSub = onAuthStateChanged(auth, setSelf);
  return unSub;
};

export const profileSyncEffect =
  (address: string): AtomEffect<Profile | null> =>
  ({ setSelf }) => {
    const unSub = address
      ? onSnapshot(doc(db, "profile", normalize(address)), (doc) => {
          doc.data() && setSelf(doc.data() as Profile);
        })
      : undefined;
    return unSub;
  };
