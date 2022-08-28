import {
  ChatBubbleBottomCenterTextIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleBottomCenterTextIcon as SolidChat,
  UsersIcon as SolidUsers,
} from "@heroicons/react/24/solid";
import Avatar from "boring-avatars";
import { Link, NavLink, Outlet } from "react-router-dom";

import { SpinnerSuspense, ThemeBox } from "../Elements";

import { useUser } from "@/states/account";

const BottomNav = () => {
  const { address } = useUser();
  return (
    <ThemeBox className="fixed bottom-4 z-10 flex w-full justify-center px-8">
      <div className="flex h-16 w-full max-w-xs gap-4">
        <div className="card bg-base-100 w-full flex-row justify-center gap-8 p-2">
          <NavLink to="/" className="btn btn-ghost btn-circle">
            {({ isActive }) =>
              isActive ? (
                <SolidChat className="h-8 w-8" />
              ) : (
                <ChatBubbleBottomCenterTextIcon className="h-8 w-8" />
              )
            }
          </NavLink>
          <NavLink to="/friends" className="btn btn-ghost btn-circle">
            {({ isActive }) =>
              isActive ? (
                <SolidUsers className="h-8 w-8" />
              ) : (
                <UsersIcon className="h-8 w-8" />
              )
            }
          </NavLink>
        </div>
        <Link
          to="wallet"
          className="avatar placeholder aspect-square h-full p-1"
        >
          <div className="bg-neutral-focus text-neutral-content rounded-full shadow-lg">
            {address ? (
              <Avatar size="100%" name={address} />
            ) : (
              <UserCircleIcon />
            )}
          </div>
        </Link>
      </div>
    </ThemeBox>
  );
};

export const HomeLayout = () => {
  return (
    <div
      className="bg-base-200 text-base-content flex min-h-screen"
      data-theme="light"
    >
      <SpinnerSuspense>
        <Outlet />
      </SpinnerSuspense>
      <BottomNav />
    </div>
  );
};
