import { atomFamily } from "recoil";

import { getChannels } from "../api";

import {
  channelsSyncEffect,
  channelSyncEffect,
  messagesSyncEffect,
} from "./effect";
import type { Channel, Message } from "./types";

export const channelsStates = atomFamily<Channel[], string>({
  key: "channelsState",
  default: (address) => getChannels(address),
  effects: (address) => [channelsSyncEffect(address)],
});

export const channelState = atomFamily<Channel, string>({
  key: "channelState",
  effects: (id) => [channelSyncEffect(id)],
});

export const messagesStates = atomFamily<Message[], string>({
  key: "messagesStates",
  effects: (channelId) => [messagesSyncEffect(channelId)],
});
