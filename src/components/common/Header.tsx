import { FaBell } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { getToken, removeToken } from "../../utils/util";
import Request from "../../services/api/apiRequester";

// import avatar from "../";
const Header = () => {
  const navigate = useNavigate();
  const token = getToken();
  const logoutHandler = () => {
    navigate("/authentication");
    removeToken();
    Request.Instance.setOrUpdateTokens(undefined, undefined);
  };
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 mb-5 shadow-md">
      <div>
        <span>Welcome</span>
      </div>

      {/* Profile Section */}
      <section className="flex-row gap-20 flex text-xl">
        <NavLink to={"/dashboard"}>Home</NavLink>
        <NavLink to={"/history"}>History</NavLink>
        {token ? (
          <button
            className="flex-row flex items-center gap-2 text-red-400"
            onClick={logoutHandler}
          >
            <IoIosLogOut />
            <span>Logout</span>
          </button>
        ) : undefined}
      </section>
    </header>
  );
};

export default Header;
