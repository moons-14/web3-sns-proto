import clsx from "clsx";

import { WalletAction, WalletInfo, WalletMenu } from "../components";

export const Wallet = () => {
  return (
    <div className="flex w-full flex-col">
      <div className="bg-base-100 card relative m-4 shadow-lg">
        <div className="mb-2 flex flex-col">
          <WalletMenu />
          <WalletInfo />
        </div>
        <div className="mb-6 flex flex-col items-center">
          <WalletAction />
        </div>
      </div>
      <div className="bg-primary text-primary-content -mt-12 flex-1 pt-12">
        <div className="sticky top-0 grid grid-cols-2 rounded-lg">
          <a className={clsx("btn btn-ghost")}>Tokens</a>
          <a className={clsx("btn btn-ghost")}>NFTs</a>
        </div>
      </div>
    </div>
  );
};
