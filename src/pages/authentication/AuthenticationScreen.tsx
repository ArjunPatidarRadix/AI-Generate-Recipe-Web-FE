import React, { useEffect, useState } from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import { getToken, storeToken } from "../../utils/util";
import { BASE_URL } from "../../services/api/Constants";
import Button from "../../components/common/Button";
import { TUserLogin, TUserRegistration } from "../../types/TUser";
import { ApiCall } from "../../services/api/call";
import { AppApiException } from "../../services/api/error/AppApiException";
import Request from "../../services/api/apiRequester";

const AuthenticationScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TUserRegistration>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token) {
      Request.Instance.setOrUpdateTokens(token, undefined);
      navigate("/dashboard");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "Test", email: "", password: "", confirmPassword: "" });
  };

  async function callSignupApi(formData: TUserRegistration) {
    setLoading(true);

    const result = await ApiCall.callSignup(formData);
    setLoading(false);
    if (!(result instanceof AppApiException)) {
      navigate("/dashboard");
    } else {
      const res = result as AppApiException;
      console.log("res :", res.message);
      alert(res.message);
    }
  }

  async function callLoginApi(formData: TUserLogin) {
    setLoading(true);

    const result = await ApiCall.callLogin(formData);
    setLoading(false);

    if (!(result instanceof AppApiException)) {
      navigate("/dashboard");
    } else {
      const res = result as AppApiException;
      console.log("res :", res.message);
      alert(res.message);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Handle login logic
      console.log("Login:", formData);
      callLoginApi(formData);
    } else {
      if (formData.password !== formData.confirmPassword) {
        console.log("Passwords do not match");
        alert("Password and confirm password do not match");
        return;
      }
      // Handle sign-up logic
      console.log("Sign Up:", formData);
      callSignupApi(formData);
    }
  };

  return (
    <div className="auth-container bg-backgroundColor flex flex-col flex-1 items-center">
      <h2 className="title">{isLogin ? "Login" : "Sign Up"}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="input-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {!isLogin && (
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <Button
          type="submit"
          label={isLogin ? "Login" : "Sign Up"}
          isLoading={isLoading}
        />
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={toggleForm}
          className="cursor-pointer text-primaryColor underline"
        >
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthenticationScreen;
