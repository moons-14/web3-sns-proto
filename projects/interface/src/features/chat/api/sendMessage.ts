import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import type { Connector } from "@/libs/connector";
import { db } from "@/libs/firebase";
import { mustLogin } from "@/utils/mustLogin";

export type MessageReq = {
  text: string;
  files: { path: string; name: string; type: string }[];
};

export const sendMessage = async (
  channelId: string,
  message: MessageReq,
  connector: Connector
) => {
  if (message.text.match(/\S/g)) {
    const address = await mustLogin(connector);
    const channelRef = collection(db, "channels", channelId, "messages");

    await addDoc(channelRef, {
      sender: address,
      createdAt: serverTimestamp(),
      ...message,
    });
  }
};
