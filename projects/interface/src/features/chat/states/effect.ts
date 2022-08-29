import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import type { AtomEffect } from "recoil";

import type { Channel, Message } from "./types";

import { db } from "@/libs/firebase";
import { invariant, normalize } from "@/utils";

export const channelsSyncEffect =
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
          (doc) =>
            doc.exists() &&
            channels.push({ id: doc.id, ...doc.data() } as Channel)
        );
        setSelf(channels);
      }
    );
    return unSub;
  };

export const channelSyncEffect =
  (channelId: string): AtomEffect<Channel> =>
  ({ setSelf }) => {
    const unSub = onSnapshot(doc(db, "channels", channelId), (snapshot) => {
      snapshot.exists() && setSelf(snapshot.data() as Channel);
    });
    return unSub;
  };

export const messagesSyncEffect =
  (channelId: string): AtomEffect<Message[]> =>
  ({ setSelf }) => {
    invariant(channelId);
    const unSub = onSnapshot(
      query(
        collection(db, "channels", channelId, "messages"),
        orderBy("createdAt")
      ),
      (snapshot) => {
        const messages: Message[] = [];
        snapshot.forEach(
          (doc) => doc.exists() && messages.push(doc.data() as Message)
        );
        setSelf(messages);
      }
    );
    return unSub;
  };
