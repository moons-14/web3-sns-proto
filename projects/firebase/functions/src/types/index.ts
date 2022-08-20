export type AuthTokenRequestData = {
  address: string;
  signedAt: string;
};

export type AuthTokenRequest = {
  data: AuthTokenRequestData;
  signature: string;
};
