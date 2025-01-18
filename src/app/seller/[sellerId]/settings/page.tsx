import React from "react";
import db from "@/lib/db";
import SettingsForm from "./_components/settings-form";

const SellerSettings = async (props: {
  params: Promise<{
    sellerId: string;
  }>;
}) => {
  const params = await props.params;
  const seller = await db.seller.findUnique({
    where: {
      id: params.sellerId,
    },
    include: {
      sellerAddress: true,
    },
  });
  return (
    <div>
      <h3 className="text-2xl font-bold">Store Details</h3>
      {seller ? <SettingsForm seller={seller} /> : <p>Seller not found</p>}
    </div>
  );
};

export default SellerSettings;
