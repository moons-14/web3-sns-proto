import { Route, Routes } from "react-router-dom";

import { ConnectWallet } from "@/features/auth";
import { lazyImport } from "@/utils";

const { AuthLayout } = lazyImport(
  () => import("@/components/Layout"),
  "AuthLayout"
);
const { HomeLayout } = lazyImport(
  () => import("@/components/Layout"),
  "HomeLayout"
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth" element={<ConnectWallet />} />
      </Route>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/wallet" element={<></>} />
      </Route>
    </Routes>
  );
};
