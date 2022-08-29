import Avatar from "boring-avatars";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { channelsSelector } from "../states";

import { abbreviate } from "@/utils";

export const ChannelList = () => {
  const channels = useRecoilValue(channelsSelector);

  if (channels.length === 0)
    return (
      <div className="mx-auto pt-4 text-2xl font-bold opacity-50">Empty</div>
    );

  return (
    <div className="flex flex-col gap-2">
      {channels.map((channel, i) => (
        <Link
          to="/"
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
            <div className="flex gap-1">
              {channel.members.map((name) => (
                <span key={`${channel.name}_${name}`} className="text-sm">
                  {abbreviate(name)}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
