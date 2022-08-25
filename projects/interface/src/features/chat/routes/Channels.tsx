import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const Channels = () => {
  return (
    <div className="flex w-full flex-col p-2">
      <div className="bg-base-100 card flex-row gap-2 p-4">
        <MagnifyingGlassIcon className="h-6 w-6" />
        <input
          type="text"
          placeholder="Search in message"
          className="w-full outline-none"
        />
      </div>
    </div>
  );
};
