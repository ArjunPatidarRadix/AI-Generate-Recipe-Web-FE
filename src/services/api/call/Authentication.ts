import { TUserLogin, TUserRegistration } from "../../../types/TUser";
import { api } from "..";
import { logError } from "../../../utils/logger";
import { IUserResponse } from "../entities/IAuthentication";
import { storeToken } from "../../../utils/util";
import Request from "../apiRequester";

export const callSignup = async (
  signupData: TUserRegistration
): Promise<IUserResponse> => {
  try {
    const output = await api.signup(signupData);
    storeToken(output?.data?.token);
    Request.Instance.setOrUpdateTokens(output?.data?.token, undefined);

    return output.data;
  } catch (error: any) {
    logError(error);
    return error;
  }
};

export const callLogin = async (
  loginData: TUserLogin
): Promise<IUserResponse> => {
  try {
    const output = await api.login(loginData);
    storeToken(output?.data?.token);
    Request.Instance.setOrUpdateTokens(output?.data?.token, undefined);

    return output.data;
  } catch (error: any) {
    logError(error);
    return error;
  }
};

export const callGetProfile = async (): Promise<IUserResponse> => {
  try {
    Request.Instance.setLoader(true);
    const output = await api.getProfile();
    Request.Instance.setLoader(false);

    return output.data;
  } catch (error: any) {
    logError(error);
    return error;
  }
};
