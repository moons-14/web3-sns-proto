import { useRecoilValue } from "recoil";

import { firebaseUserState } from "./atom";
import { profileSelector, userSelector } from "./selector";
export const useFirebaseUser = () => useRecoilValue(firebaseUserState);

export const useUser = () => useRecoilValue(userSelector);

export const useProfile = () => {
  const profile = useRecoilValue(profileSelector);
  return { profile };
};
