import { Spinner } from "@/components/Elements";

export const LoadingFallback = () => {
  return (
    <div className="bg-base-200 flex h-screen w-screen flex-col items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
};

export const ErrorFallback = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
      <h1 className="text-error-content bg-base-200 text-center text-2xl font-bold sm:text-4xl">
        Something went wrong
      </h1>
      <button className="btn btn-error">Back To Home</button>
    </div>
  );
};
