import { PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ErrorFallback, LoadingFallback } from "./fallback";

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RecoilRoot>
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <BrowserRouter>{children}</BrowserRouter>
        </ErrorBoundary>
      </Suspense>
    </RecoilRoot>
  );
};
