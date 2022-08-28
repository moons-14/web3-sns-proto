import { Outlet } from "react-router-dom";

import { SpinnerSuspense, ThemeBox } from "../Elements";

export const AuthLayout = () => {
  return (
    <ThemeBox className="bg-base-200 flex h-screen flex-col items-center justify-center">
      <SpinnerSuspense>
        <Outlet />
      </SpinnerSuspense>
    </ThemeBox>
  );
};
