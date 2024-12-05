/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import Request from "./apiRequester";
import { BASE_URL, ENDPOINTS } from "./Constants";
import { IResponse } from "./entities/IResponse";
import { IRecipeData } from "./entities/IRecipe";
import { TUserLogin, TUserRegistration } from "../../types/TUser";
import { IUserResponse } from "./entities/IAuthentication";
import { getToken } from "../../utils/util";

class Api {
  request: Request;

  constructor() {
    this.request = Request?.Instance;
  }

  signup = async (
    signupData: TUserRegistration
  ): Promise<IResponse<IUserResponse>> => {
    return await this.request.send({
      endpoint: ENDPOINTS.signup,
      method: "post",
      body: signupData,
    });
  };

  login = async (loginData: TUserLogin): Promise<IResponse<IUserResponse>> => {
    return await this.request.send({
      endpoint: ENDPOINTS.login,
      method: "post",
      body: loginData,
    });
  };

  identifyFoodAndGenerateRecipe = async (
    formData: FormData
  ): Promise<IRecipeData> => {
    const token = getToken();
    const response = await axios.post(`${BASE_URL}recipe`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("response:: ", response);
    return response.data;
  };

  callGetRecipes = async (): Promise<IResponse<IRecipeData[]>> => {
    return await this.request.send({
      endpoint: ENDPOINTS.getRecipes,
      method: "get",
      // headers: {
      //   "ngrok-skip-browser-warning": true,
      // },
      body: null,
    });
  };

  callGetRecipeDetails = async (
    id: string
  ): Promise<IResponse<IRecipeData>> => {
    return await this.request.send({
      endpoint: ENDPOINTS.getRecipe,
      method: "get",
      body: null,
      appendInUrl: `/${id}`,
    });
  };
}

export const api = new Api();
