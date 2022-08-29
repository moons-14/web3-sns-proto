import { addDoc, collection } from "firebase/firestore";

import type { Connector } from "@/libs/connector";
import { db } from "@/libs/firebase";
import { normalize } from "@/utils";
import { mustLogin } from "@/utils/mustLogin";

export const createChannel = async (
  data: { name: string; members: string[] },
  connector: Connector | null
) => {
  const address = await mustLogin(connector);
  const allMembers = Array.from(
    new Set([...data.members, address].map(normalize))
  );
  await addDoc(collection(db, "channels"), {
    name: data.name,
    members: allMembers,
  });
};
