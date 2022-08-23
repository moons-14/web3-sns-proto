export const AuthTokenRequest = [
  {
    name: "address",
    type: "address",
  },
  { name: "signedAt", type: "uint256" },
];

export const AuthTypes = {
  EIP712Domain: [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
  ],
  AuthTokenRequest,
};

export const AuthDomain = { name: "AuthTokenManager", version: "0.0.1" };
