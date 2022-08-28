import { onAuthStateChanged, User } from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import type { AtomEffect } from "recoil";

import { addressesState } from "../web3";

import type { Profile } from "./types";

import { auth, db } from "@/libs/firebase";

export const userSyncEffect: AtomEffect<User | null> = ({ setSelf }) => {
  const unSub = onAuthStateChanged(auth, setSelf);
  return unSub;
};

export const profileSyncEffect: AtomEffect<Profile | null> = ({
  setSelf,
  onSet,
  getLoadable,
}) => {
  const address = getLoadable(addressesState).valueMaybe()?.[0];
  const docRef = address && doc(db, "profiles", address);
  docRef &&
    onSet((newProfile) => newProfile && void setDoc(docRef, newProfile));
  const unSub = docRef
    ? onSnapshot(docRef, (doc) => {
        doc.data() && setSelf(doc.data() as Profile);
      })
    : undefined;
  return unSub;
};
