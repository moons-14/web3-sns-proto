import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

export const WalletMenu = () => {
  return (
    <div className="flex w-full justify-end px-2">
      <button className="btn btn-ghost btn-circle">
        <EllipsisVerticalIcon className="text-neutral w-10" />
      </button>
    </div>
  );
};
