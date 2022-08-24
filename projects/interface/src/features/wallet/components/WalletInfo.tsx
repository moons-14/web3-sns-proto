import Avatar from "boring-avatars";

export const WalletInfo: React.FC<{ address: string }> = ({ address }) => {
  return (
    <div className="bg-base-100 flex flex-col items-center gap-2 font-mono">
      <div className="card w-32 shadow">
        <Avatar size="100%" square={true} name={address} variant="marble" />
      </div>
      <div className="text-center font-bold">
        <div className="text-3xl">inaridiy.eth</div>
        <div>
          Address
          <span className="ml-2 text-sm">0x4aCc...ca2</span>
        </div>
      </div>
    </div>
  );
};
