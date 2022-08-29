import { doc, setDoc } from "firebase/firestore";

import type { ProfileForm } from "../types";

import { login } from "@/libs/auth";
import type { Connector } from "@/libs/connector";
import { auth, db } from "@/libs/firebase";
import { normalize } from "@/utils";

export const saveProfile = async (data: ProfileForm, connector: Connector) => {
  const { name, profile } = data;
  const address = connector.getAccounts()[0];
  if (!address) throw new Error("not connecting");
  if (!auth.currentUser) await login(connector);

  console.log(auth.currentUser);

  await setDoc(
    doc(db, "profile", normalize(address)),
    { name, profile },
    { merge: true }
  );
};
