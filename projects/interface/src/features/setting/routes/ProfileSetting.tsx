import { useForm } from "react-hook-form";

import type { ProfileForm } from "../types";

export const ProfileSetting = () => {
  const { register, handleSubmit } = useForm<ProfileForm>();

  const onSubmit = (data: ProfileForm) => console.log(data);

  return (
    <form
      className="flex w-full max-w-sm flex-col gap-4 px-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="form-control">
        <label className="label">UserName</label>
        <input
          className="input input-bordered w-full"
          placeholder="vitalik.eth"
          {...register("name")}
        />
      </div>
      <div className="form-control">
        <label className="label">Profile</label>
        <textarea
          className="textarea textarea-bordered w-full resize-none"
          placeholder="Maybe the founder of ETH."
          {...register("profile")}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save New Profile
      </button>
    </form>
  );
};
