import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  PaperAirplaneIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { sendMessage } from "../api";
import { EditChannelModal, MessageList } from "../components";
import { channelState } from "../states";

import { useWeb3 } from "@/hooks";
import { useModal } from "@/states/modal";
import { invariant } from "@/utils";

type MessageForm = {
  text: string;
};

export const TextChat = () => {
  const navigate = useNavigate();
  const { isOpen, open, close } = useModal("edit_modal");
  const { handleSubmit, register, resetField } = useForm<MessageForm>();
  const { id } = useParams();
  const { name } = useRecoilValue(channelState(id || ""));
  const { connector } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: MessageForm) => {
    try {
      setIsLoading(true);
      invariant(connector && id);
      await sendMessage(id, { text: e.text, files: [] }, connector);
      resetField("text");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <EditChannelModal open={isOpen} onClose={close} channelId={id || ""} />
      <div className="flex h-full w-full flex-col">
        <div className="flex h-16 items-center px-2">
          <div className="navbar-start items-center">
            <button
              className="btn btn-ghost btn-square"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon className="w-8" />
            </button>
          </div>
          <div className="navbar-center text-xl font-bold">{name}</div>
          <div className="navbar-end flex justify-end">
            <button className="btn btn-ghost btn-circle" onClick={open}>
              <EllipsisVerticalIcon className="w-8" />
            </button>
          </div>
        </div>
        <div className="flex grow flex-col justify-end overflow-y-hidden">
          <MessageList channelId={id || ""} />
        </div>
        <div className="flex w-full items-center p-4 pt-0">
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-8" />
          </button>
          <form
            className="card bg-base-100 flex grow flex-row items-center p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="input w-full"
              placeholder="Hello World"
              {...register("text", { required: true })}
            />
            <button className="btn btn-circle btn-ghost">
              <PlusIcon className="w-8" />
            </button>
            <button type="submit" className="btn btn-circle btn-ghost">
              <PaperAirplaneIcon
                className={clsx("w-8", isLoading && "loading")}
              />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
