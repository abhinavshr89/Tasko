import React from 'react';
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full px-8 py-4 bg-gradient-to-r bg-black border-b border-b-gray-400 flex items-center justify-between font-poppins z-20">
      <span className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent drop-shadow-lg select-none">
        Tasko
      </span>
      <Button
        variant="outline"
        className="text-black border-white hover:bg-white hover:text-indigo-700 font-semibold transition-all shadow"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </header>
  );
};

export default Header;