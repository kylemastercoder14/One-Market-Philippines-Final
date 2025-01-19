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
import { ChevronRight, Edit, List, TriangleAlert } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/globals/product-card";
import { Input } from "../../../components/ui/input";

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

const Checkout = () => {
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
            <BreadcrumbPage>Checkout</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid md:grid-cols-10 grid-cols-1 gap-10 mt-3">
        <div className="col-span-7">
          <EncryptedBanner />
          <div className="grid md:grid-cols-5 grid-cols-1 gap-5 mt-3">
            <div className="col-span-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold">Shipping address</p>
                <Link
                  href="#"
                  className="hover:underline flex items-center gap-2"
                >
                  <p>Change address</p>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="border relative w-full overflow-hidden pl-5 pr-3 py-2 rounded-md mt-3">
                <div className="absolute top-0 left-0 w-[4px] h-[500px]">
                  <Image
                    src="/images/address-border.png"
                    fill
                    className="w-full h-full object-center"
                    alt="sample"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <b>Kyle Andre Lim</b> +63 915 247 9693
                  </p>
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </div>
                <p className="text-orange-600 text-sm font-semibold">
                  Block 111 Lot 4, Ruby Street
                </p>
                <p className="text-sm font-semibold">
                  Santa Lucia (San Juan II), Dasmariñas, Cavite, Philippines
                </p>
              </div>
            </div>
            <div className="col-span-2">
              <p className="text-[#0A8800] font-semibold">Shipping: ₱50.00</p>
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
          </div>
          <Separator className="my-5" />
          <div className="flex justify-between items-center">
            <p className="font-semibold">Item details (26)</p>
            <Link href="#" className="hover:underline flex items-center gap-2">
              <p>View all items</p>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-5 grid-cols-1 gap-5 mt-3">
            {data.map((product, index) => (
              <ProductCard
                className="h-[100px]"
                discount={product.discount}
                image={product.image}
                originalPrice={product.originalPrice}
                price={product.price}
                title={product.title}
                key={index}
              />
            ))}
          </div>
          <p className="mt-3 font-semibold mb-3">Payment methods</p>
          <RadioGroup defaultValue="option-one" className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                checked={true}
                value="option-one"
                id="option-one"
              />
              <div className="flex items-center gap-2">
                <Image
                  title="GCash"
                  src="https://aimg.kwcdn.com/upload_aimg/payment/7bacbe25-56f3-4b84-a82f-046777896662.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                  alt="Gcash"
                  width={50}
                  height={50}
                />
                <p>Gcash</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                checked={false}
                value="option-two"
                id="option-two"
              />
              <div className="flex items-center gap-2">
                <Image
                  title="Paypal"
                  src="https://aimg.kwcdn.com/upload_aimg/temu/ec0c5d69-1717-4571-a193-9950ec73c8af.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                  alt="Paypal"
                  width={50}
                  height={50}
                />
                <Image
                  title="Visa"
                  src="https://aimg.kwcdn.com/upload_aimg/temu/da7f463a-916f-4d91-bcbb-047317a1c35e.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                  alt="Visa"
                  width={50}
                  height={50}
                />
                <Image
                  title="Mastercard"
                  src="https://aimg.kwcdn.com/upload_aimg/temu/b79a2dc3-b089-4cf8-a907-015a25ca12f2.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                  alt="Mastercard"
                  width={50}
                  height={50}
                />
                <p>Bank/Credit Card</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                checked={false}
                value="option-three"
                id="option-three"
              />
              <div className="flex items-center gap-2">
                <Image
                  title="Cash on delivery"
                  src="https://aimg.kwcdn.com/upload_aimg/launch/9682bf77-607e-4fb3-aebe-cacfba9b6a8b.png.slim.png?imageView2/2/w/120/q/70/format/webp"
                  alt="COD"
                  width={50}
                  height={50}
                />
                <p>
                  Cash on Delivery{" "}
                  <span className="text-orange-600">(recommended)</span>
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        <div className="col-span-3">
          <p className="font-semibold text-lg">Order Summary</p>
          <div className="flex items-center gap-3 mt-3">
            <Input placeholder="Enter coupon code" />
            <Button size="sm" variant="default">
              Apply
            </Button>
          </div>
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
            Submit order (5 item/s)
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;
