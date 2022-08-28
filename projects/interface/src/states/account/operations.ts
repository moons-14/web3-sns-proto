import { useRecoilState, useRecoilValue } from "recoil";

import { firebaseUserState, profileState } from "./atom";
import { userSelector } from "./selector";
export const useFirebaseUser = () => useRecoilValue(firebaseUserState);

export const useUser = () => useRecoilValue(userSelector);

export const useProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  return { profile, setProfile };
};
