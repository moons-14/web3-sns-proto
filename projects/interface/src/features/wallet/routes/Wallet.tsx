import clsx from "clsx";
import { Link } from "react-router-dom";

import { WalletAction, WalletInfo, WalletMenu } from "../components";

import { useUser } from "@/states/account";

export const Wallet = () => {
  const { address, name } = useUser();
  return (
    <div className="flex w-full flex-col">
      <div className="bg-base-100 card relative m-4 shadow-lg">
        <div className="mb-2 flex flex-col">
          <WalletMenu />
          <WalletInfo address={address} name={name} />
        </div>
        <div className="mb-6 flex flex-col items-center">
          {address ? (
            <WalletAction />
          ) : (
            <Link to="/auth" className="btn btn-outline btn-sm">
              ConnectWallet
            </Link>
          )}
        </div>
      </div>
      <div className="bg-primary text-primary-content -mt-12 flex-1 px-4 pt-12">
        <div className="sticky top-0 grid grid-cols-2 rounded-lg">
          <a className={clsx("btn btn-ghost")}>Tokens</a>
          <a className={clsx("btn btn-ghost")}>NFTs</a>
        </div>
      </div>
    </div>
  );
};
