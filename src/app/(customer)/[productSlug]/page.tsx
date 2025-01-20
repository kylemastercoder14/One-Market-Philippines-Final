import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ProductImages from "@/components/globals/product-images";
import Link from "next/link";
import { ChevronRight, Minus, Plus } from "lucide-react";
import { PRODUCTS } from "../../../../static-products";
import Color from "@/components/globals/color";
import Size from "@/components/globals/size";
import { Button } from "@/components/ui/button";

const ProductSlug = () => {
  return (
    <div className="md:px-[200px] px-10 pb-20 pt-24">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Women&apos; Clothing</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Apparel</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="truncate w-96">
              {PRODUCTS.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative flex flex-col md:flex-row gap-16 mt-5">
        {/* IMAGES */}
        <div className="w-full lg:w-1/2 overflow-y-auto md:max-h-[72vh] no-scrollbar">
          <ProductImages images={PRODUCTS.images} />
          <div className="mt-5">
            <p className="font-semibold md:w-[700px] w-full md:truncate">
              Product details of {PRODUCTS.title}
            </p>
            <div className="flex items-center mt-2 gap-2">
              {PRODUCTS.tags.map((tag, index) => (
                <div
                  className="bg-black/80 text-white rounded-md text-xs px-2 py-1"
                  key={index}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5 gap-2 mt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Brand:</p>
                  <p>{PRODUCTS.brand || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Weight:</p>
                  <p>{PRODUCTS.weight || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Height:</p>
                  <p>{PRODUCTS.height || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">SKU:</p>
                  <p>{PRODUCTS.sku || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Materials:</p>
                  <p>{PRODUCTS.materials.join(", ") || "N/A"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Warranty Period:</p>
                  <p>{PRODUCTS.warrantyPeriod || "N/A"}</p>
                </div>
              </div>
            </div>
            <p className='mt-3'>{PRODUCTS.description}</p>
          </div>
        </div>
        {/* CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h3>{PRODUCTS.title}</h3>
          <div className="text-sm mt-2 flex items-center gap-2">
            <Link href="#">
              Sold by:{" "}
              <span className="text-orange-600 hover:underline">
                {PRODUCTS.seller}
              </span>
            </Link>
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-3 text-lg mt-3">
            <p className="text-orange-600 font-semibold">
              Starts at ₱{PRODUCTS.variations[0].options[0].price}
            </p>
            <p className="text-muted-foreground line-through">
              ₱{PRODUCTS.discountedPrice}
            </p>
            <p>{PRODUCTS.sold}+ sold</p>
            <div className="border border-orange-600 bg-orange-600 px-1.5 py-0.5 rounded-md text-white text-xs">
              -{PRODUCTS.discount}% OFF
            </div>
          </div>
          <p className="font-semibold mt-5">Color: </p>
          <Color
            data={
              PRODUCTS.variations.find(
                (variation) => variation.name === "Color"
              )?.options || []
            }
          />
          <p className="font-semibold mt-5">Size: </p>
          <Size
            data={
              PRODUCTS.variations.find((variation) => variation.name === "Size")
                ?.options || []
            }
          />
          <div className="flex items-center gap-3 mt-5">
            <p className="font-semibold">Qty:</p>
            <div className="border flex justify-center items-center gap-3 py-2 w-24">
              <Minus className="w-4 h-4" />
              <input
                type="text"
                className="w-5 text-sm text-center bg-white border-0 outline-none"
                placeholder="1"
              />
              <Plus className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-[#0A8800] font-semibold">Shipping: TBA</p>
            <p className="mt-3 text-sm">
              Delivery: 10-30 minuted depending on the location
            </p>
            <p className="mt-1 text-sm">
              <strong>Courier</strong>: We aim to support tricycle drivers,
              pedicab drivers, and cyclists by offering them opportunities to
              serve as couriers, providing them with an additional source of
              income.
            </p>
          </div>
          <Button size="lg" className="rounded-full h-12 mt-5">
            Add to cart &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductSlug;
