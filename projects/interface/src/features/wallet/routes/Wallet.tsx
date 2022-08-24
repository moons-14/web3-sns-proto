import clsx from "clsx";

import { WalletAction, WalletInfo, WalletMenu } from "../components";

export const Wallet = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="bg-base-100 relative flex flex-col">
        <div className="mb-2 flex flex-col">
          <WalletMenu />
          <WalletInfo />
        </div>
        <div className="mb-6 flex flex-col items-center">
          <WalletAction />
        </div>
        <div className="bg-base-100 sticky top-0 grid grid-cols-2">
          <a className={clsx("btn btn-ghost rounded-none")}>Tokens</a>
          <a className={clsx("btn btn-ghost rounded-none")}>NFTs</a>
        </div>
      </div>
    </div>
  );
};
