/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";

const SupportDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setShowDropdown(true)} // Show dropdown on hover
        onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on mouse leave
      >
        {/* User Avatar and Button */}
        <button className="px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300">
        <img
            src="/icons/support.svg" // Replace with actual user avatar path
            alt="User Avatar"
            className="w-5 h-5 rounded-full"
          />
          <span>Support</span>
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="absolute top-full right-0 mt-2 flex w-[200px] shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
            onMouseEnter={() => setShowDropdown(true)} // Keep dropdown visible when hovering over dropdown
            onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on mouse leave
          >
            {/* Profile Section */}
            <div className="w-full bg-white p-2 z-50">
              <ul className="p-2 space-y-2">
                {[
                  "Support Center",
                  "Purchase Protection",
                  "Privacy Policy",
                  "Terms of Use",
                ].map((option, index) => (
                  <li
                    key={index}
                    className="text-sm hover:bg-zinc-100 p-2 rounded-md cursor-pointer"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SupportDropdown;
