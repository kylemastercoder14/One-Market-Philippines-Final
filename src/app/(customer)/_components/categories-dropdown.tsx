
"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "@/actions/categories";
import { SellerCategory } from "@prisma/client";
import UnderConstruction from "@/components/globals/under-construction";

const CategoriesDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State to manage dropdown visibility
  const [categories, setCategories] = useState<SellerCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  });
  return (
    <>
      <div
        className="relative group"
        onMouseEnter={() => setShowDropdown(true)} // Show dropdown on hover
        onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on mouse leave
      >
        {/* Category Button */}
        <button className="px-4 flex items-center gap-2 py-2 rounded-2xl hover:bg-zinc-300/70 text-black text-sm transition-colors duration-300">
          <span>Categories</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              showDropdown ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        {showDropdown && (
          <div
            className="absolute top-full -right-60 mt-2 flex w-[800px] shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-out opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
            onMouseEnter={() => setShowDropdown(true)} // Keep dropdown visible when hovering over dropdown
            onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on mouse leave
          >
            {/* Category Section */}
            <div className="w-full bg-white p-2 grid md:grid-cols-10 grid-cols-1 z-50 max-h-[70vh] overflow-y-auto">
              <div className="col-span-3 border-r pr-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-2 cursor-pointer hover:bg-zinc-300/70 rounded-lg flex items-center justify-between transition-colors duration-300"
                  >
                    <span className="text-sm">{category.name}</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                ))}
              </div>
              <div className="col-span-7 ml-3">
                <UnderConstruction />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoriesDropdown;
