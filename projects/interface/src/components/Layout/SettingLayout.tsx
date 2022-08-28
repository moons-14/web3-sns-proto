import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";

import { SpinnerSuspense, ThemeBox } from "../Elements";

export const SettingLayout = () => {
  const navigate = useNavigate();
  return (
    <ThemeBox className="bg-base-200 flex h-screen flex-col items-center">
      <div className="navbar justify-between">
        <div className="navbar-start">
          <button
            className="btn btn-ghost btn-square"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftIcon className="w-8" />
          </button>
        </div>
        <div className="navbar-center text-xl font-bold">Edit Profile</div>
        <div className="navbar-end" />
      </div>
      <SpinnerSuspense>
        <Outlet />
      </SpinnerSuspense>
    </ThemeBox>
  );
};
