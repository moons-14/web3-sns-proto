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

const { TextChatLayout } = lazyImport(
  () => import("@/components/Layout/TextChatLayout"),
  "TextChatLayout"
);

const { Wallet } = lazyImport(() => import("@/features/wallet"), "Wallet");

const { Channels } = lazyImport(() => import("@/features/chat"), "Channels");

const { ProfileSetting } = lazyImport(
  () => import("@/features/setting"),
  "ProfileSetting"
);

const { TextChat } = lazyImport(() => import("@/features/chat"), "TextChat");

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="/auth" element={<ConnectWallet />} />
      </Route>
      <Route path="/setting" element={<SettingLayout />}>
        <Route path="/setting/profile" element={<ProfileSetting />} />
      </Route>
      <Route path="/chat" element={<TextChatLayout />}>
        <Route path="/chat/:id" element={<TextChat />} />
      </Route>
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Channels />} />
        <Route path="/friends" />
        <Route path="/wallet" element={<Wallet />} />
      </Route>
    </Routes>
  );
};
