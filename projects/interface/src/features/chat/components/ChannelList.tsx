import Avatar from "boring-avatars";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { channelsSelector } from "../states";

import { profileState } from "@/states/account";
import { abbreviate } from "@/utils";

const UserBadge: React.FC<{ address: string }> = ({ address }) => {
  const profile = useRecoilValue(profileState(address));

  return (
    <span className="truncate text-sm font-bold">
      {profile?.name || abbreviate(address)}
    </span>
  );
};

export const ChannelList = () => {
  const channels = useRecoilValue(channelsSelector);
  console.log(channels);
  if (channels.length === 0)
    return (
      <div className="mx-auto pt-4 text-2xl font-bold opacity-50">Empty</div>
    );

  return (
    <div className="flex flex-col gap-2 overflow-y-auto pb-32">
      {channels.map((channel, i) => (
        <Link
          to={`/chat/${channel.id}`}
          key={`${channel.name}_${i}`}
          className="active:bg-base-300 card h-16 cursor-pointer flex-row items-center gap-4 p-1 transition-all active:scale-95"
        >
          <div className="card aspect-square h-full">
            <Avatar
              size="100%"
              square
              variant="marble"
              colors={["#565175", "#538A95", "#67B79E", "#FFB727", "#E4491C"]}
              name={channel.name}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-bold">{channel.name}</div>
            <div className="flex flex-nowrap gap-1 overflow-x-auto">
              {channel.members.map((name) => (
                <UserBadge key={`${channel.name}_${name}`} address={name} />
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
