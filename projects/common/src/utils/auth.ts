import { TypedMessage } from "@metamask/eth-sig-util";
import { AuthTokenMessage } from "../types/auth";

export const AuthTokenRequest = [
  {
    name: "address",
    type: "address",
  },
  { name: "signedAt", type: "uint256" },
];

export const types = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
  ],
  AuthTokenRequest,
};

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
