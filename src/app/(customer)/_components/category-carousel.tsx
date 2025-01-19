import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CATEGORIES } from "@/lib/generate-categories";

const CategoryCarousel = () => {
  return (
    <div className="mt-5">
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {CATEGORIES.map((category, index) => (
            <CarouselItem
              className="pl-1 md:basis-1/2 lg:basis-[15%]"
              key={index}
            >
              <div className="p-1">
                <Card className='rounded-full'>
                  <CardContent className="text-sm p-0">
                    <div className='flex items-center justify-center p-3'>{category}</div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
