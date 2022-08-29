import { collection, onSnapshot, query, where } from "firebase/firestore";
import type { AtomEffect } from "recoil";

import type { Channel } from "./types";

import { db } from "@/libs/firebase";
import { normalize } from "@/utils";

export const channelSyncEffect =
  (address: string): AtomEffect<Channel[]> =>
  ({ setSelf }) => {
    const unSub = onSnapshot(
      query(
        collection(db, "channels"),
        where("members", "array-contains", normalize(address))
      ),
      (snapshot) => {
        const channels: Channel[] = [];
        snapshot.forEach(
          (doc) => doc.exists() && channels.push(doc.data() as Channel)
        );
        setSelf(channels);
      }
    );
    return unSub;
  };
