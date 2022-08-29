import { doc, setDoc } from "firebase/firestore";

import type { ProfileForm } from "../types";

import type { Connector } from "@/libs/connector";
import { db } from "@/libs/firebase";
import { normalize } from "@/utils";
import { mustLogin } from "@/utils/mustLogin";

export const saveProfile = async (data: ProfileForm, connector: Connector) => {
  const { name, profile } = data;
  const address = await mustLogin(connector);

  await setDoc(
    doc(db, "profile", normalize(address)),
    { name, profile },
    { merge: true }
  );
};
