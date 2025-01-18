import React from "react";
import db from "@/lib/db";
import { ProductColumn } from "./_components/column";
import ProductClient from "./_components/client";

const SellerProducts = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const data = await db.sellerProduct.findMany({
    where: {
      sellerId: params.sellerId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      sellerProductVariants: {
        include: {
          sellerProductVariantsOptions: true,
        },
      },
    },
  });

  const formattedData: ProductColumn[] =
    data.map((item) => {
      const lowestPrice = item.sellerProductVariants
        .flatMap((variant) =>
          variant.sellerProductVariantsOptions.map((option) => option.price)
        )
        .reduce((min, price) => Math.min(min, price), Infinity);

      return {
        id: item.id,
        name: item.name,
        image: item.images[1],
        category: item.category,
        sku: item.sku,
        status: item.status,
        href: `/seller/${params.sellerId}/manage-products/${item.id}`,
        tags: item.tags.join(", "),
        price:
          lowestPrice !== Infinity
            ? `Starts at ₱${lowestPrice.toFixed(2)}`
            : "Price unavailable",
      };
    }) || [];

  return (
    <div>
      <p className="font-semibold text-2xl">Product Dashboard</p>
      <ProductClient data={formattedData} />
    </div>
  );
};

export default SellerProducts;
