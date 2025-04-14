import React, { useContext, useState } from "react";
import "../styles/Auth.css";
import { Context } from "../main";
import Register from "../components/Register";
import Login from "../components/Login";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const { isAuthenticated } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-toggle">
            <button
              className={`toggle-btn ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <buttton
              className={`toggle-btn ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </buttton>
          </div>
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </>
  );
};

export default Auth;
