import type { Timestamp } from "firebase/firestore";

export type Channel = {
  id: string;
  name: string;
  members: string[];
};

export type Message = {
  sender: string;
  text: string;
  timestamp: Timestamp;
  files: { path: string; name: string; type: string }[];
};
