import { PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { ErrorFallback, LoadingFallback } from "./fallback";
import { SyncAccountProvider } from "./SyncAccountProvider";

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <RecoilRoot>
      <Suspense fallback={<LoadingFallback />}>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <SyncAccountProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </SyncAccountProvider>
        </ErrorBoundary>
      </Suspense>
    </RecoilRoot>
  );
};
