"use client";

import { Seller } from "@prisma/client";
import React from "react";

const PersonalInformationForm = ({ seller }: { seller: Seller }) => {
  return (
    <div className="bg-white shadow border rounded-md p-3">
      <h2 className='font-semibold'>Profile</h2>
    </div>
  );
};

export default PersonalInformationForm;
