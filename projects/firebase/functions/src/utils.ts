import { AuthTokenMessage, types } from "@crypteen/common";
import {
  recoverTypedSignature,
  SignTypedDataVersion,
  TypedMessage,
} from "@metamask/eth-sig-util";

export const createAuthTokenMessageParam = (
  message: AuthTokenMessage
): TypedMessage<typeof types> => {
  return {
    types,
    primaryType: "AuthTokenRequest",
    domain: {
      name: "AuthTokenManager",
      version: "0.0.1",
    },
    message,
  };
};

export const recoverAuthTokenMessage = (
  message: AuthTokenMessage,
  signature: string
) => {
  const typedMessage = createAuthTokenMessageParam(message);
  const signer = recoverTypedSignature({
    data: typedMessage,
    signature,
    version: SignTypedDataVersion.V4,
  });
  return signer;
};