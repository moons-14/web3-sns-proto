import { Spinner, ThemeBox } from "@/components/Elements";

export const LoadingFallback = () => {
  return (
    <ThemeBox className="bg-base-200 flex h-screen w-screen flex-col items-center justify-center">
      <Spinner size="lg" />
    </ThemeBox>
  );
};

export const ErrorFallback = () => {
  return (
    <ThemeBox className="flex h-screen w-screen flex-col items-center justify-center gap-6">
      <h1 className="text-error-content bg-base-200 text-center text-2xl font-bold sm:text-4xl">
        Something went wrong
      </h1>
      <button className="btn btn-error">Back To Home</button>
    </ThemeBox>
  );
};
