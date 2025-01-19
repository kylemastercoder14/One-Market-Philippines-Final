"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel";
import StoreCard from "@/components/globals/store-card";

const data = [
  {
    storeName: "Modern Couture",
    image: "/sample-3.webp",
    sold: 3290,
  },
  {
    storeName: "Runway Fashion",
    image: "/sample-2.webp",
    sold: 1290,
  },
  {
    storeName: "NEON - KING",
    image: "/sample-4.jpg",
    sold: 120,
  },
  {
    storeName: "Hoashang Lightning",
    image: "/sample-5.webp",
    sold: 5209,
  },
];

const FeaturedStore = () => {
  return (
    <div className="mt-5">
      <Carousel className="w-full max-w-full">
        <CarouselContent className="-ml-1">
          {data.map((product, index) => (
            <StoreCard
              key={index}
              storeName={product.storeName}
              image={product.image}
              sold={product.sold}
            />
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default FeaturedStore;
