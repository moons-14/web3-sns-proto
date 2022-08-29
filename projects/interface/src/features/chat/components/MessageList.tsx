import Avatar from "boring-avatars";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { messagesStates } from "../states";
import type { Message } from "../states/types";

import { profileState, useUser } from "@/states/account";
import { abbreviate } from "@/utils";

const MessageView: React.FC<{ message: Message }> = ({ message }) => {
  const { address } = useUser();
  const profile = useRecoilValue(profileState(message.sender));

  if (address === message.sender) {
    return (
      <div className="flex justify-end gap-2">
        <div className="card bg-info text-info-content w-2/3 whitespace-pre-wrap p-2">
          {message.text}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-end gap-2">
        <div className="full aspect-square h-12">
          <Avatar size="100%" name={message.sender} />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-lg font-bold">
            {profile?.name || abbreviate(message.sender)}
          </div>
          <div className="card bg-base-100 w-2/3 whitespace-pre-wrap p-2">
            {message.text}
          </div>
        </div>
      </div>
    );
  }
};

export const MessageList: React.FC<{ channelId: string }> = ({ channelId }) => {
  const messages = useRecoilValue(messagesStates(channelId));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView(true);
      ref.current.scroll(
        0,
        ref.current.scrollHeight - ref.current.clientHeight
      );
    }
  }, []);
  return (
    <div className="flex flex-col gap-4 overflow-y-auto p-4" ref={ref}>
      {messages.map((message, i) => (
        <MessageView key={`${message.text}_${i}`} message={message} />
      ))}
    </div>
  );
};
