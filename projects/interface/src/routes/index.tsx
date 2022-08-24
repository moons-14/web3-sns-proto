import { Route, Routes } from "react-router-dom";

import { AuthLayout, HomeLayout } from "@/components/Layout";
import { ConnectWallet } from "@/features/auth";

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
