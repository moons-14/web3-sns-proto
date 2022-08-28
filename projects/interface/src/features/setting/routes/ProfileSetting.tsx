import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { saveProfile } from "../api";
import type { ProfileForm } from "../types";

import { useWeb3 } from "@/hooks";
import { useUser } from "@/states/account";

export const ProfileSetting = () => {
  const { name, profile } = useUser();
  const { register, handleSubmit } = useForm<ProfileForm>({
    defaultValues: { name, profile },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { connector } = useWeb3();
  const navigate = useNavigate();

  const onSubmit = (data: ProfileForm) => {
    try {
      setIsLoading(true);
      connector && saveProfile(data, connector);
      navigate(-1);
    } finally {
      setIsLoading(false);
    }
  };

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
          disabled={isLoading}
          {...register("name")}
        />
      </div>
      <div className="form-control">
        <label className="label">Profile</label>
        <textarea
          className="textarea textarea-bordered w-full resize-none"
          placeholder="Maybe the founder of ETH."
          disabled={isLoading}
          {...register("profile")}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save New Profile
      </button>
    </form>
  );
};
