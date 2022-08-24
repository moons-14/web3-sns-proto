import { useRecoilValue } from "recoil";

import { firebaseUserState } from "./atom";
import { userSelector } from "./selector";
export const useFirebaseUser = () => useRecoilValue(firebaseUserState);

export const useUser = () => useRecoilValue(userSelector);
