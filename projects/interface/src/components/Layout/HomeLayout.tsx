import { Outlet } from "react-router-dom";

import { SpinnerSuspense } from "../Elements";

const BottomNav = () => {
  return <div className="bg-base-100 fixed bottom-0 h-24"></div>;
};

export const HomeLayout = () => {
  return (
    <div className="bg-base-200 flex min-h-screen">
      <SpinnerSuspense>
        <Outlet />
      </SpinnerSuspense>
      <BottomNav />
    </div>
  );
};
