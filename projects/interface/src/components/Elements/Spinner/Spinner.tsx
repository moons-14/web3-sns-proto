import clsx from "clsx";
import { PropsWithChildren, Suspense } from "react";

const sizes = {
  sm: "w-4",
  md: "w-8",
  lg: "w-12 sm:w-16",
};

export const Spinner: React.FC<{
  size?: keyof typeof sizes;
  className?: string;
}> = ({ size = "md", className }) => {
  return (
    <svg
      className={clsx(
        "text-base-content aspect-square animate-spin",
        sizes[size],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      data-testid="loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export const SpinnerSuspense: React.FC<
  PropsWithChildren<{ size?: keyof typeof sizes }>
> = ({ children, size }) => {
  return (
    <Suspense
      fallback={
        <div className="flex w-full items-center justify-center">
          <Spinner size={size || "md"} />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
