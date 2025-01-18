"use client";

import { Seller, SellerAddress, SellerCategory } from "@prisma/client";
import React from "react";
import PersonalInformationForm from "./personal-information-form";
import ReturnRefundAddressForm from "./return-refund-address-form";
import DocumentsForm from './documents-form';

interface SettingsFormProps extends Seller {
  sellerAddress: SellerAddress[];
  sellerCategory: SellerCategory | null;
}

const SettingsForm = ({ seller }: { seller: SettingsFormProps }) => {
  return (
    <div className="mt-5 space-y-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div>
          <PersonalInformationForm seller={seller} />
        </div>
        <div>
          <ReturnRefundAddressForm seller={seller} />
        </div>
      </div>
      <DocumentsForm seller={seller} />
    </div>
  );
};

export default SettingsForm;
