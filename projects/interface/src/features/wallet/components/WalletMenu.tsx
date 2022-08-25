import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export const WalletMenu = () => {
  return (
    <div className="flex w-full justify-end p-2">
      <button className="btn btn-ghost btn-circle">
        <EllipsisVerticalIcon className="text-base-content w-10" />
      </button>
    </div>
  );
};
