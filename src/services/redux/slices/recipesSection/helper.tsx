import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiCall } from "../../../api/call";
import { AppApiException } from "../../../api/error/AppApiException";

const GET_RECIPES = "getRecipes";

export const getRecipes = createAsyncThunk(GET_RECIPES, async () => {
  const result = await ApiCall.callGetRecipes();

  if (!(result instanceof AppApiException)) {
    return {
      result,
    };
  }
});
