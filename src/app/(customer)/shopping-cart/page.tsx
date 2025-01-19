"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import EncryptedBanner from "@/components/globals/encrypted-banner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { List, TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CartCard from "../_components/cart-card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const data = [
  {
    title:
      "Women's Starry Night Graphic Tee - Casual Black Crew Neck Short Sleeve Top, 100% Polyester, Machine Washable, Perfect for Summer & Spring, Ladies T Shirts",
    image: "/sample-3.webp",
    price: 390,
    originalPrice: 500,
    sold: 3290,
    discount: 78,
    variant: "XL (US 11.5) - Black",
    checked: true,
  },
  {
    title:
      "Large Realistic Money Grass Leaf Plant - 18 Large Leaves, Wide Leaf Plant Decoration",
    image: "/sample-2.webp",
    price: 128,
    originalPrice: 200,
    sold: 1290,
    discount: 36,
    variant: "36.5 cm x 5.8 inch",
    checked: false,
  },
  {
    title:
      "Solar System for SATURN 3D Laser-Engraved Crystal Ball Night Light - USB Powered",
    image: "/sample-4.jpg",
    price: 299,
    originalPrice: 500,
    sold: 120,
    discount: 40,
    variant: "3D Laser-Engraved Crystal Ball Night Light",
    checked: true,
  },
  {
    title:
      "12pcs/pack Thickened Bedroom Living Room Full Town Splicing Carpet Rug, Room Bedside Blanket Warm",
    image: "/sample-5.webp",
    price: 467,
    originalPrice: 800,
    sold: 5209,
    discount: 42,
    variant: "12pcs/pack",
    checked: false,
  },
  {
    title:
      "[10 to 100pcs] 3-Ply Disposable Face Mask - 3 Layers of Protection, Comfortable Earloop, Breathable, Dustproof, Anti-Droplets, Anti-Pollen, Anti-Fog",
    image: "/sample-image.webp",
    price: 230,
    originalPrice: 328,
    sold: 833,
    discount: 30,
    variant: "10pcs/pack",
    checked: true,
  },
];

const ShoppingCart = () => {
  const router = useRouter();
  return (
    <div className="px-[200px] pb-20 pt-24">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shopping Cart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-10 grid-cols-1 gap-10 mt-3">
        <div className="col-span-7">
          <EncryptedBanner />
          <div className="flex items-center justify-between mt-4">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  checked={false}
                  value="option-one"
                  id="option-one"
                />
                <Label className="text-base" htmlFor="option-one">
                  Select all (5)
                </Label>
              </div>
            </RadioGroup>
            <Button size="sm" variant="ghost">
              <List size={40} />
            </Button>
          </div>
          <Separator className="my-3" />
          <div className="flex flex-col space-y-4">
            {data.map((product, index) => (
              <CartCard
                checked={product.checked}
                variant={product.variant}
                discount={product.discount}
                originalPrice={product.originalPrice}
                price={product.price}
                title={product.title}
                image={product.image}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="col-span-3">
          <p className="font-semibold text-lg">Order Summary</p>
          <div className="flex items-center text-sm mt-5 justify-between">
            <p>Item(s) Total:</p>
            <p className="text-muted-foreground line-through">₱2200</p>
          </div>
          <div className="flex items-center text-sm mt-2 justify-between">
            <p>Item(s) Discount:</p>
            <p className="text-orange-600">-₱150</p>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center mt-5 justify-between">
            <p className="font-semibold">Total:</p>
            <p className="font-semibold">₱2050</p>
          </div>
          <Button
            onClick={() => router.push("/checkout")}
            className="rounded-full w-full mt-6 font-semibold"
            size="lg"
          >
            Proceed to checkout (5 item/s)
          </Button>
          <p className="text-center text-xs font-semibold text-muted-foreground mt-3">
            Item availability and pricing are not guaranteed until payment is
            final.
          </p>
          <div className="text-center bg-[#198754]/40 py-2 text-green-900 rounded-md flex items-center justify-center mt-5 gap-3">
            <TriangleAlert className="w-4 h-4" />
            <p className="text-xs">
              You will not be charged until you review this order on the next
              page
            </p>
          </div>
          <p className="font-semibold mt-5">Safe payment option</p>
          <p className="text-sm text-muted-foreground mt-1">
            1 Market Philippines is committed to protecting your payment
            information. We follow PCI DSS standards, use strong encryption, and
            perform regular reviews of its system to protect your privacy.
          </p>
          <p className="font-semibold mt-5">Payment methods</p>
          <div className="flex items-center gap-2 mt-2">
            <Image
              title="Cash on delivery"
              src="https://aimg.kwcdn.com/upload_aimg/launch/9682bf77-607e-4fb3-aebe-cacfba9b6a8b.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="COD"
              width={40}
              height={40}
            />
            <Image
              title="GCash"
              src="https://aimg.kwcdn.com/upload_aimg/payment/7bacbe25-56f3-4b84-a82f-046777896662.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="Gcash"
              width={40}
              height={40}
            />
            <Image
              title="Paypal"
              src="https://aimg.kwcdn.com/upload_aimg/temu/ec0c5d69-1717-4571-a193-9950ec73c8af.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="Paypal"
              width={40}
              height={40}
            />
            <Image
              title="Visa"
              src="https://aimg.kwcdn.com/upload_aimg/temu/da7f463a-916f-4d91-bcbb-047317a1c35e.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="Visa"
              width={40}
              height={40}
            />
            <Image
              title="Mastercard"
              src="https://aimg.kwcdn.com/upload_aimg/temu/b79a2dc3-b089-4cf8-a907-015a25ca12f2.png.slim.png?imageView2/2/w/120/q/70/format/webp"
              alt="Mastercard"
              width={40}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
