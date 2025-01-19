"use client";

import React from "react";
import { CarouselItem } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const CategoriesCard = ({
  title,
  image,
  storeCount,
}: {
  title: string;
  image: string;
  storeCount: number;
}) => {
  return (
    <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/4">
      <div className="p-1">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div className="relative flex flex-col group overflow-hidden w-full h-[160px]">
              <Image
                className="w-full h-full rounded-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                fill
                src={image}
                alt="Sample"
              />
			  <div className='absolute bottom-0 right-0 bg-black/60 px-2 py-1 rounded-full text-white text-sm'>{storeCount} stores</div>
            </div>
            <div className="py-4">
              <p className="line-clamp-2 text-sm text-center font-semibold">{title}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};

export default CategoriesCard;
