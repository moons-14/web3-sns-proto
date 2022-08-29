import { Route, Routes } from "react-router-dom";

import { ConnectWallet } from "@/features/auth";
import { lazyImport } from "@/utils";

const { HomeLayout } = lazyImport(
  () => import("@/components/Layout"),
  "HomeLayout"
);

const { AuthLayout } = lazyImport(
  () => import("@/components/Layout/AuthLayout"),
  "AuthLayout"
);

const { SettingLayout } = lazyImport(
  () => import("@/components/Layout/SettingLayout"),
  "SettingLayout"
);

const { Wallet } = lazyImport(() => import("@/features/wallet"), "Wallet");

const { Channels } = lazyImport(() => import("@/features/chat"), "Channels");

const { ProfileSetting } = lazyImport(
  () => import("@/features/setting"),
  "ProfileSetting"
);

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth" element={<ConnectWallet />} />
      </Route>
      <Route path="/setting" element={<SettingLayout />}>
        <Route path="/setting/profile" element={<ProfileSetting />} />
      </Route>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Channels />} />
        <Route path="/friends" />
        <Route path="/wallet" element={<Wallet />} />
      </Route>
    </Routes>
  );
};
