import { Route, Routes } from "react-router-dom";

import { HomeLayout } from "../components/Layout";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
    </Routes>
  );
};
