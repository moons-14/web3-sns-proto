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
