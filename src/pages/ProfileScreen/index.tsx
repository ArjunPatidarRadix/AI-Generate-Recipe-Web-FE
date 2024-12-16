import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/util";
import Request from "../../services/api/apiRequester";
import { IUserResponse } from "../../services/api/entities/IAuthentication";
import { ApiCall } from "../../services/api/call";
import { AppApiException } from "../../services/api/error/AppApiException";

function ProfileScreen() {
  const navigate = useNavigate();

  const onLogoutPress = () => {
    navigate("/authentication");
    removeToken();
    Request.Instance.setOrUpdateTokens(undefined, undefined);
  };

  const [userData, setUserData] = useState<IUserResponse | undefined>(
    undefined
  );

  useEffect(() => {
    async function getProfile() {
      Request.Instance.setLoader(true);
      const result = await ApiCall.callGetProfile();
      Request.Instance.setLoader(false);
      if (!(result instanceof AppApiException)) {
        setUserData(result);
      }
    }
    getProfile();
  }, []);

  return (
    <div className="flex-grow">
      <Header />
      <div className="flex justify-center items-center flex-col">
        <div className="bg-cyan-200 h-24 w-24 flex justify-center items-center rounded-full border-2 border-gray-700">
          <span className="font-bold text-xl ">{userData?.name.charAt(0)}</span>
        </div>
        <span className="font-semibold text-xl mt-5">{userData?.name}</span>
        <span className="font-semibold text-xl mt-2">{userData?.email}</span>
      </div>
    </div>
  );
}

export default ProfileScreen;
