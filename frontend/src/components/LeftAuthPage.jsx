import React from "react";

const LeftAuthPage = () => {
  return (
    <div
      className="w-[50%] bg-black flex flex-col items-center justify-center relative overflow-hidden  max-sm:hidden"
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-80 pointer-events-none" />
      <h1 className="text-white z-10 text-[70px] font-extrabold tracking-tight drop-shadow-lg">
        Tasko
      </h1>
      <p className="text-gray-300 z-10 text-2xl mt-4 font-medium italic drop-shadow">
        Organize. Prioritize. Conquer your day.
      </p>
      {/* Optional: Add a subtle animated accent */}
    
    </div>
  );
};

export default LeftAuthPage;
