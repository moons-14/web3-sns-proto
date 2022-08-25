import Avatar from "boring-avatars";

import { useOpenAccount } from "../hooks";

export const WalletInfo: React.FC = () => {
  const account = useOpenAccount();
  return (
    <div className="flex w-full flex-col items-center gap-2 font-mono">
      <div className="card w-28 shadow-lg">
        <Avatar
          size="100%"
          square={true}
          name={account?.address || ""}
          variant="marble"
        />
      </div>

      <div className="text-center font-bold">
        {account?.name ? (
          <div className="text-3xl">{account?.name}</div>
        ) : (
          <div className="text-neutral text-3xl">Not Connecting</div>
        )}
        <div>
          Address
          <span className="ml-2 text-sm">
            {account?.ellipsisAddress || "0x00...000"}
          </span>
        </div>
      </div>
    </div>
  );
};
