import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../services/redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getRecipes } from "../../services/redux/slices/recipesSection/helper";
import { IMAGE_BASE_URL } from "../../services/api/Constants";
import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const navigate = useNavigate();

  const { recipesData } = useSelector((state: IStore) => state.recipesData);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  const onRecipeClickHandler = (id: string) => {
    navigate(`/history/details/${id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 m-8">
      {recipesData?.map((data) => {
        return (
          <div
            className="bg-whiteColor flex flex-row justify-between items-center gap-2 shadow-md rounded-md p-4 cursor-pointer"
            onClick={() => onRecipeClickHandler(data?._id)}
          >
            <img
              className="w-28 h-28 rounded-full border-2"
              src={`${IMAGE_BASE_URL}${data.imagePath}`}
              alt="Food"
            />
            <p className="text-xl text-textColor font-medium">
              {data.recipeName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeList;
