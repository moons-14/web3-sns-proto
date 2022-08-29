import { atomFamily } from "recoil";

import { getChannels } from "../api/getChannels";

import { channelSyncEffect } from "./effect";
import type { Channel } from "./types";

export const channelsStates = atomFamily<Channel[], string>({
  key: "channelsState",
  default: (address) => getChannels(address),
  effects: (address) => [channelSyncEffect(address)],
});
