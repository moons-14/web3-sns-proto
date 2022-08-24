import type { PropsWithChildren } from "react";

export const SyncAccountProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  //後々Firebaseとウォレットとかの同期層とか自動ログインとかを入れる

  return <>{children}</>;
};
