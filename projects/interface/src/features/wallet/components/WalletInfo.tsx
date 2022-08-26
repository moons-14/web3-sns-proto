import Avatar from "boring-avatars";

import { abbreviate } from "@/utils";

export const WalletInfo: React.FC<{ address?: string; name?: string }> = ({
  address,
  name,
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-2 font-mono">
      <div className="card w-28 shadow-lg">
        <Avatar
          size="100%"
          square={true}
          name={address || ""}
          variant="marble"
        />
      </div>

      <div className="text-center font-bold">
        <div className="text-2xl">{name ? name : "Not Connecting"}</div>
        <div>
          Address
          <span className="ml-2 text-sm">
            {address ? abbreviate(address) : "0x00...000"}
          </span>
        </div>
      </div>
    </div>
  );
};
