import Avatar from "boring-avatars";

import { abbreviate } from "@/utils";

export const WalletInfo: React.FC<{
  address?: string | undefined;
  name?: string | undefined;
}> = ({ address, name }) => {
  const copyAddress = () => {
    void navigator.clipboard.writeText(address || "0x00");
  };
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
          <button
            className="btn btn-sm btn-ghost ml-2 px-0 text-sm"
            onClick={copyAddress}
          >
            {address ? abbreviate(address) : "0x00...000"}
          </button>
        </div>
      </div>
    </div>
  );
};
