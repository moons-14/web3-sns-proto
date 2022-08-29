import Avatar from "boring-avatars";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

import { messagesStates } from "../states";
import type { Message } from "../states/types";

import { UserInfoModal } from "@/components/Modal/UserInfoModal";
import { profileState, useUser } from "@/states/account";
import { useModal } from "@/states/modal";
import { abbreviate } from "@/utils";

const MessageView: React.FC<{ message: Message }> = ({ message }) => {
  const { address } = useUser();
  const profile = useRecoilValue(profileState(message.sender));
  const { close, isOpen, open } = useModal(`${message.sender}_info`);

  if (address === message.sender) {
    return (
      <div className="flex justify-end gap-2">
        <div className="card bg-info text-info-content w-2/3 whitespace-pre-wrap break-all p-2">
          {message.text}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <UserInfoModal address={message.sender} open={isOpen} onClose={close} />
        <div className="flex justify-end gap-2">
          <button className="full aspect-square h-12" onClick={open}>
            <Avatar size="100%" name={message.sender} />
          </button>
          <div className="flex flex-1 flex-col">
            <div className="text-lg font-bold">
              {profile?.name || abbreviate(message.sender)}
            </div>
            <div className="card bg-base-100 w-2/3 whitespace-pre-wrap break-all p-2">
              {message.text}
            </div>
          </div>
        </div>
      </>
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
