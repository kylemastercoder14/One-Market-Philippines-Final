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
import { ChevronRight } from "lucide-react";

const data = {
  title:
    "Women's Starry Night Graphic Tee - Casual Black Crew Neck Short Sleeve Top, 100% Polyester, Machine Washable, Perfect for Summer & Spring, Ladies T Shirts",
  images: [
    "/sample-2.webp",
    "/sample-3.webp",
    "/sample-4.jpg",
    "/sample-5.webp",
    "/sample-image.webp",
  ],
  originalPrice: 750,
  discount: 13,
  sold: 294,
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet vitae provident, facere magni itaque, placeat inventore eos alias repellat, distinctio quis? Tenetur et vel, sequi voluptas ut qui magnam mollitia, illum commodi dolorum consequuntur, nulla exercitationem laborum doloremque distinctio? Sunt quam eaque ducimus quasi illum eveniet beatae aliquid nobis saepe cum recusandae nisi inventore accusamus quibusdam hic quia, obcaecati veniam, quidem earum facilis! Sunt, eius dicta, mollitia quod laborum commodi, deserunt reprehenderit nulla atque eaque accusamus dolores consequatur hic. Repellendus illo dignissimos quae, velit sapiente similique voluptate nemo voluptas placeat voluptatibus adipisci totam vel. Rerum eaque aliquid inventore illum! Dolores!",
  category: "Apparel",
  variations: [
    {
      name: "Color",
      options: [
        {
          name: "Black",
          image: "/sample-image.webp",
          price: 650,
        },
        {
          name: "White",
          image: "/sample-2.webp",
          price: 700,
        },
        {
          name: "Red",
          image: "/sample-3.webp",
          price: 750,
        },
        {
          name: "Blue",
          image: "/sample-4.jpg",
          price: 800,
        },
        {
          name: "Green",
          image: "/sample-5.webp",
          price: 850,
        },
      ],
    },
    {
      name: "Size",
      options: [
        {
          name: "S",
          image: "",
          price: 0,
        },
        {
          name: "M",
          image: "",
          price: 0,
        },
        {
          name: "L",
          image: "",
          price: 0,
        },
        {
          name: "XL",
          image: "",
          price: 0,
        },
        {
          name: "XXL",
          image: "",
          price: 0,
        },
      ],
    },
  ],
  brand: "",
  tags: ["shirt", "trendy", "casual", "fashion", "top"],
  warrantyPeriod: "2 weeks",
  weight: "0.5 kg",
  height: "10 cm",
  materials: ["Polyester", "Cotton", "Spandex"],
  sku: "SKU-1237523",
  seller: "Jeorge Trendy Shop",
  sellerImage: "/profile.jpg",
};

const ProductSlug = () => {
  return (
    <div className="px-[200px] pb-20 pt-24">
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
              Women&apos;s Starry Night Graphic Tee - Casual Black Crew Neck
              Short Sleeve Top, 100% Polyester, Machine Washable, Perfect for
              Summer & Spring, Ladies T Shirts
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="relative flex flex-col md:flex-row gap-16 mt-5">
        {/* IMAGES */}
        <div className="w-full lg:w-1/2 md:sticky top-20 h-max">
          <ProductImages images={data.images} />
        </div>
        {/* CONTENT */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h3>{data.title}</h3>
          <div className="text-sm mt-2 flex items-center gap-2">
            <Link href="#">
              Sold by: <span className="text-orange-600 hover:underline">{data.seller}</span>
            </Link>
            <ChevronRight className="w-4 h-4" />
          </div>
		  <div className="flex items-center gap-3 text-lg mt-3">
              <p className="text-orange-600 font-semibold">Starts at ₱{data.variations[0].options[0].price}</p>
              <p className="text-muted-foreground line-through">
                ₱{data.originalPrice}
              </p>
              <div className="border border-orange-600 bg-orange-600 px-1.5 py-0.5 rounded-md text-white text-xs">
                -{data.discount}%
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlug;
