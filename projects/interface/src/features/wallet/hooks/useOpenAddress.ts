import { useParams } from "react-router-dom";

import { useUser } from "@/states/account";
import type { Account } from "@/states/web3";

export const useOpenAccount = (): Account => {
  const { paramAddress } = useParams();
  const { accounts } = useUser();
  const address = paramAddress ? paramAddress : addresses[0] || "";
};
