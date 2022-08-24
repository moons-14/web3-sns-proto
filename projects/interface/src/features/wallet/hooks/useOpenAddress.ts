import { useParams } from "react-router-dom";

import { useUser } from "@/states/account";

export const useOpenAccount = (): {
  address: string;
  ellipsisAddress: string;
  name: string;
} | null => {
  const { paramAddress } = useParams();
  const { address, ellipsisAddress } = useUser();
  if (paramAddress) {
    const paramEllipsisAddress = `${paramAddress.slice(
      0,
      6
    )}...${paramAddress.slice(-4)}`;
    return {
      address: paramAddress,
      name: paramEllipsisAddress,
      ellipsisAddress: paramEllipsisAddress,
    };
  } else if (address && ellipsisAddress) {
    return {
      address,
      ellipsisAddress,
      name: ellipsisAddress,
    };
  } else {
    return null;
  }
};
