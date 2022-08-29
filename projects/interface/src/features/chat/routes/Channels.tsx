import {
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { ChannelList, CreateChannelModal } from "../components";

import { SpinnerSuspense } from "@/components/Elements";
import { useModal } from "@/states/modal";

export const Channels = () => {
  const { close, isOpen, open } = useModal("create-channel");

  return (
    <>
      <CreateChannelModal open={isOpen} onClose={close} />
      <div className="flex w-full flex-col gap-2 p-4">
        <div className="bg-base-100 card flex-row gap-2 p-4">
          <MagnifyingGlassIcon className="h-6 w-6" />
          <input
            type="text"
            placeholder="Search in message"
            className="w-full outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap px-4 pb-2">
          <div className="btn btn-sm btn-outline">All</div>
          <div className="btn btn-sm btn-outline btn-primary">
            Direct Message
          </div>
          <div className="btn btn-sm btn-outline btn-secondary">Important</div>
          <div className="btn btn-sm btn-outline btn-info">Unknown</div>
        </div>
        <SpinnerSuspense>
          <ChannelList />
        </SpinnerSuspense>
        <button
          className="btn btn-info fixed bottom-24 right-6 gap-2 rounded-full shadow-lg"
          onClick={open}
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
          Start Chat
        </button>
      </div>
    </>
  );
};
