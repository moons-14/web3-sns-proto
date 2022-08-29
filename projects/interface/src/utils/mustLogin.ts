import { login } from "@/libs/auth";
import type { Connector } from "@/libs/connector";
import { auth } from "@/libs/firebase";
import { invariant } from "@/utils";

export const mustLogin = async (
  connector: Connector | null
): Promise<string> => {
  invariant(connector);
  const address = connector.getAccounts()[0];
  if (!address) throw new Error("not connecting");
  if (!auth.currentUser) await login(connector);
  return address;
};
