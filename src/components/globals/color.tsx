"use client";

import Image from "next/image";
import React from "react";

interface ColorOption {
  name: string;
  image?: string;
  price?: number;
}

interface ColorProps {
  data: ColorOption[];
}

const Color: React.FC<ColorProps> = ({ data }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  if (data.length === 0) {
    return <p>No colors available.</p>;
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      {data.map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => setSelectedIndex(index)}
          className={`cursor-pointer h-36 p-2 w-28 relative gap-4 ${
            selectedIndex === index ? "border-2 border-black" : "border"
          }`}
        >
          <Image
            src={item.image || ""}
            alt={`Thumbnail ${index + 1}`}
            fill
            className="object-contain"
            sizes="30vw"
          />
          <div className='text-center bg-orange-400/40 bottom-1.5 px-1 py-0.5 rounded-md absolute mt-2 font-semibold text-xs'>{item.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Color;
