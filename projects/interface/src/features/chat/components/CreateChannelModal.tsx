import { CameraIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ethers } from "ethers";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { createChannel } from "../api";

import { Modal, ModalProps, ModalTitle } from "@/components/Elements";
import { useWeb3 } from "@/hooks";
import { abbreviate, normalize } from "@/utils";

type AddressesForm = {
  inputting: string;
};

type CreateChannelForm = {
  name: string;
  members: string[];
};

const AddressesForm: React.FC<{
  addresses: string[];
  onChange: (v: string[]) => void;
}> = ({ addresses, onChange }) => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressesForm>();
  const onSubmit = (v: AddressesForm) => {
    onChange(
      Array.from(new Set([...(addresses || []), v.inputting])).map(normalize)
    );
    resetField("inputting");
  };
  return (
    <div className="form-control">
      <label className="label">Invite Members</label>
      <div className="input-group">
        <input
          className="input input-bordered flex-1 resize-none"
          placeholder="Maybe the founder of ETH."
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            e.preventDefault();
            void handleSubmit(onSubmit)();
          }}
          {...register("inputting", { validate: ethers.utils.isAddress })}
        />

        <button type="button" className="btn btn-square btn-primary">
          <CameraIcon className="w-8" />
        </button>
      </div>
      {errors.inputting && (
        <label className="label text-error">Invalid Address</label>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {addresses?.map(abbreviate).map((address, i) => (
          <div key={`${address}_${i}`} className="badge badge-lg">
            {address}
          </div>
        ))}
      </div>
    </div>
  );
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
