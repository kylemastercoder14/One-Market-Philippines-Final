/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import HeadingAction from "@/components/ui/heading-action";
import ProductForm from "./product-form";
import db from "@/lib/db";

const ProductId = async (props: {
  params: Promise<{
    productId: string;
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
    include: {
      sellerCategory: {
        include: {
          sellerSubCategory: true,
        },
      },
    },
  });
  const products = await db.sellerProduct.findUnique({
    where: {
      id: params.productId,
    },
  });

  return (
    <div>
      <HeadingAction
        className="w-40"
        title={products ? `Edit Product` : "Add Product"}
        link={`/seller/${params.sellerId}/manage-products`}
      />
      <ProductForm
        subCategories={seller?.sellerCategory?.sellerSubCategory || []}
        sellerId={params.sellerId}
        initialData={products}
      />
    </div>
  );
};

export default ProductId;
