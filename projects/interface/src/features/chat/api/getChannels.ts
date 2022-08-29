import { collection, getDocs, query, where } from "firebase/firestore";

import type { Channel } from "../states/types";

import { db } from "@/libs/firebase";
import { normalize } from "@/utils";

export const getChannels = async (address: string) => {
  const q = query(
    collection(db, "channelsState"),
    where("members", "array-contains", normalize(address))
  );
  const snapshot = await getDocs(q);
  const channels: Channel[] = [];
  snapshot.forEach(
    (doc) =>
      doc.exists() && channels.push({ id: doc.id, ...doc.data() } as Channel)
  );
  return channels;
};
