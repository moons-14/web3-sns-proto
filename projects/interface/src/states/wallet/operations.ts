import { useRecoilState } from "recoil";

import { walletDataState } from "./atom";

export const useWalletData = () => {
  const [walletData, setWalletData] = useRecoilState(walletDataState);
  return { walletData, setWalletData };
};
