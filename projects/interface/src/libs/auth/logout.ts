import { signOut } from "firebase/auth";

import { auth } from "@/libs/firebase";

export const logout = () => signOut(auth);
