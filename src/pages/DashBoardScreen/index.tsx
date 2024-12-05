import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";

export const DashBoardScreen = () => {
  return (
    <div className="flex-grow">
      <Header />
      <Outlet />
    </div>
  );
};
