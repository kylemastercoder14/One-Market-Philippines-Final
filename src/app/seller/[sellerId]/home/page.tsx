import React from "react";

const SellerHome = async (
  props: {
    params: Promise<{
      sellerId: string;
    }>;
  }
) => {
  const params = await props.params;
  return <div>SellerHome {params.sellerId}</div>;
};

export default SellerHome;
