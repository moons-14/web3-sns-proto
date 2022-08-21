import { Route, Routes } from "react-router-dom";

import { AuthLayout } from "@/components/Layout";
import { ConnectWallet } from "@/features/auth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<ConnectWallet />} />
      </Route>
    </Routes>
  );
};
