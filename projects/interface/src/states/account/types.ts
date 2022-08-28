import type { User } from "firebase/auth";

export type Account = {
  user: User | null;
  address?: string;
  ellipsisAddress?: string;
  ens?: string;
  name?: string;
  profile?: string;
};

export type Profile = {
  name?: string;
  profile?: string;
  avatar?: string;
};
