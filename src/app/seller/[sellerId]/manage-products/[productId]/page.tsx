/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import HeadingAction from "@/components/ui/heading-action";
import ProductForm, { ProductFormProps } from "./product-form";
import db from "@/lib/db";

const defaultProductFormProps: ProductFormProps = {
  id: "",
  name: "",
  description: "",
  status: "",
  images: [],
  brand: "",
  materials: [],
  height: 0,
  weight: 0,
  sku: "",
  sellerProductVariants: [],
  category: "",
  tags: [],
  warrantyPeriod: "",
  warrantyPolicy: "",
  discount: 0,
};

const transformProductToFormProps = (product: any): ProductFormProps => ({
  id: product.id || "",
  name: product.name || "",
  description: product.description || "",
  status: product.status || "",
  images: product.images || [],
  brand: product.brand || "",
  materials: product.materials || [],
  height: product.height || 0,
  weight: product.weight || 0,
  sku: product.sku || "",
  sellerProductVariants:
    product.sellerProductVariants.map((variant: any) => ({
      name: variant.name,
      sellerProductVariantsOptions: variant.sellerProductVariantsOptions.map(
        (option: any) => ({
          name: option.name,
          price: option.price,
          stock: option.stock,
        })
      ),
    })) || [],
  category: product.category || "",
  tags: product.tags || [],
  warrantyPeriod: product.warrantyPeriod || "",
  warrantyPolicy: product.warrantyPolicy || "",
  discount: product.discount || 0,
});

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
    include: {
      sellerProductVariants: {
        include: {
          sellerProductVariantsOptions: true,
        },
      },
    },
  });

  const initialData = products
    ? transformProductToFormProps(products)
    : defaultProductFormProps;
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
        initialData={initialData}
      />
    </div>
  );
};

export default ProductId;
