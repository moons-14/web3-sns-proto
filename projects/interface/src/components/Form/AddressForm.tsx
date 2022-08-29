import { CameraIcon } from "@heroicons/react/24/outline";
import { ethers } from "ethers";
import { useForm } from "react-hook-form";

import { abbreviate, normalize } from "@/utils";

type AddressesFormType = {
  inputting: string;
};

export const AddressesForm: React.FC<{
  addresses: string[];
  onChange: (v: string[]) => void;
}> = ({ addresses, onChange }) => {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressesFormType>();
  const onSubmit = (v: AddressesFormType) => {
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
