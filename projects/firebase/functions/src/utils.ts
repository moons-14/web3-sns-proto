import { AuthDomain, AuthTokenMessage, AuthTypes } from "@crypteen/common";
import {
  recoverTypedSignature,
  SignTypedDataVersion,
  TypedMessage,
} from "@metamask/eth-sig-util";

export const createAuthTokenMessageParam = (
  message: AuthTokenMessage
): TypedMessage<typeof AuthTypes> => {
  return {
    types: AuthTypes,
    primaryType: "AuthTokenRequest",
    domain: AuthDomain,
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
