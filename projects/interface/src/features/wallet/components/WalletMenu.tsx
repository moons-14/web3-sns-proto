import { Menu } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

export const WalletMenu = () => {
  return (
    <div className="flex w-full justify-end p-2">
      <Menu>
        <Menu.Button className="btn btn-ghost btn-circle">
          <EllipsisVerticalIcon className="text-base-content w-10" />
        </Menu.Button>

        <Menu.Items className="bg-base-100 menu rounded-box absolute right-2 top-12 z-10 flex p-2 drop-shadow focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <li>
                <button
                  className={clsx(
                    active && "bg-primary text-primary-content",
                    "gap-2 px-2 font-bold"
                  )}
                >
                  <PencilSquareIcon className="w-6" />
                  Edit Profile
                </button>
              </li>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <li>
                <button
                  className={clsx(
                    active && "bg-primary text-primary-content",
                    "gap-2 px-2 font-bold "
                  )}
                >
                  <ShareIcon className="w-6" />
                  Share
                </button>
              </li>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
};
