import clsx from "clsx";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { createChannel } from "../api";

import { Modal, ModalProps, ModalTitle } from "@/components/Elements";
import { AddressesForm } from "@/components/Form";
import { useWeb3 } from "@/hooks";

type CreateChannelForm = {
  name: string;
  members: string[];
};

const CreateChannelForm: React.FC<{ onCreate: () => void }> = ({
  onCreate,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChannelForm>();
  const [isLoading, setIsLoading] = useState(false);
  const { connector } = useWeb3();

  const onSubmit = async (data: CreateChannelForm) => {
    try {
      setIsLoading(true);
      await createChannel(data, connector).then(onCreate);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">Channel Name</label>
        <input
          className="input input-bordered w-full"
          placeholder="zk club"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <label className="label text-error">Channel name is required</label>
        )}
      </div>
      <Controller
        name="members"
        control={control}
        rules={{
          minLength: 1,
        }}
        render={({ field }) => (
          <AddressesForm addresses={field.value} onChange={field.onChange} />
        )}
      />

      <button
        className={clsx("btn btn-primary", isLoading && "loading")}
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export const CreateChannelModal: React.FC<ModalProps> = (props) => {
  return (
    <Modal className="flex flex-col gap-2 p-4 sm:p-6" {...props}>
      <ModalTitle className="text-lg font-bold">Create New Chat</ModalTitle>
      <CreateChannelForm onCreate={props.onClose} />
    </Modal>
  );
};
