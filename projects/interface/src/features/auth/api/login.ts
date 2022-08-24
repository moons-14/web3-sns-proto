import { AuthDomain, AuthTokenRequest } from "@crypteen/common";
import { signInWithCustomToken } from "firebase/auth";

import type { Connector } from "@/libs/connector";
import { auth, getAuthToken } from "@/libs/firebase";
import { invariant } from "@/utils";

export const login = async (connector: Connector) => {
  const signer = connector.getSigner();
  const address = connector.getAccounts()[0];
  invariant(signer && address);
  const message = { address, signedAt: String(Date.now()) };
  if (auth.currentUser?.uid === address) return;
  const signature = await signer._signTypedData(
    AuthDomain,
    { AuthTokenRequest },
    message
  );
  const {
    data: { token },
  } = await getAuthToken({
    message,
    signature,
  });
  invariant(token);
  const result = await signInWithCustomToken(auth, token);
  console.log(result);
};
