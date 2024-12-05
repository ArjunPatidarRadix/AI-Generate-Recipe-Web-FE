import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/common/Header";

const RecipeHistoryScreen = () => {
  return (
    <div className="flex-grow">
      <Header />
      <Outlet />
    </div>
  );
};

export default RecipeHistoryScreen;
