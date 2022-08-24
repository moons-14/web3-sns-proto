import type { AuthTokenMessage } from "@crypteen/common";
import { getFunctions, httpsCallable } from "firebase/functions";

import { app } from "./initialize";

export const functions = getFunctions(app, "asia-northeast2");

export const getAuthToken = httpsCallable<
  {
    message: AuthTokenMessage;
    signature: string;
  },
  { token: string }
>(functions, "getAuthToken");
