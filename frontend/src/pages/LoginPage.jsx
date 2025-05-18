import React, { useState } from "react";
import LeftAuthPage from "../components/leftAuthPage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [form, setForm] = useState({ email: "", password: "" });

  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Form state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="w-full h-screen flex font-poppins text-white">
      <LeftAuthPage />
      <div className="bg-primary w-[50%] max-sm:w-full relative overflow-hidden flex flex-col items-center justify-center">
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-80 pointer-events-none" />
        <div className="flex flex-col items-center justify-center h-screen z-10">
          <h1 className="text-white text-[40px] font-extrabold tracking-tight drop-shadow-lg mb-4">
            Login
          </h1>
          <form
            className="flex flex-col items-center w-full text-white"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="mb-4 w-80 bg-transparent border border-gray-500 text-white placeholder-gray-400"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              className="mb-4 w-80 bg-transparent border border-gray-500 text-white placeholder-gray-400"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              className="w-80 text-black font-bold"
              variant="outline"
            >
              Login
            </Button>
          </form>
          <p className="mt-4 text-gray-300 text-lg">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
        {/* Subtle animated accent */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-0">
          <div className="w-40 h-40 bg-gradient-to-tr from-blue-500 to-purple-600 opacity-30 rounded-full blur-2xl animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
