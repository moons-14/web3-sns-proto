import { Menu } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  QrCodeIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { QrModal } from "@/components/Modal";
import { useWeb3 } from "@/hooks";
import { useModal } from "@/states/modal";

export const WalletMenu = () => {
  const { isConnected, addresses } = useWeb3();
  const { isOpen, close, open } = useModal("qr-modal");

  return (
    <div className="flex w-full justify-between p-2">
      <QrModal open={isOpen} onClose={close} value={addresses[0]} />
      {isConnected ? (
        <button className="btn btn-ghost btn-circle" onClick={open}>
          <QrCodeIcon className="w-8" />
        </button>
      ) : (
        <div />
      )}

      <Menu>
        <Menu.Button className="btn btn-ghost btn-circle">
          <EllipsisVerticalIcon className="text-base-content w-10" />
        </Menu.Button>

        <Menu.Items className="bg-base-100 menu rounded-box absolute right-2 top-12 z-10 flex p-2 drop-shadow focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <li>
                <Link
                  to="/setting/profile"
                  className={clsx(
                    active && "bg-primary text-primary-content",
                    "gap-2 px-2 font-bold"
                  )}
                >
                  <PencilSquareIcon className="w-6" />
                  Edit Profile
                </Link>
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
