"use client";

import { Seller } from "@prisma/client";
import React from "react";
import PersonalInformationForm from "./personal-information-form";

const SettingsForm = ({ seller }: { seller: Seller }) => {
  return (
    <div className="mt-5 space-y-4">
      <PersonalInformationForm seller={seller} />
    </div>
  );
};

export default SettingsForm;
