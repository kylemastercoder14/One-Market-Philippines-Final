/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [
  {
    title:
      "Women's Starry Night Graphic Tee - Casual Black Crew Neck Short Sleeve Top, 100% Polyester, Machine Washable, Perfect for Summer & Spring, Ladies T Shirts",
    image: "/sample-3.webp",
    price: 390,
  },
  {
    title:
      "Large Realistic Money Grass Leaf Plant - 18 Large Leaves, Wide Leaf Plant Decoration",
    image: "/sample-2.webp",
    price: 128,
  },
  {
    title:
      "Solar System for SATURN 3D Laser-Engraved Crystal Ball Night Light - USB Powered",
    image: "/sample-4.jpg",
    price: 299,
  },
  {
    title:
      "12pcs/pack Thickened Bedroom Living Room Full Town Splicing Carpet Rug, Room Bedside Blanket Warm",
    image: "/sample-5.webp",
    price: 467,
  },
  {
    title:
      "[10 to 100pcs] 3-Ply Disposable Face Mask - 3 Layers of Protection, Comfortable Earloop, Breathable, Dustproof, Anti-Droplets, Anti-Pollen, Anti-Fog",
    image: "/sample-image.webp",
    price: 230,
  },
];

const links = [
  {
    title: "Your orders",
    icon: "📦",
    href: "/order-history",
  },
  {
    title: "Your reviews",
    icon: "📝",
    href: "/reviews",
  },
  {
    title: "Your profile",
    icon: "👤",
    href: "/profile",
  },
  {
    title: "Coupons & offers",
    icon: "💰",
    href: "/coupons",
  },
  {
    title: "Followed stores",
    icon: "🏪",
    href: "/stores",
  },
  {
    title: "Browsing history",
    icon: "🔍",
    href: "/history",
  },
  {
    title: "Addresses",
    icon: "🏠",
    href: "/addresses",
  },
  {
    title: "Account security",
    icon: "🔒",
    href: "/security",
  },
  {
    title: "Notifications",
    icon: "🔔",
    href: "/notifications",
  },
  {
    title: "Switch accounts",
    icon: "🔄",
    href: "/switch",
  },
  {
    title: "Sign out",
    icon: "🚪",
    href: "/sign-out",
  },
];

const UserDropdown = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [showBrowsingHistory, setShowBrowsingHistory] = useState(false); // State for browsing history visibility

  // Handle dropdown toggle on button click
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    if (showDropdown) {
      // Show browsing history after 3 seconds
      const timer = setTimeout(() => {
        setShowBrowsingHistory(true);
      }, 300);

      return () => clearTimeout(timer); // Cleanup timer
    } else {
      setShowBrowsingHistory(false); // Reset browsing history when dropdown is hidden
    }
  }, [showDropdown]);

  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setShowDropdown(true)} // Show dropdown on hover
        onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on mouse leave
      >
        {/* User Avatar and Button */}
        <button
          className="px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300"
          onClick={toggleDropdown} // Toggle dropdown on click
        >
          <img
            src="/profile.jpg" // Replace with actual user avatar path
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col items-start">
            <span className="text-sm m-0">Hello, Kyle Andre Lim</span>
            <span className="font-semibold text-sm m-0">Orders & Account</span>
          </div>
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="absolute top-full right-0 mt-2 flex w-[600px] shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
            onMouseEnter={() => setShowDropdown(true)} // Keep dropdown visible when hovering over dropdown
            onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on mouse leave
          >
            {/* Browsing History Section */}
            <div
              className={`w-1/2 bg-gray-50 p-4 transition-transform duration-500 ${showBrowsingHistory ? "translate-x-0" : "translate-x-full"}`}
            >
              <h3 className="px-4 py-2 font-semibold border-b">
                Browsing history
              </h3>
              <ul className="p-3 space-y-4">
                {data.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="relative w-20 h-10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full rounded-md object-cover"
                        fill
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate w-40">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600">₱{item.price}</p>
                    </div>
                    <button className="text-red-600 hover:underline">🛒</button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile Section */}
            <div className="w-1/2 bg-white p-4 z-50">
              <div className="px-4 py-2 flex items-center space-x-2 border-b">
                <img
                  src="/profile.jpg" // Replace with actual user avatar path
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">Kyle Andre Lim</p>
                </div>
              </div>
              <ul className="p-4 space-y-2">
                {links.map((option, index) => (
                  <li
                    onClick={() => router.push(option.href)}
                    key={index}
                    className="text-sm hover:bg-zinc-100 p-2 flex items-center gap-2 rounded-md cursor-pointer"
                  >
                    <span className="text-sm">{option.icon}</span>
                    <span>{option.title}</span>
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

export default UserDropdown;
