"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel";
import CategoriesCard from "@/components/globals/categories-card";

const data = [
  {
    title: "Men's Apparel",
    image: "/sample-3.webp",
    storeCount: 23,
  },
  {
    title: "Food & Beverages",
    image: "/sample-2.webp",
    storeCount: 102,
  },
  {
    title: "Electronics",
    image: "/sample-4.jpg",
    storeCount: 4,
  },
  {
    title: "Accessories",
    image: "/sample-5.webp",
    storeCount: 39,
  },
];

const CategoriesSection = () => {
  return (
    <div className="mt-5">
      <Carousel className="w-full max-w-full">
        <CarouselContent className="-ml-1">
          {data.map((product, index) => (
            <CategoriesCard
              key={index}
              title={product.title}
              image={product.image}
              storeCount={product.storeCount}
            />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default CategoriesSection;
