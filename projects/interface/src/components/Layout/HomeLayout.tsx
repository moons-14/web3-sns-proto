import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      <Outlet />
    </div>
  );
};
