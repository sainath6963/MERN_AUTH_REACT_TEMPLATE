import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context); 
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        data,
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit(handleLogin)}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <p className="forgot-password">
          <Link to={"/password/forgot"}>Forgot your password?</Link>
        </p>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
