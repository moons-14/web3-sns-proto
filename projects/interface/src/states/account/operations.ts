import { useRecoilValue } from "recoil";

import { firebaseUserState } from "./atom";
export const useFirebaseUser = () => useRecoilValue(firebaseUserState);
