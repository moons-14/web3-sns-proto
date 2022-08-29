import { Outlet } from "react-router-dom";

import { SpinnerSuspense, ThemeBox } from "../Elements";

export const TextChatLayout = () => {
  return (
    <ThemeBox className="bg-base-200 flex h-screen flex-col items-center">
      <SpinnerSuspense>
        <Outlet />
      </SpinnerSuspense>
    </ThemeBox>
  );
};
