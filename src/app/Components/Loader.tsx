"use client";
import React from "react";

export const Loader = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`fixed top-0 left-0 z-50 h-screen w-screen bg-black bg-opacity-90 backdrop-blur-sm flex flex-col items-center justify-center space-y-6 ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Loader */}
      <div className="loader"></div>

      {/* Text */}
      <div className="text-white text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide fr-fnt">
        Entering Dexora...
      </div>
    </div>
  );
};
