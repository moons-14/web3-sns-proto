import { doc, setDoc } from "firebase/firestore";

import type { Connector } from "@/libs/connector";
import { db } from "@/libs/firebase";
import { normalize } from "@/utils";
import { mustLogin } from "@/utils/mustLogin";

export const changeChannel = async (
  channelId: string,
  data: { name: string; members: string[] },
  connector: Connector | null
) => {
  const address = await mustLogin(connector);
  const allMembers = Array.from(
    new Set([...data.members, address].map(normalize))
  );
  await setDoc(
    doc(db, "channels", channelId),
    {
      name: data.name,
      members: allMembers,
    },
    { merge: true }
  );
};
