import {
  ArrowPathIcon,
  CurrencyDollarIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

export const WalletAction = () => {
  return (
    <div className="btn-group">
      <button className="btn btn-sm btn-outline">
        <CurrencyDollarIcon className="w-5" />
        Buy
      </button>
      <button className="btn btn-sm btn-outline">
        <PaperAirplaneIcon className="w-5" />
        Send
      </button>
      <button className="btn btn-sm btn-outline">
        <ArrowPathIcon className="w-5" />
        Swap
      </button>
    </div>
  );
};
