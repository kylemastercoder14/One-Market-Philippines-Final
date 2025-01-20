import React from "react";
import VariantForm from "./variant-form";

const ProductVariant = async (props: {
  params: Promise<{
    productSlug: string;
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  return (
    <div>
      <VariantForm productSlug={params.productSlug} />
    </div>
  );
};

export default ProductVariant;
