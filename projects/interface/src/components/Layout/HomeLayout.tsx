import {
  ChatBubbleBottomCenterTextIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Outlet } from "react-router-dom";

import { SpinnerSuspense } from "../Elements";

const BottomNav = () => {
  return (
    <div className="fixed bottom-4 z-10 flex w-full justify-center px-8">
      <div className="flex w-full max-w-xs gap-4">
        <div className="card bg-base-100 w-full flex-row justify-center gap-8 p-2">
          <a className="btn btn-ghost btn-circle">
            <ChatBubbleBottomCenterTextIcon className="h-8 w-8" />
          </a>
          <a className="btn btn-ghost btn-circle">
            <UsersIcon className="h-8 w-8" />
          </a>
        </div>
        <div className="avatar placeholder aspect-square h-full">
          <div className="bg-neutral-focus text-neutral-content rounded-full">
            <span className="text-xs">AA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomeLayout = () => {
  return (
    <div className="bg-base-200 text-base-content flex min-h-screen">
      <SpinnerSuspense>
        <Outlet />
      </SpinnerSuspense>
      <BottomNav />
    </div>
  );
};
