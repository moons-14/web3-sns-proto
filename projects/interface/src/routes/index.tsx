import { Route, Routes } from "react-router-dom";

import { ConnectWallet } from "@/features/auth";
import { Wallet } from "@/features/wallet";
import { lazyImport } from "@/utils";

const { HomeLayout } = lazyImport(
  () => import("@/components/Layout"),
  "HomeLayout"
);

const { AuthLayout } = lazyImport(
  () => import("@/components/Layout/AuthLayout"),
  "AuthLayout"
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth" element={<ConnectWallet />} />
      </Route>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" />
        <Route path="/friends" />
        <Route path="/wallet" element={<Wallet />} />
      </Route>
    </Routes>
  );
};
