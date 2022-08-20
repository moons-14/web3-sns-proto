import { AuthTokenMessage } from "@crypteen/common";

export type AuthTokenRequest = {
  message: AuthTokenMessage;
  signature: string;
};
