import { Outlet } from "react-router-dom";

import { SpinnerSuspense } from "../Elements";

export const AuthLayout = () => {
  return (
    <div className="bg-base-200 flex h-screen flex-col items-center justify-center">
      <SpinnerSuspense>
        <Outlet />
      </SpinnerSuspense>
    </div>
  );
};
