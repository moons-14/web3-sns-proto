import { AuthDomain, AuthTokenRequest } from "@crypteen/common";
import { httpsCallable } from "firebase/functions";

import type { Connector } from "@/libs/connector";
import { functions } from "@/libs/firebase";
import { invariant } from "@/utils";

export const login = async (connector: Connector) => {
  const signer = connector.getSigner();
  invariant(signer);
  const signature = await signer._signTypedData(
    AuthDomain,
    { AuthTokenRequest },
    { address: connector.getAccounts()[0], signedAt: Date.now() }
  );

  const getAuthToken = httpsCallable(functions, "getAuthToken");
};
